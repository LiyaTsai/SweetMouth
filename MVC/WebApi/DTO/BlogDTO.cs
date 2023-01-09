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
<<<<<<< HEAD
        public string? MemberName { get; set; }
        public string? NickName { get; set; }
=======
        //public virtual Member? Member { get; set; }
        public string? MemberName { get; set; }
        public string? NickName { get; set;}
>>>>>>> No3Eyes-branch
        //public string? Image { get; set; }
    }
}
