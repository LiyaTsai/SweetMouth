using WebApi.Models;

namespace WebApi.DTO
{
    public class BlogDTO
    {
        public int ArticleID { get; set; }
        public int MemberID { get; set; }
        public int Floor { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public DateTime? Time { get; set; }
        public string? Article { get; set; }
        public string? ImageName { get; set; }

        // Memeber資料表
        public string? MemberName { get; set; }
        public string? NickName { get; set; }
        // Product資料表
        public int? ProductID { get; set; }
        public string? Tag { get; set; }
        public string? ProductImageName { get; set; }
    }
}
