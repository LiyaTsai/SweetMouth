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
            return View();
        }

        public IActionResult product()
        {
            return View();
        }

        public IActionResult contact()
        {
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

        public IActionResult News()
        {
            return View();
        }

        public IActionResult Cart()
        {
            return View();
        }

        public IActionResult orderCustomizedCake()
        {
            return View();
        }

        public IActionResult Class()
        {
            return View();
        }

        public IActionResult Class2()
        {
            return View();
        }

        public IActionResult Calendar()
        {
            return View();
        }

        public IActionResult DemoProduct() 
        {
            return View();
        }
        public IActionResult memberfrom()
        {
            return View();
        }
        public IActionResult MemberInfo()
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