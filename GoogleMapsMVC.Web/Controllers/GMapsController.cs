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

        [HttpPost]
        public JsonResult Save(decimal Latitude, decimal Longitude)
        {
            //TODO: Add code for saving to DB

            return Json(new { Status = "Success" });
        }
    }
}