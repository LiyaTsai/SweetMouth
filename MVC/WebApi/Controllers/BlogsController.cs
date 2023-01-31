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
            return _context.Blog.Include(b => b.Member).Include(a => a.Product).Select(item => new BlogDTO
            {
                ArticleID = item.ArticleId,
                MemberID = item.MemberId,
                Floor = item.Floor,
                Title = item.Title,
                SubTitle = item.SubTitle,
                Time = item.Time,
                Article = item.Article,
                ImageName = item.ImageName,

                // Member 資料表
                MemberName = item.Member.Name,
                NickName = item.Member.NickName,
                // Product 資料表
                ProductID = item.Product.ProductId,
                Tag = item.Product.Tag,
                ProductImageName = item.Product.ImageName,
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
                Floor = blog.Floor,
                Title = blog.Title,
                SubTitle = blog.SubTitle,
                Time = blog.Time,
                Article = blog.Article,
                ImageName = blog.ImageName,
                // Member 資料表
                MemberID = blog.MemberId,
                // Product 資料表
                ProductID = blog.ProductId,
            };
            return blogDTO;
        }




        // PUT: api/Blogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{ArticleID}/{Floor}")]
        public async Task<string> PutBlog(int ArticleID, int Floor, BlogDTO blogDTO)
        {
            if (ArticleID != blogDTO.ArticleID && Floor != blogDTO.Floor)
            {
                return "ID不正確";
            }
            Blog blg = await _context.Blog.FindAsync(blogDTO.ArticleID, blogDTO.Floor);
            blg.ArticleId = blogDTO.ArticleID;
            blg.MemberId = blogDTO.MemberID;
            blg.Floor = blogDTO.Floor;
            blg.ProductId = blogDTO.ProductID;
            blg.Title = blogDTO.Title;
            blg.SubTitle = blogDTO.SubTitle;
            blg.Time = blogDTO.Time;
            blg.Article = blogDTO.Article;
            _context.Entry(blg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(ArticleID) && !BlogExists(Floor))
                {
                    return "找不到欲修改的記錄!";
                }
                else
                {
                    throw;
                }
            }

            return "修改成功!";
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
                ProductId = blog.ProductID,
                Floor = blog.Floor,
                ImageName = blog.ImageName,
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
        [HttpDelete("{ArticleID}/{Floor}")]
        public async Task<string> DeleteBlog(int ArticleID, int Floor)
        {
            var blog = await _context.Blog.FindAsync(ArticleID, Floor);
            if (blog == null)
            {
                return "找不到欲刪除的記錄!";
            }

            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return "刪除成功!";
        }

        // 搜尋文章 api/Blogs/FilterTitle
        [HttpPost("FilterTitle")]
        public async Task<IEnumerable<BlogDTO>> FilterTitle(BlogDTO BlogDTO)
        {
            return _context.Blog
                .Where(blg => blg.Title.Contains(BlogDTO.Title) || blg.Member.NickName.Contains(BlogDTO.NickName))
                .Select(blg => new BlogDTO
                {
                    ArticleID = blg.ArticleId,
                    Floor= blg.Floor,
                    MemberID = blg.MemberId,
                    ProductID = blg.ProductId,
                    ImageName = blg.ImageName,
                    Time = blg.Time,
                    Title = blg.Title,

                    // 外鍵
                    ProductImageName = blg.Product.ImageName, 
                    NickName = blg.Member.NickName,
                });
        }

        private bool BlogExists(int id)
        {
            return _context.Blog.Any(e => e.ArticleId == id);
        }
    }
}
