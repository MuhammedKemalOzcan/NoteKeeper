using MediatR;
using Microsoft.AspNetCore.Http;
using NoteKeeperAPI.Application.DTO.Tags;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Application.Repositories.Tags;
using NoteKeeperAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Commands.CreateNotes
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommandRequest, CreateNoteCommandResponse>
    {
        readonly INotesWriteRepository _notesWriteRepository;
        readonly ITagsReadRepository _tagsReadRepository;
        readonly ITagsWriteRepository _tagsWriteRepository;
        readonly IHttpContextAccessor _httpContextAccessor;

        public CreateNoteCommandHandler(
            INotesWriteRepository notesWriteRepository,
            ITagsReadRepository tagsReadRepository,
            ITagsWriteRepository tagsWriteRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _notesWriteRepository = notesWriteRepository;
            _tagsReadRepository = tagsReadRepository;
            _tagsWriteRepository = tagsWriteRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateNoteCommandResponse> Handle(CreateNoteCommandRequest request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User not authenticated");

            // 1. TagName string'ini ',' ile parçala ve temizle
            var tagNames = request.TagName
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(t => t.Trim())
                .Where(t => !string.IsNullOrEmpty(t))
                .Distinct()
                .ToList();

            // 2. Note oluştur
            var note = new Note
            {
                Title = request.Title,
                Description = request.Description,
                IsArchived = request.IsArchived,
                UserId = userId,
                NoteTags = new List<NoteTag>()
            };

            // 3. Her tag için ya var olanı getir ya da yeni oluştur
            foreach (var tagName in tagNames)
            {
                var existingTag = await _tagsReadRepository.GetSingleAsync(t => t.TagName.ToLower() == tagName.ToLower() && t.UserId == userId);

                if (existingTag == null)
                {
                    existingTag = new Tag
                    {
                        TagName = tagName,
                        UserId = userId
                    };

                    await _tagsWriteRepository.AddAsync(existingTag);
                    await _tagsWriteRepository.SaveAsync();

                    // Yeni eklenen tag'ı yeniden DB'den çekiyoruz, böylece EF tracking problemi çözülür.
                    existingTag = await _tagsReadRepository.GetSingleAsync(t => t.Id == existingTag.Id);
                }

                    // 4. NoteTag ilişkisini oluştur, burada TagId kullanıyoruz:
                    var noteTag = new NoteTag
                    {
                        Note = note,
                        TagId = existingTag.Id
                    };
                note.NoteTags.Add(noteTag);
            }

            // 5. Notu kaydet
            await _notesWriteRepository.AddAsync(note);
            await _notesWriteRepository.SaveAsync();

            // 6. Response dön
            return new CreateNoteCommandResponse
            {
                Id = note.Id.ToString(),
                Title = note.Title,
                Description = note.Description,
                IsArchived = note.IsArchived,
                CreatedDate = note.CreatedDate,
                UpdatedDate = note.UpdatedDate,
                Tags = note.NoteTags.Select(nt => new TagDto
                {
                    Id = nt.Tag.Id.ToString(),
                    TagName = nt.Tag.TagName
                }).ToList()
            };
        }

    }
}
