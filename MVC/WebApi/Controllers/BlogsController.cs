using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public BlogsController(SweetMouthContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public async Task<IEnumerable<BlogDTO>> Get()
        {
            return _context.Blog.Include(b => b.Member).Select(item => new BlogDTO
            {
                ArticleID = item.ArticleId,
                MemberID = item.MemberId,
                Floor = item.Floor,
                Title = item.Title,
                SubTitle = item.SubTitle,
                Time = item.Time,
                Article = item.Article,
                Image = item.Image,

                // Member 資料表
                MemberName = item.Member.Name,
                NickName = item.Member.NickName,
            });
        }

        // GET: api/Blogs/5
        [HttpGet("{ArticleID}/{Floor}")]
        public async Task<ActionResult<BlogDTO>> Get(int ArticleID, int Floor)
        {
            var blog = await _context.Blog.FindAsync(ArticleID, Floor);

            if (blog == null)
            {
                return NotFound();
            }
            BlogDTO blogDTO = new BlogDTO
            {
                ArticleID = blog.ArticleId,
                MemberID = blog.MemberId,
                Floor = blog.Floor,
                Title = blog.Title,
                SubTitle = blog.SubTitle,
                Time = blog.Time,
                Article = blog.Article,
                Image = blog.Image,
            };
            return blogDTO;
        }




        // PUT: api/Blogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(int id, Blog blog)
        {
            if (id != blog.ArticleId)
            {
                return BadRequest();
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Blogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Blog> Post(BlogDTO blog)
        {
            Blog blg = new Blog
            {
                ArticleId = blog.ArticleID,
                MemberId = blog.MemberID,
                Floor = blog.Floor,
                Image = blog.Image,
                Title = blog.Title,
                SubTitle = blog.SubTitle,
                Time = blog.Time,
                Article = blog.Article,
            };
            _context.Blog.Add(blg);
            await _context.SaveChangesAsync();
            return blg;
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogExists(int id)
        {
            return _context.Blog.Any(e => e.ArticleId == id);
        }
    }
}
