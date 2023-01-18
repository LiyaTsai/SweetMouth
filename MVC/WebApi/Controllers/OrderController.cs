using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public OrderController(SweetMouthContext context)
        {
            _context = context;
        }

        // GET: api/<OrderController>
        [HttpGet]
        public IEnumerable<DTO.OrderDTO> Get()
        {
            return _context.Order.Include(y=>y.Product)
                .Select(x => new DTO.OrderDTO
                {
                OrderId= x.OrderId,
                MemberId= x.MemberId,
                ProductName=x.Product.ProductName,
                Spend=x.Income,
                Amount=x.Amount,
                DiscountCode=x.DiscountCode,
                Delivary=x.Delivary
            });
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
