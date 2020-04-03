using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EncuestaV2.Data;

using EncuestaV2.Models;

using System.Data.Entity.Validation;

namespace EncuestaV2.Controllers
{
    public class UsuarioRespuestasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: UsuarioRespuestas
        public async Task<ActionResult> Index()
        {
            var usuarioRespuestas = db.UsuarioRespuestas.Include(u => u.PreguntaRespuestas).Include(u => u.Preguntas).Include(u => u.Usuarios);
            return View(await usuarioRespuestas.ToListAsync());
        }

        // GET: UsuarioRespuestas/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioRespuestas usuarioRespuestas = await db.UsuarioRespuestas.FindAsync(id);
            if (usuarioRespuestas == null)
            {
                return HttpNotFound();
            }
            return View(usuarioRespuestas);
        }

        // GET: UsuarioRespuestas/Create
        public ActionResult Create()
        {
            ViewBag.IdPreguntaRespuesta = new SelectList(db.PreguntaRespuestas, "IdPreguntaRespuesta", "Texto");
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto");
            ViewBag.IdUsuario = new SelectList(db.Usuarios, "IdUsuario", "Nombre");
            return View();
        }

        // POST: UsuarioRespuestas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdUsuarioRespuestas,IdPregunta,IdPreguntaRespuesta,IdUsuario")] UsuarioRespuestas usuarioRespuestas)
        {
            if (ModelState.IsValid)
            {
                db.UsuarioRespuestas.Add(usuarioRespuestas);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.IdPreguntaRespuesta = new SelectList(db.PreguntaRespuestas, "IdPreguntaRespuesta", "Texto", usuarioRespuestas.IdPreguntaRespuesta);
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", usuarioRespuestas.IdPregunta);
            ViewBag.IdUsuario = new SelectList(db.Usuarios, "IdUsuario", "Nombre", usuarioRespuestas.IdUsuario);
            return View(usuarioRespuestas);
        }

        // GET: UsuarioRespuestas/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioRespuestas usuarioRespuestas = await db.UsuarioRespuestas.FindAsync(id);
            if (usuarioRespuestas == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdPreguntaRespuesta = new SelectList(db.PreguntaRespuestas, "IdPreguntaRespuesta", "Texto", usuarioRespuestas.IdPreguntaRespuesta);
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", usuarioRespuestas.IdPregunta);
            ViewBag.IdUsuario = new SelectList(db.Usuarios, "IdUsuario", "Nombre", usuarioRespuestas.IdUsuario);
            return View(usuarioRespuestas);
        }

        // POST: UsuarioRespuestas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdUsuarioRespuestas,IdPregunta,IdPreguntaRespuesta,IdUsuario")] UsuarioRespuestas usuarioRespuestas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(usuarioRespuestas).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.IdPreguntaRespuesta = new SelectList(db.PreguntaRespuestas, "IdPreguntaRespuesta", "Texto", usuarioRespuestas.IdPreguntaRespuesta);
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", usuarioRespuestas.IdPregunta);
            ViewBag.IdUsuario = new SelectList(db.Usuarios, "IdUsuario", "Nombre", usuarioRespuestas.IdUsuario);
            return View(usuarioRespuestas);
        }

        // GET: UsuarioRespuestas/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioRespuestas usuarioRespuestas = await db.UsuarioRespuestas.FindAsync(id);
            if (usuarioRespuestas == null)
            {
                return HttpNotFound();
            }
            return View(usuarioRespuestas);
        }

        // POST: UsuarioRespuestas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            UsuarioRespuestas usuarioRespuestas = await db.UsuarioRespuestas.FindAsync(id);
            db.UsuarioRespuestas.Remove(usuarioRespuestas);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //[AllowCrossSiteJson]
        public JsonResult GuardarRespuesta(UsuarioRespuestas mirespuesta)
        {
            MensajeRespuesta mensaje = new MensajeRespuesta();
            mensaje.Exito = false;

            try
            {
                db.GuardarUsuarioRespuestas(mirespuesta.IdPregunta, mirespuesta.IdPreguntaRespuesta, mirespuesta.IdUsuario, mirespuesta.IdEncuesta, mirespuesta.IdFechaEncuesta);

                mensaje.Mensaje += "Se guardo la respuesta Correctamente";
                mensaje.IdUsuario = mirespuesta.IdUsuario;
                mensaje.Alerta = "exito";
                mensaje.Exito = true;
                //if (Convert.ToInt32(resDos) > 0)
                //{
                //    mensaje.Exito = true;
                //    mensaje.Mensaje = "Se guardaron los datos correctamente";
                //    mensaje.Alerta = "alert alert-success";
                //}
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
            return Json(new { resultado = mensaje }, JsonRequestBehavior.AllowGet);
        }
    }
}
