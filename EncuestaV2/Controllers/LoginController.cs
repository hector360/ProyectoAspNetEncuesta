using EncuestaV2.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EncuestaV2.Controllers
{
    public class LoginController : Controller
    {
        private SurveyEntities db = new SurveyEntities();
        // GET: Login
        public ActionResult Index()
        {
                return View();

        }

        public ActionResult validar(string user, string password)
        {
            var log = (from l in db.UsuarioAdmin
                       where l.Correo == user
                       select l).FirstOrDefault();

            if (log == null)
            {
                ViewBag.Error = "Correo Incorrecto";
                return View("index");
            }

            else if (log.Contrasena != password)
            {
                ViewBag.Error = "Contraseña Incorrecta";
                return View("index");
                
            }else if (log.Activo != true)
            {
                ViewBag.Error = "Contacte con el administrador";
                return View("index");
            }else 
            {
                Session["Nombre"] = log.Nombre;
                Session["Correo"] = log.Correo;
                Session["IdEmpresa"] = log.IdEmpresa;
            }
            
            
            return RedirectToAction("../preguntas");

        }
        public ActionResult LoginUsuarios()
        {
            return View();

        }

        public ActionResult LogOut()
        {
            Session["Nombre"] = null;
            Session["Correo"] = null;
            Session["IdEncuesta"] = null;

            return RedirectToAction("Index");
        }

    }
}