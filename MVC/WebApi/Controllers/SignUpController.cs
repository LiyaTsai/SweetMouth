using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly SweetMouthContext _context;
        public SignUpController(SweetMouthContext context)
        {
            _context = context;
        }

        // GET: api/<SignUpController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SignUpController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SignUpController>
        [HttpPost]
        public async Task<SignUp> Post(SignUpDTO sig)
        {
            SignUp ss = new SignUp()
            {
                Date = sig.Date,
                MemberId = sig.MemberId,
                IsJoin = sig.IsJoin
            };
            _context.SignUp.Add(ss);
            await _context.SaveChangesAsync();
            return ss;
        }
        // PUT api/<SignUpController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SignUpController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
