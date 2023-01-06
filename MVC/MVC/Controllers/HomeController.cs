using Microsoft.AspNetCore.Mvc;
using MVC.Models;
using System.Diagnostics;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewBag.Title = "首頁";
            return View();
        }

        public IActionResult product()
        {
            ViewBag.Title = "甜點品項";
            return View();
        }

        public IActionResult contact()
        {
            ViewBag.Title = "聯絡我們";
            return View();
        }

        public IActionResult Layout()
        {
            return View();
        }

        public IActionResult Blog()
        {
            ViewBag.Title = "部落格";
            return View();
        }

        public IActionResult News()
        {
            ViewBag.Title = "最新消息";
            return View();
        }

        public IActionResult Cart()
        {
            ViewBag.Title = "購物車";
            return View();
        }

        public IActionResult orderCustomizedCake()
        {
            ViewBag.Title = "客訂蛋糕";
            return View();
        }

        public IActionResult Class()
        {
            ViewBag.Title = "甜點課程";
            return View();
        }

        public IActionResult Class2()
        {
            ViewBag.Title = "甜點課程";
            return View();
        }

        public IActionResult Calendar()
        {
            ViewBag.Title = "甜點課程";
            return View();
        }

        public IActionResult DemoProduct() 
        {

            ViewBag.Title = "甜點清單DEMO";
            return View();
        }
        public IActionResult memberfrom()
        {
            ViewBag.Title = "會員表單";
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}