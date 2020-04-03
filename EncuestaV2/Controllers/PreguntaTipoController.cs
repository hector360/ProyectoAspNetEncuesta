using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EncuestaV2.Data;

namespace EncuestaV2.Controllers
{
    public class PreguntaTipoController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: PreguntaTipo
        public ActionResult Index()
        {
            return View(db.PreguntaTipo.ToList());
        }

        // GET: PreguntaTipo/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaTipo preguntaTipo = db.PreguntaTipo.Find(id);
            if (preguntaTipo == null)
            {
                return HttpNotFound();
            }
            return View(preguntaTipo);
        }

        // GET: PreguntaTipo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PreguntaTipo/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "IdPreguntaTipo,Descripcion")] PreguntaTipo preguntaTipo)
        {
            if (ModelState.IsValid)
            {
                db.PreguntaTipo.Add(preguntaTipo);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(preguntaTipo);
        }

        // GET: PreguntaTipo/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaTipo preguntaTipo = db.PreguntaTipo.Find(id);
            if (preguntaTipo == null)
            {
                return HttpNotFound();
            }
            return View(preguntaTipo);
        }

        // POST: PreguntaTipo/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IdPreguntaTipo,Descripcion")] PreguntaTipo preguntaTipo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(preguntaTipo).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(preguntaTipo);
        }

        // GET: PreguntaTipo/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PreguntaTipo preguntaTipo = db.PreguntaTipo.Find(id);
            if (preguntaTipo == null)
            {
                return HttpNotFound();
            }
            return View(preguntaTipo);
        }

        // POST: PreguntaTipo/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PreguntaTipo preguntaTipo = db.PreguntaTipo.Find(id);
            db.PreguntaTipo.Remove(preguntaTipo);
            db.SaveChanges();
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
