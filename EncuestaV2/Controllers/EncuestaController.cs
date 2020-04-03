using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EncuestaV2.Data;
using EncuestaV2.Models;


namespace EncuestaV2.Controllers
{
    public class EncuestaController : Controller
    {
        private SurveyEntities db = new SurveyEntities();
        // GET: Encuesta
        public ActionResult Index(string Link, string Error)
        {
            ViewBag.Link = Link;
            ViewBag.Error = Error;
            return View();
        }

        public ActionResult Preguntas(int IdUsuaro, int IdEncuesta)
        {
            Session["UsuarioID"] = IdUsuaro;
            ViewBag.IdUsuaro = IdUsuaro;
            ViewBag.IdEncuesta = IdEncuesta;
            return View();
        }
        public ActionResult Respuestas(int? IdUsuario, int? IdEncuesta)
        {
            ViewBag.IdUsuario = IdUsuario;
            ViewBag.IdEncuesta = IdEncuesta;
            return View();
        }
        public JsonResult ObtenerCalificacion(int? IdUsuario, int? IdEncuesta)
        {

            //List<Models.FechaEncuesta> resultados = new List<Models.FechaEncuesta>();



            var resultado = (from oc in db.ObtenerCalificacion(IdUsuario, IdEncuesta)
                             select oc).GroupBy(x => x.Fecha).ToList();

                          
            return Json(new { jsonResultados = resultado }, JsonRequestBehavior.AllowGet);
        }
    }
}
