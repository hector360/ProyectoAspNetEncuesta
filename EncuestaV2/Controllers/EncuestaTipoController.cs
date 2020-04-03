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
    public class EncuestaTipoController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: EncuestaTipo
        public async Task<ActionResult> Index()
        {   
            return View(await db.EncuestaTipo.ToListAsync());
        }

        // GET: EncuestaTipo/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaTipo encuestaTipo = await db.EncuestaTipo.FindAsync(id);
            if (encuestaTipo == null)
            {
                return HttpNotFound();
            }
            return View(encuestaTipo);
        }

        // GET: EncuestaTipo/Create
        public ActionResult Create()
        {

            ViewBag.Certezas = db.Certezas.ToList();
            //var Certezas = db.Certezas.ToList();
            var encuestaTipo = db.EncuestaTipo.FirstOrDefault();
            return View();

        }

        // POST: EncuestaTipo/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdEncuesta,Nombre,Activo,Descripcion,TiempoActivo,Tiempo,Link")] EncuestaTipo encuestaTipo, int []certezas)
        {
            if (ModelState.IsValid)
            {
                encuestaTipo.FechaCambio = DateTime.Now;
                encuestaTipo.FechaCreacion = DateTime.Now;

                db.EncuestaTipo.Add(encuestaTipo);
                await db.SaveChangesAsync();
      

            var idencuestatipo = encuestaTipo.IdEncuesta;
            for (int i = 0; i < certezas.Length; i++)
            {
                EncuestaCertezas c = new EncuestaCertezas { IdEncuesta = idencuestatipo, IdCertezas = certezas[i] };

                db.EncuestaCertezas.Add(c);
                await db.SaveChangesAsync();
            }

                return RedirectToAction("Index");
            }

            return View(encuestaTipo);
        }

        // GET: EncuestaTipo/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaTipo encuestaTipo = await db.EncuestaTipo.FindAsync(id);
            if (encuestaTipo == null)
            {
                return HttpNotFound();
            }
            ViewBag.Certezas = db.Certezas.ToList();
            ViewBag.EncuestaCertezas = db.EncuestaCertezas.Where(p => p.IdEncuesta == id).ToList();
            return View(encuestaTipo);
        }

        // POST: EncuestaTipo/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdEncuesta,Nombre,FechaCreacion,Activo,Descripcion,FechaCambio,TiempoActivo,Tiempo,Link")] EncuestaTipo encuestaTipo, int[] certezas)
        {
            encuestaTipo.FechaCambio = DateTime.Now;
            encuestaTipo.FechaCreacion = DateTime.Now;
            if (ModelState.IsValid)
            {
                
                db.Entry(encuestaTipo).State = EntityState.Modified;

                var idencuestatipo = encuestaTipo.IdEncuesta;
                //var query = (from a in db.EncuestaCertezas
                //             where a.IdEncuesta == encuestaTipo.IdEncuesta
                //             select a.IdEncuesta).ToList();
                foreach (var item in db.EncuestaCertezas)
                {
                    if(item.IdEncuesta == idencuestatipo)
                    {
                        db.EncuestaCertezas.Attach(item);
                        db.EncuestaCertezas.Remove(item);
                        //await db.SaveChangesAsync();
                    }

                }
                await db.SaveChangesAsync();
                for (int i = 0; i < certezas.Length; i++)
                {
                    EncuestaCertezas c = new EncuestaCertezas { IdEncuesta = idencuestatipo, IdCertezas = certezas[i] };
                    db.EncuestaCertezas.Add(c);
                    await db.SaveChangesAsync();
                }
                return RedirectToAction("Index");
            }
            return View(encuestaTipo);
        }

        // GET: EncuestaTipo/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EncuestaTipo encuestaTipo = await db.EncuestaTipo.FindAsync(id);
            if (encuestaTipo == null)
            {
                return HttpNotFound();
            }
            return View(encuestaTipo);
        }

        // POST: EncuestaTipo/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            EncuestaTipo encuestaTipo = await db.EncuestaTipo.FindAsync(id);
            db.EncuestaTipo.Remove(encuestaTipo);
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

        [HttpGet]
        public JsonResult GeneratePassword()
        {
            var pwd = Models.Encrypt.GenerarPassword();
            return Json(new { pwd = pwd }, JsonRequestBehavior.AllowGet);
        }
    }
}
