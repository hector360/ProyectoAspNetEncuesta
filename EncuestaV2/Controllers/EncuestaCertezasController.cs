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
    public class EncuestaCertezasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: EncuestaCertezas
        public ActionResult Index()
        {
            var encuestaCertezas = db.EncuestaCertezas.Include(e => e.Certezas).Include(e => e.EncuestaTipo);
            return View(encuestaCertezas.ToList());
        }

        // GET: EncuestaCertezas/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaCertezas encuestaCertezas = db.EncuestaCertezas.Find(id);
            if (encuestaCertezas == null)
            {
                return HttpNotFound();
            }
            return View(encuestaCertezas);
        }

        // GET: EncuestaCertezas/Create
        public ActionResult Create()
        {
            ViewBag.IdCertezas = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento");
            ViewBag.IdEncuesta = new SelectList(db.EncuestaTipo, "IdEncuesta", "Nombre");
            return View();
        }

        // POST: EncuestaCertezas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "IdEncuestaCertezas,IdEncuesta,IdCertezas")] EncuestaCertezas encuestaCertezas)
        {
            if (ModelState.IsValid)
            {
                db.EncuestaCertezas.Add(encuestaCertezas);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IdCertezas = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", encuestaCertezas.IdCertezas);
            ViewBag.IdEncuesta = new SelectList(db.EncuestaTipo, "IdEncuesta", "Nombre", encuestaCertezas.IdEncuesta);
            return View(encuestaCertezas);
        }

        // GET: EncuestaCertezas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaCertezas encuestaCertezas = db.EncuestaCertezas.Find(id);
            if (encuestaCertezas == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdCertezas = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", encuestaCertezas.IdCertezas);
            ViewBag.IdEncuesta = new SelectList(db.EncuestaTipo, "IdEncuesta", "Nombre", encuestaCertezas.IdEncuesta);
            return View(encuestaCertezas);
        }

        // POST: EncuestaCertezas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IdEncuestaCertezas,IdEncuesta,IdCertezas")] EncuestaCertezas encuestaCertezas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(encuestaCertezas).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IdCertezas = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", encuestaCertezas.IdCertezas);
            ViewBag.IdEncuesta = new SelectList(db.EncuestaTipo, "IdEncuesta", "Nombre", encuestaCertezas.IdEncuesta);
            return View(encuestaCertezas);
        }

        // GET: EncuestaCertezas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaCertezas encuestaCertezas = db.EncuestaCertezas.Find(id);
            if (encuestaCertezas == null)
            {
                return HttpNotFound();
            }
            return View(encuestaCertezas);
        }

        // POST: EncuestaCertezas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EncuestaCertezas encuestaCertezas = db.EncuestaCertezas.Find(id);
            db.EncuestaCertezas.Remove(encuestaCertezas);
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
