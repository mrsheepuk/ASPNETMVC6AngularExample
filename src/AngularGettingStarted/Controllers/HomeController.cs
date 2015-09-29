using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Hosting;
using AngularGettingStarted.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularGettingStarted.Controllers
{
    public class HomeController : Controller
    {
        IHostingEnvironment m_hostingEnv;
        dynamic m_envInfo;

        public HomeController(IHostingEnvironment hostingEnv)
        {
            m_hostingEnv = hostingEnv;
            m_envInfo = new EnvInfo()
            {
                Development = m_hostingEnv.IsDevelopment(),
                Production = m_hostingEnv.IsProduction(),
                Version = "1.0.0-alpha0"
            };
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            
            return View("Index", m_envInfo);
        }

        public dynamic ApiDetails()
        {
            return new { API = true };
        }
    }
}
