using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HashTagController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public HashTagController(SweetMouthContext context)
        {
            _context = context;
        }



        // GET: api/<HashTagController>
        [HttpGet]
        public IEnumerable<DTO.HashTagDTO> Get()
        {
            return _context.HashTag.Include(a => a.Product).Select(b =>
                new DTO.HashTagDTO
                {
                    ProductName = b.ProductName,
                    Specifications = b.Specifications,
                    HashTag1 = b.HashTag1,
                    Price = b.Product.Price,
                    ImageName = b.Product.ImageName,
                    Avalible = b.Product.Avalible
                }
            );
        }

        // GET api/<HashTagController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<HashTagController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<HashTagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<HashTagController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
