using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Application.DTO.Tags;
using NoteKeeperAPI.Application.Repositories.Tags;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NoteKeeperAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // JWT doğrulaması için
    public class TagController : ControllerBase
    {
        private readonly ITagsReadRepository _tagsReadRepository;
        private readonly ITagsWriteRepository _tagsWriteRepository;

        public TagController(ITagsReadRepository tagsReadRepository, ITagsWriteRepository tagsWriteRepository)
        {
            _tagsReadRepository = tagsReadRepository;
            _tagsWriteRepository = tagsWriteRepository;
        }

        // GET: api/tag
        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var tags = await _tagsReadRepository.GetAll()
                .Where(t => t.UserId == userId)
                .ToListAsync();


            // Basit DTO dönüşümü
            var tagDtos = tags.Select(t => new TagDto
            {
                Id = t.Id.ToString(),
                TagName = t.TagName
            });

            return Ok(tagDtos);
        }

        // DELETE: api/tag/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var tag = await _tagsReadRepository.GetByIdAsync(id);

            if (tag == null || tag.UserId != userId)
                return NotFound();

            await _tagsWriteRepository.RemoveAsync(id);
            await _tagsWriteRepository.SaveAsync();

            return NoContent();
        }
    }
}
