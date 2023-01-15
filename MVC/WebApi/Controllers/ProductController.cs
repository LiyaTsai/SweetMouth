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
        private readonly SweetMouthContext _context;

        public ProductController(SweetMouthContext context)
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
                ProductName = x.ProductName,
                Specifications = x.Specifications,
                Price = x.Price,
                ImageName = x.ImageName,
                Avalible = x.Avalible
            }
            );
        }


        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<ProductController>/5
        [HttpGet("{ProductName}/{Specifications}")]
        public async Task<ActionResult<ProductDTO>> Get(string ProductName, string Specifications)
        {
            var productDetail = await _context.Product.FindAsync(ProductName, Specifications);

            if (productDetail == null)
            {
                return NotFound();
            }
            ProductDTO ProductDTO = new ProductDTO
            {
                ProductName = productDetail.ProductName,
                Specifications = productDetail.Specifications,
                Price = productDetail.Price,
                ImageName = productDetail.ImageName,
            };
            return ProductDTO;
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
