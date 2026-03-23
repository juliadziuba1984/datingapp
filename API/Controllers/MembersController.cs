using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MembersController(AppDbContext dbContext) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var users = await dbContext.Users.ToAsyncEnumerable().ToListAsync();
            return users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id) // api/members/bob-id
        {
            var member = await dbContext.Users.FindAsync(id);

            if (member == null) return NotFound();
            return member;
        }
    }
}
