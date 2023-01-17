namespace WebApi.DTO
{
    public class ClassDTO
    {
        public DateTime Date { get; set; }
        public int? MemberId { get; set; }
        public int? ClassId { get; set; }
        public string? ClassName { get; set; }

        public string? MemberName { get; set; }
        public string? NickName { get; set; }
    }
}
