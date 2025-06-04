using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Application.DTO.Notes;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Domain.Entities;
using NoteKeeperAPI.Persistence.Contexts;
using System.Net;

namespace NoteKeeperAPI.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesReadRepository _notesReadRepository;
        private readonly INotesWriteRepository _notesWriteRepository;
        public NotesController(INotesReadRepository notesReadRepository, INotesWriteRepository notesWriteRepository)
        {
            _notesReadRepository = notesReadRepository;
            _notesWriteRepository = notesWriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var notes = _notesReadRepository.GetAll(false);
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] string id)
        {
            Note note = await _notesReadRepository.GetByIdAsync(id,false);
            return Ok(note);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateNoteDto createNote)
        {
            await _notesWriteRepository.AddAsync(new()
            {
                Title = createNote.Title,
                Description = createNote.Description,
                IsArchived = createNote.IsArchived,
            });
            await _notesWriteRepository.SaveAsync();
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateNoteDto updateNote)
        {
            Note note = await _notesReadRepository.GetByIdAsync(updateNote.Id);
            note.Title = updateNote.Title;
            note.Description = updateNote.Description;
            note.IsArchived = updateNote.IsArchived;
            await _notesWriteRepository.SaveAsync();
            return Ok(note);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] PatchNoteDto noteDto)
        {
            Note note = await _notesReadRepository.GetByIdAsync(noteDto.Id);
            note.IsArchived = noteDto.IsArchived;
            await _notesWriteRepository.SaveAsync();
            return Ok(note);
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
