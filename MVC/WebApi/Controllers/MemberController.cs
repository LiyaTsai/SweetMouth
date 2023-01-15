using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;
using Member = WebApi.Models.Member;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public MemberController(SweetMouthContext context)
        {
            _context = context;
        }



        // GET: api/<MemberController>
        [HttpGet]
        public IEnumerable<Member> Get()
        {
            return _context.Member.Include(b => b.Order).Select(a =>
            new Member
            {
                MemberId = a.MemberId,
                Name = a.Name,
                NickName = a.NickName,
                Email = a.Email,
                PhoneNumber = a.PhoneNumber,
                Password = a.Password,
                BirthDay = a.BirthDay,
                Order = a.Order
            }
            );
        }

        // GET api/<MemberController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> Get(int id)
        {
            var mem = await _context.Member.FindAsync(id);
            if (mem == null)
            {
                return NotFound();
            }
            return new Member
            {
                MemberId = mem.MemberId,
                Name = mem.Name,
                NickName = mem.NickName,
                Email = mem.Email,
                PhoneNumber = mem.PhoneNumber,
                BirthDay = mem.BirthDay,
            };
        }

        // POST api/<MemberController>
        [HttpPost]
        public async Task<Member> Post(MemberDTO mdto)
        {
            Member mem = new Member
            {
                Name = mdto.Name,
                NickName = mdto.NickName,
                Email = mdto.Email,
                PhoneNumber = mdto.PhoneNumber,
                BirthDay = mdto.BirthDay,
                Password = mdto.Password,
            };
            _context.Member.Add(mem);
            await _context.SaveChangesAsync();
            return mem;
        }



        // PUT api/<MemberController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MemberController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
