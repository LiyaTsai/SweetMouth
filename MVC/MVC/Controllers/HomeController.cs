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

        //private readonly IHttpContextAccessor _context;
        //public HomeController(IHttpContextAccessor con)
        //{ _context = con; }


        public IActionResult Index()
        {
            //_context.HttpContext.Session.SetString("Session內容", "Session");
            return View();
        }

        public IActionResult product()
        {
            ViewBag.btitle = "甜點品項";
            return View();
        }

        public IActionResult productDetail()
        {
            ViewBag.btitle = "產品細節";
            return View();
        }

        public IActionResult contact()
        {
            ViewBag.btitle = "聯絡我們";
            return View();
        }

        public IActionResult Layout()
        {
            return View();
        }

        public IActionResult Blog()
        {
            return View();
        }

        public IActionResult blogPage()
        {
            return View();
        }

        public IActionResult Cart()
        {
            ViewBag.btitle = "購物車";
            return View();
        }

        public IActionResult orderCustomizedCake()
        {
            ViewBag.btitle = "客訂蛋糕";
            return View();
        }

        public IActionResult Class()
        {
            ViewBag.btitle = "甜點課程";
            return View();
        }

        public IActionResult Class2()
        {
            ViewBag.btitle = "甜點課程";
            return View();
        }

        public IActionResult Calendar()
        {
            ViewBag.btitle = "甜點課程";
            return View();
        }
        public IActionResult memberfrom()
        {

            ViewBag.btitle = "甜點清單DEMO";
            return View();
        }

        public IActionResult MemberInfo()
        {
            return View();
        }

        public IActionResult DemoProduct()
        {
            return View();
        }

        public IActionResult blogpostForm()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}