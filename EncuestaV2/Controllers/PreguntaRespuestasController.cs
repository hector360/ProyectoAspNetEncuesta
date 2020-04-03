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

namespace EncuestaV2.Controllers
{
    public class PreguntaRespuestasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: PreguntaRespuestas
        public async Task<ActionResult> Index()
        {
            var preguntaRespuestas = db.PreguntaRespuestas.Include(p => p.Preguntas);
            return View(await preguntaRespuestas.ToListAsync());
        }

        // GET: PreguntaRespuestas/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaRespuestas preguntaRespuestas = await db.PreguntaRespuestas.FindAsync(id);
            if (preguntaRespuestas == null)
            {
                return HttpNotFound();
            }
            return View(preguntaRespuestas);
        }

        // GET: PreguntaRespuestas/Create
        public ActionResult Create()
        {
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto");
            return View();
        }

        // POST: PreguntaRespuestas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdPreguntaRespuesta,IdPregunta,Texto,Activo")] PreguntaRespuestas preguntaRespuestas)
        {
            if (ModelState.IsValid)
            {
                db.PreguntaRespuestas.Add(preguntaRespuestas);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", preguntaRespuestas.IdPregunta);
            return View(preguntaRespuestas);
        }

        // GET: PreguntaRespuestas/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaRespuestas preguntaRespuestas = await db.PreguntaRespuestas.FindAsync(id);
            if (preguntaRespuestas == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", preguntaRespuestas.IdPregunta);
            return View(preguntaRespuestas);
        }

        // POST: PreguntaRespuestas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdPreguntaRespuesta,IdPregunta,Texto,Activo")] PreguntaRespuestas preguntaRespuestas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(preguntaRespuestas).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.IdPregunta = new SelectList(db.Preguntas, "IdPregunta", "Texto", preguntaRespuestas.IdPregunta);
            return View(preguntaRespuestas);
        }

        // GET: PreguntaRespuestas/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaRespuestas preguntaRespuestas = await db.PreguntaRespuestas.FindAsync(id);
            if (preguntaRespuestas == null)
            {
                return HttpNotFound();
            }
            return View(preguntaRespuestas);
        }

        // POST: PreguntaRespuestas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            PreguntaRespuestas preguntaRespuestas = await db.PreguntaRespuestas.FindAsync(id);
            db.PreguntaRespuestas.Remove(preguntaRespuestas);
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
    }
}
