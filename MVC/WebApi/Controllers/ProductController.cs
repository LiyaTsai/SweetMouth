using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly SweetMouthContext _context;

        public ProductController(SweetMouthContext context)
        {
            _context = context;
        }

        //// GET: Products
        //public async Task<IActionResult> Index()
        //{
        //    return View(await _context.Product.ToListAsync());
        //}

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Product.Select(x =>
            new Product
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                Size = x.Size,
                Flavor = x.Flavor,
                //Specifications = x.Specifications,
                Price = x.Price,
                ImageName = x.ImageName,
                Avalible = x.Avalible,
                Tag = x.Tag,
                Description = x.Description
            }
            );
        }


        // GET api/<ProductController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}


        // GET api/<ProductController>/5
        [HttpGet("{ProductID}")]
        public async Task<ActionResult<ProductDTO>> Get(int ProductID)
        {
            var productDetail = await _context.Product.FindAsync(ProductID);

            if (productDetail == null)
            {
                return NotFound();
            }
            ProductDTO ProductDTO = new ProductDTO
            {
                ProductId = productDetail.ProductId,
                Price = productDetail.Price,
                ImageName = productDetail.ImageName,
                Avalible = productDetail.Avalible,
            };
            return ProductDTO;
        }

        //// GET api/<ProductController>/5
        //[HttpGet("{ProductName}/{Specifications}")]
        //public async Task<ActionResult<ProductDTO>> Get(string ProductName, string Specifications)
        //{
        //    var productDetail = await _context.Product.FindAsync(ProductName, Specifications);

        //    if (productDetail == null)
        //    {
        //        return NotFound();
        //    }
        //    ProductDTO ProductDTO = new ProductDTO
        //    {
        //        ProductName = productDetail.ProductName,
        //        //Specifications = productDetail.Specifications,
        //        Price = productDetail.Price,
        //        ImageName = productDetail.ImageName,
        //        Avalible = productDetail.Avalible,
        //    };
        //    return ProductDTO;
        //}

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

        //// GET: Products/Create
        //public IActionResult Create()
        //{
        //    return View();
        //}

        // POST: Products/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("ProductName,Specifications,Price,ImageName,Avalible")] Product product)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(product);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(product);
        //}

        // GET: Products/Edit/5
        //public async Task<IActionResult> Edit(string id)
        //{
        //    if (id == null || _context.Product == null)
        //    {
        //        return NotFound();
        //    }

        //    var product = await _context.Product.FindAsync(id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(product);
        //}

        // POST: Products/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(string id, [Bind("ProductName,Specifications,Price,ImageName,Avalible")] Product product)
        //{
        //    if (id != product.ProductName)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(product);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!ProductExists(product.ProductName))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(product);
        //}

        // GET: Products/Delete/5
        //public async Task<IActionResult> Delete(string id)
        //{
        //    if (id == null || _context.Product == null)
        //    {
        //        return NotFound();
        //    }

        //    var product = await _context.Product
        //        .FirstOrDefaultAsync(m => m.ProductName == id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(product);
        //}

        // POST: Products/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(string id)
        //{
        //    if (_context.Product == null)
        //    {
        //        return Problem("Entity set 'SweetMouthContext.Product'  is null.");
        //    }
        //    var product = await _context.Product.FindAsync(id);
        //    if (product != null)
        //    {
        //        _context.Product.Remove(product);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        //private bool ProductExists(string id)
        //{
        //    return _context.Product.Any(e => e.ProductName == id);
        //}
    }
}
