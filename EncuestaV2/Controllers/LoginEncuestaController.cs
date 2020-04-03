using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EncuestaV2.Data;

namespace EncuestaV2.Controllers
{
    public class LoginEncuestaController : Controller
    {
        private SurveyEntities db = new SurveyEntities();
        // GET: LoginEncuesta
        public ActionResult Index(string Link)
        {
            ViewBag.Link = Link;
            return View();
        }
        public ActionResult validar(string IdEncuesta, string user, string password)
        {
            var Link = IdEncuesta;
            var MiPutoLink = (from et in db.EncuestaTipo select et).Where(x => x.Link.Contains(Link)).FirstOrDefault();

           var IdEncuesta2 = MiPutoLink.IdEncuesta;

            var log = (from l in db.Usuarios
                       where l.Email == user
                       select l).FirstOrDefault();




            if (log == null)
            {
                ViewBag.Error = "Correo Incorrecto";
                return View("index");
            }
            var IdUsuaro = log.IdUsuario;


            return Redirect("../Encuesta/Preguntas?IdUsuaro=" + IdUsuaro+"&IdEncuesta="+ IdEncuesta2);

        }
    }
}