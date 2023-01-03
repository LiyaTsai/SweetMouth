using Microsoft.AspNetCore.Mvc;
using WebApi.DTO;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly myDemoDBContext _context;

        public ProductController(myDemoDBContext context)
        {
            _context = context;
        }


        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Product.Select(x =>
            new Product
            {
                商品id=x.商品id,
                商品名稱=x.商品名稱,
                商品份數口味=x.商品份數口味,
                商品定價=x.商品定價
            }
            );
        }


        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
