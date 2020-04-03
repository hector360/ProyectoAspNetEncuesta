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
    public class NivelCertezasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: NivelCertezas
        public ActionResult Index()
        {
            var nivelCertezas = db.NivelCertezas.Include(n => n.Certezas);
            return View(nivelCertezas.ToList());
        }

        // GET: NivelCertezas/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NivelCertezas nivelCertezas = db.NivelCertezas.Find(id);
            if (nivelCertezas == null)
            {
                return HttpNotFound();
            }
            return View(nivelCertezas);
        }

        // GET: NivelCertezas/Create
        public ActionResult Create()
        {
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento");
            return View();
        }

        // POST: NivelCertezas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "IdNivel,Titulo,Descripcion,minimo,maximo,IdCerteza")] NivelCertezas nivelCertezas)
        {
            if (ModelState.IsValid)
            {
                db.NivelCertezas.Add(nivelCertezas);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", nivelCertezas.IdCerteza);
            return View(nivelCertezas);
        }

        // GET: NivelCertezas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NivelCertezas nivelCertezas = db.NivelCertezas.Find(id);
            if (nivelCertezas == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", nivelCertezas.IdCerteza);
            return View(nivelCertezas);
        }

        // POST: NivelCertezas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IdNivel,Titulo,Descripcion,minimo,maximo,IdCerteza")] NivelCertezas nivelCertezas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(nivelCertezas).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", nivelCertezas.IdCerteza);
            return View(nivelCertezas);
        }

        // GET: NivelCertezas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            NivelCertezas nivelCertezas = db.NivelCertezas.Find(id);
            if (nivelCertezas == null)
            {
                return HttpNotFound();
            }
            return View(nivelCertezas);
        }

        // POST: NivelCertezas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            NivelCertezas nivelCertezas = db.NivelCertezas.Find(id);
            db.NivelCertezas.Remove(nivelCertezas);
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
