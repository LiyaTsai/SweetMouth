namespace WebApi.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string? Size { get; set; }
        public string? Flavor { get; set; }
        public string Price { get; set; }
        public string ImageName { get; set; }
        public bool? Avalible { get; set; }
        public string? Tag { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public string[] tagArray { get; set; }
    }
}
