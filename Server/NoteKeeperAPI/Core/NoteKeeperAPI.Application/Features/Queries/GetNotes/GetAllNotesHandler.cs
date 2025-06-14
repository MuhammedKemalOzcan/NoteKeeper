using MediatR;
using Microsoft.AspNetCore.Http;
using NoteKeeperAPI.Application.DTO.Notes;
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

            var notes = _notesReadRepository
           .GetAll(false)
           .Where(n => n.UserId == userId)
           .Select(n => new NoteDto
           {
               Id = n.Id.ToString(),
               Title = n.Title,
               Description = n.Description,
               IsArchived = n.IsArchived,
               CreatedDate = n.CreatedDate,
               UpdatedDate = n.UpdatedDate
           }).ToList();

            return new()
            {
                Notes = notes
            };
        }
    }
}
