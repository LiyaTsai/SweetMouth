﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int BuyerId { get; set; }
        public string ProductName { get; set; }
        public string Specifications { get; set; }
        public double? Discount { get; set; }
        public double? Income { get; set; }
        public int Number { get; set; }

        public virtual Member Buyer { get; set; }
        public virtual Product Product { get; set; }
    }
}