using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Application.DTO.Notes;
using NoteKeeperAPI.Application.DTO.Tags;
using NoteKeeperAPI.Application.Repositories.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Queries.GetNotes
{
    internal class GetAllNotesHandler : IRequestHandler<GetAllNotesRequest, GetAllNotesResponse>
    {
        private readonly INotesReadRepository _notesReadRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAllNotesHandler(INotesReadRepository notesReadRepository, IHttpContextAccessor httpContextAccessor)
        {
            _notesReadRepository = notesReadRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<GetAllNotesResponse> Handle(GetAllNotesRequest request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User not authenticated");

            var notes = await _notesReadRepository
    .GetWhere(n => n.UserId == userId )
    .Include(n => n.NoteTags)
        .ThenInclude(nt => nt.Tag)
    .ToListAsync(cancellationToken);



            var noteDtos = notes.Select(note => new NoteDto
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
            }).ToList();


            return new GetAllNotesResponse
            {
                Notes = noteDtos
            };

        }
    }
}
