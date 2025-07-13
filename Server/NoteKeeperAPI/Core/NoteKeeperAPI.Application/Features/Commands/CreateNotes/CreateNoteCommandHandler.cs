using MediatR;
using Microsoft.AspNetCore.Http;
using NoteKeeperAPI.Application.Repositories.Notes;
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
        readonly IHttpContextAccessor _httpContextAccessor;

        public CreateNoteCommandHandler(INotesWriteRepository notesWriteRepository, IHttpContextAccessor httpContextAccessor)
        {
            _notesWriteRepository = notesWriteRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateNoteCommandResponse> Handle(CreateNoteCommandRequest request, CancellationToken cancellationToken)
        {

            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User not authenticated");

            var note = new Note
            {
                Title = request.Title,
                Description = request.Description,
                IsArchived = request.IsArchived,
                UserId = userId,
            };

            await _notesWriteRepository.AddAsync(note);
            await _notesWriteRepository.SaveAsync();
            return new CreateNoteCommandResponse
            {
                Id = note.Id.ToString(),
                Title = note.Title,
                Description = note.Description,
                IsArchived = note.IsArchived,
                CreatedDate = note.CreatedDate,
                UpdatedDate = note.UpdatedDate
            };

        }
    }
}
