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
                Birthday = a.Birthday,
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
                Birthday = mem.Birthday,
                Password = mem.Password,
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
                //BirthDay = mdto.BirthDay,
                Password = mdto.Password,
            };
            _context.Member.Add(mem);
            await _context.SaveChangesAsync();
            return mem;
        }



        // PUT api/<MemberController>/5
        [HttpPut("{id}")]
        public async Task<string> Put(int id, MemberDTO mDTO)
        {
            if (id != mDTO.MemberID)
            {
                return "ID錯誤";
            }
            Member mem = await _context.Member.FindAsync(mDTO.MemberID);
            mem.Name = mDTO.Name;
            mem.NickName = mDTO.NickName;
            mem.Email = mDTO.Email;
            mem.PhoneNumber = mDTO.PhoneNumber;
            mem.Birthday = mDTO.BirthDay;
            mem.FavoriteProduct=mDTO.FavoriteProduct;
            mem.Password = mDTO.Password;
            _context.Entry(mem).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
                {
                    return "找不到欲修改的紀錄";
                }
                else
                {
                    throw;
                }
            }
            return "修改成功!";
        }

        // DELETE api/<MemberController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }




        private bool MemberExists(int id)
        {
            return _context.Member.Any(e => e.MemberId == id);
        }
    }
}
