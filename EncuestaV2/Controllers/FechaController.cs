using EncuestaV2.Data;
using EncuestaV2.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EncuestaV2.Controllers
{
    public class FechaController : Controller
    {

        private SurveyEntities db = new SurveyEntities();
        // GET: Fecha

        public JsonResult GuardarFecha(int IdEncuesta, int? IdUsuario)
        {
            List<Models.FechaEncuesta> listaFechas = new List<Models.FechaEncuesta>();
            MensajeRespuesta mensaje = new MensajeRespuesta();
            mensaje.Exito = false;
            try
            {
                //db.CalculoFechas(IdUsuario, IdEncuesta)
               
                listaFechas = (from c in db.CalculoFechas(IdUsuario, IdEncuesta)
                                    select new Models.FechaEncuesta
                                    {
                                       IdFechaEncuesta = c.IdFechaEncuesta,
                                        FechaInicio = c.FechaInicio,
                                        FechaTermino = c.FechaTermino,
                                        IdUsuario = c.IdUsuario,
                                        IdEncuesta = c.IdEncuesta
                                    }).ToList();
                mensaje.Mensaje += "Se guardo la respuesta Correctamente";
                mensaje.IdUsuario = 0;
                mensaje.Alerta = "exito";
                mensaje.Exito = true;
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine(" Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                        mensaje.Mensaje += "Se genero un error" + ve.ErrorMessage;

                    }
                    mensaje.IdUsuario = 0;
                }

                mensaje.Alerta = "alert alert-danger";
            }
            return Json(new { resultado = listaFechas }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RecargarFechaFinal(int IdFechaEncuesta)
        {
            db.ActualizarFechaFinal(IdFechaEncuesta);
            //var data = (from et in db.FechaEncuesta select et).Where(x => x.IdUsuario== IdUsuario && x.IdEncuesta==IdEncuesta).FirstOrDefault();
            //data.FechaTermino = FechaTermino;
            //db.SaveChanges();

            return Json(new { resultado = "se logro papa" }, JsonRequestBehavior.AllowGet);
        }

    }
}