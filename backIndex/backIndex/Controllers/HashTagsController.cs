using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backIndex.Models;

namespace backIndex.Controllers
{
    public class HashTagsController : Controller
    {
        private readonly SweetMouthContext _context;

        public HashTagsController(SweetMouthContext context)
        {
            _context = context;
        }

        // GET: HashTags
        public async Task<IActionResult> Index()
        {
            var sweetMouthContext = _context.HashTag.Include(h => h.Product);
            return View(await sweetMouthContext.ToListAsync());
        }

        // GET: HashTags/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null || _context.HashTag == null)
            {
                return NotFound();
            }

            var hashTag = await _context.HashTag
                .Include(h => h.Product)
                .FirstOrDefaultAsync(m => m.ProductName == id);
            if (hashTag == null)
            {
                return NotFound();
            }

            return View(hashTag);
        }

        // GET: HashTags/Create
        public IActionResult Create()
        {
            ViewData["ProductName"] = new SelectList(_context.Product, "ProductName", "ProductName");
            return View();
        }

        // POST: HashTags/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProductName,Specifications,HashTag1")] HashTag hashTag)
        {
            if (ModelState.IsValid)
            {
                _context.Add(hashTag);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductName"] = new SelectList(_context.Product, "ProductName", "ProductName", hashTag.ProductName);
            return View(hashTag);
        }

        // GET: HashTags/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null || _context.HashTag == null)
            {
                return NotFound();
            }

            var hashTag = await _context.HashTag.FindAsync(id);
            if (hashTag == null)
            {
                return NotFound();
            }
            ViewData["ProductName"] = new SelectList(_context.Product, "ProductName", "ProductName", hashTag.ProductName);
            return View(hashTag);
        }

        // POST: HashTags/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("ProductName,Specifications,HashTag1")] HashTag hashTag)
        {
            if (id != hashTag.ProductName)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(hashTag);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HashTagExists(hashTag.ProductName))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductName"] = new SelectList(_context.Product, "ProductName", "ProductName", hashTag.ProductName);
            return View(hashTag);
        }

        // GET: HashTags/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null || _context.HashTag == null)
            {
                return NotFound();
            }

            var hashTag = await _context.HashTag
                .Include(h => h.Product)
                .FirstOrDefaultAsync(m => m.ProductName == id);
            if (hashTag == null)
            {
                return NotFound();
            }

            return View(hashTag);
        }

        // POST: HashTags/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            if (_context.HashTag == null)
            {
                return Problem("Entity set 'SweetMouthContext.HashTag'  is null.");
            }
            var hashTag = await _context.HashTag.FindAsync(id);
            if (hashTag != null)
            {
                _context.HashTag.Remove(hashTag);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool HashTagExists(string id)
        {
          return _context.HashTag.Any(e => e.ProductName == id);
        }
    }
}
