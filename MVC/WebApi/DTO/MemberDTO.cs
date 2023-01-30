namespace WebApi.DTO
{
    public class MemberDTO
    {
        public int MemberID { get; set; }
        public string? Name { get; set; }
        public string? NickName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public DateTime? BirthDay { get; set; }
        public string? FavoriteProduct { get; set; }
        public IEnumerable<int>? orderID { get; set; } 
    }
}
