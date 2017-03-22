using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GoogleMapsMVC.Web.Controllers
{
    public class GMapsController : Controller
    {
        // GET: GMaps
        public ActionResult Index()
        {
            return View();
        }
    }
}