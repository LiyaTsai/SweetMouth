using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;
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

        // GET: Products
        //public async Task<IActionResult> Index()
        //{
        //    return View(await _context.Product.ToListAsync());
        //}

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IEnumerable<Product>> Get(string? name)
        {
            var result = _context.Product.Select(x =>
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
                Description = x.Description,
                Category = x.Category,
            });
            if (!string.IsNullOrWhiteSpace(name)) {
                result = result.Where(x => x.ProductName.Contains(name));
            }
            result = result.Where(x => x.Avalible == true);
            return result;
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
                ProductName = productDetail.ProductName,
                Size = productDetail.Size,
                Flavor = productDetail.Flavor,
                Tag = productDetail.Tag,
                tagArray = productDetail.Tag.Split("|"),
                Description = productDetail.Description
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

        // GET: api/<ProductController>
        [HttpPut("{id}")]
        public async Task<string> Put(int id, ProductDTO pDTO)
        {
            if (id != pDTO.ProductId)
            {
                return "ID錯誤";
            }
            Product pro = await _context.Product.FindAsync(pDTO.ProductId);
            pro.ProductId = pDTO.ProductId;
            pro.ProductName = pDTO.ProductName;
            pro.Size = pDTO.Size;
            pro.ImageName = pDTO.ImageName;
            pro.Avalible = pDTO.Avalible;
            pro.Flavor = pDTO.Flavor;
            pro.Tag = pDTO.Tag;
            pro.Category = pDTO.Category;

            _context.Entry(pro).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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


        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.ProductId == id);
        }

        [HttpPost]
        public async Task<Product> Post(ProductDTO pdto)
        {
            Product pro = new Product
            {
                ProductName = pdto.ProductName,
                Size = pdto.Size,
                Flavor = pdto.Flavor,
                Price = pdto.Price,
                //BirthDay = mdto.BirthDay,
                Tag = pdto.Tag,
                Category = pdto.Category,
                Avalible = pdto.Avalible,
                ImageName = pdto.ImageName,
            };
            _context.Product.Add(pro);
            await _context.SaveChangesAsync();
            return pro;
        }



        [HttpDelete("{id}")]
        public async Task<string> Delete(int id)
        {
            var pro = await _context.Product.FindAsync(id);
            if (pro == null)
            {
                return "找不到欲刪除的紀錄";
            }

            _context.Product.Remove(pro);
            await _context.SaveChangesAsync();

            return "刪除成功";
        }

        // 搜尋甜點 api/Product/FilterTitle
        [HttpPost("FilterName")]
        public async Task<IEnumerable<Product>> FilterName(Product p)
        {
            //return _context.Product
            //    .Where(spd => spd.ProductName.Contains(ProductDTO.ProductName).Select(spd => new ProductDTO
            //    {
            //        ProductId = spd.ProductId,
            //        ProductName = spd.ProductName,
            //        Size = spd.Size,
            //        Flavor = spd.Flavor,
            //        ImageName = spd.ImageName,
            //        Price = spd.Price,
            //        Category = spd.Category,
            //        Tag = spd.Tag,
            //        Description = spd.Description,
            //        tagArray = spd.tagArray,

            //    }));

            //var result = _context.Product.Select(spd => new Product
            //{
            //    ProductId = spd.ProductId,
            //    ProductName = spd.ProductName,
            //    Size = spd.Size,
            //    Flavor = spd.Flavor,
            //    ImageName = spd.ImageName,
            //    Price = spd.Price,
            //    Category = spd.Category,
            //    Tag = spd.Tag,
            //    Description = spd.Description
            //    //tagArray = spd.tagArray,
            //});
            //if (!string.IsNullOrWhiteSpace(p.ProductName))
            //{
            //    result = result.where(x => x.ProductName.Contains(p.ProductName));
            //};

            var result = _context.Product.Where(x => x.ProductName.Contains(p.ProductName)).Select(spd => new Product
            {
                ProductId = spd.ProductId,
                ProductName = spd.ProductName,
                Size = spd.Size,
                Flavor = spd.Flavor,
                ImageName = spd.ImageName,
                Price = spd.Price,
                Category = spd.Category,
                Tag = spd.Tag,
                Description = spd.Description
            });
            return result;
        }

        //// POST api/<ProductController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ProductController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ProductController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        //// GET: Products/Create
        //public IActionResult Create()
        //{
        //    return View();
        //}

        // POST: Products/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
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
