namespace WebApi.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int MemberId { get; set; }
        public string? ProductName { get; set; }
        public string? DiscountCode { get; set; }
        public double? Spend { get; set; }
        public string? Delivary { get; set; }
        public int Amount { get; set; }
    }
}
