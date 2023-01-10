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

<<<<<<<< HEAD:MVC/WebApi/Controllers/MemberController.cs
        public MemberController(SweetMouthContext context)
========
        public ProductController(SweetMouthContext context)
>>>>>>>> 2f5a51b96e51a242e8c328b55e9bbf7c75c9567d:MVC/WebApi/Controllers/ProductController.cs
        {
            _context = context;
        }



        // GET: api/<MemberController>
        [HttpGet]
        public IEnumerable<Member> Get()
        {
            return _context.Member.Include(b=>b.Order).Select(a =>
            new Member
            {
<<<<<<<< HEAD:MVC/WebApi/Controllers/MemberController.cs
                MemberId= a.MemberId,
                Name= a.Name,
                NickName= a.NickName,
                Email= a.Email,
                PhoneNumber= a.PhoneNumber,
                Password= a.Password,
<<<<<<< HEAD
                BirthDay= a.BirthDay
========
                ProductName = x.ProductName,
                Specifications = x.Specifications,
                Price = x.Price,
                ImageName = x.ImageName,
                Avalible = x.Avalible
>>>>>>>> 2f5a51b96e51a242e8c328b55e9bbf7c75c9567d:MVC/WebApi/Controllers/ProductController.cs
=======
                BirthDay= a.BirthDay,
                Order= a.Order
>>>>>>> e37249779ac23f544b6f7242d83dcc5d9258727a
            }
            );
        }

        // GET api/<MemberController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDTO>> Get(int id)
        {
            var mem = await _context.Member.FindAsync(id);
            if (mem == null)
            {
                return NotFound();
            }
            return new MemberDTO
            {
                MemberID = mem.MemberId,
                Name = mem.Name,
                NickName = mem.NickName,
                Email = mem.Email,
                PhoneNumber = mem.PhoneNumber,
                BirthDay = mem.BirthDay
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
                BirthDay= mdto.BirthDay
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
