using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Application.DTO.Notes;
using NoteKeeperAPI.Application.DTO.Tags;
using NoteKeeperAPI.Application.Features.Commands.CreateNotes;
using NoteKeeperAPI.Application.Features.Queries.GetNotes;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Domain.Entities;
using System.Net;
using System.Security.Claims;

namespace NoteKeeperAPI.API.Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesReadRepository _notesReadRepository;
        private readonly INotesWriteRepository _notesWriteRepository;
        readonly IMediator _mediator;
        public NotesController(INotesReadRepository notesReadRepository, INotesWriteRepository notesWriteRepository, IMediator mediator)
        {
            _notesReadRepository = notesReadRepository;
            _notesWriteRepository = notesWriteRepository;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllNotesRequest getAllNotesRequest )
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();


            GetAllNotesResponse response = await _mediator.Send(getAllNotesRequest);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] string id)
        {
            Note note = await _notesReadRepository.GetByIdAsync(id, false);
            return Ok(note);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateNoteCommandRequest createNoteCommandRequest)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            CreateNoteCommandResponse response = await _mediator.Send(createNoteCommandRequest);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateNoteDto updateNote)
        {
            Note note = await _notesReadRepository.GetByIdAsync(updateNote.Id);
            note.Title = updateNote.Title;
            note.Description = updateNote.Description;
            note.IsArchived = updateNote.IsArchived;
            await _notesWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] PatchNoteDto patchNoteDto)
        {
            var note = await _notesReadRepository.Table
            .Include(n => n.NoteTags)
            .ThenInclude(nt => nt.Tag)
            .FirstOrDefaultAsync(n => n.Id.ToString() == patchNoteDto.Id);



            note.IsArchived = patchNoteDto.IsArchived;
            await _notesWriteRepository.SaveAsync();

            var noteDto = new NoteDto
            {
                Id = note.Id.ToString(),
                Title = note.Title,
                Description = note.Description,
                IsArchived = note.IsArchived,
                CreatedDate = note.CreatedDate,
                UpdatedDate = note.UpdatedDate,
                Tags = note.NoteTags.Select(t => new TagDto
                {
                    Id = t.Tag.Id.ToString(),
                    TagName = t.Tag.TagName
                }).ToList()
            };
            return Ok(noteDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await _notesWriteRepository.RemoveAsync(id);
            await _notesWriteRepository.SaveAsync();
            return Ok();
        }

    }
}
