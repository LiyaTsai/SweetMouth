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
            ViewBag.btitle = "首頁";
            return View();
        }

        public IActionResult product()
        {
            ViewBag.btitle = "甜點品項";
            return View();
        }

        public IActionResult productDetail()
        {

            ViewBag.btitle = "甜點品項";

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
            ViewBag.btitle = "部落格";
            return View();
        }

        public IActionResult blogPage()
        {
            ViewBag.btitle = "部落格";
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

        public IActionResult Class3()
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
            ViewBag.btitle = "會員表單";
            return View();
        }

        public IActionResult MemberInfo()
        {
            ViewBag.btitle = "會員資訊";

            return View();
        }

        public IActionResult DemoProduct()
        {

            ViewBag.btitle = "甜點品項";
            return View();
        }

        public IActionResult blogpostForm()
        {
            ViewBag.btitle = "部落格";
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}