namespace WebApi.DTO
{
    public class BlogDTO
    {
        public int? ArticleID { get; set; }
        public int? MemberID { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public DateTime? Time { get; set; }
        public string? Article { get; set; }
        //public string? Image { get; set; }
    }
}
