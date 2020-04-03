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
    public class UsuarioAdmins2Controller : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: UsuarioAdmins
        public async Task<ActionResult> Index()
        {
            return View(await db.UsuarioAdmin.ToListAsync());
        }

        // GET: UsuarioAdmins/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioAdmin usuarioAdmin = await db.UsuarioAdmin.FindAsync(id);
            if (usuarioAdmin == null)
            {
                return HttpNotFound();
            }
            return View(usuarioAdmin);
        }

        // GET: UsuarioAdmins/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsuarioAdmins/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdUsuarioAdmin,Nombre,Contraseña,Correo,Activo,FechaAlta")] UsuarioAdmin usuarioAdmin)
        {
            if (ModelState.IsValid)
            {
                db.UsuarioAdmin.Add(usuarioAdmin);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(usuarioAdmin);
        }

        // GET: UsuarioAdmins/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioAdmin usuarioAdmin = await db.UsuarioAdmin.FindAsync(id);
            if (usuarioAdmin == null)
            {
                return HttpNotFound();
            }
            return View(usuarioAdmin);
        }

        // POST: UsuarioAdmins/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdUsuarioAdmin,Nombre,Contraseña,Correo,Activo,FechaAlta")] UsuarioAdmin usuarioAdmin)
        {
            if (ModelState.IsValid)
            {
                db.Entry(usuarioAdmin).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(usuarioAdmin);
        }

        // GET: UsuarioAdmins/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UsuarioAdmin usuarioAdmin = await db.UsuarioAdmin.FindAsync(id);
            if (usuarioAdmin == null)
            {
                return HttpNotFound();
            }
            return View(usuarioAdmin);
        }

        // POST: UsuarioAdmins/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            UsuarioAdmin usuarioAdmin = await db.UsuarioAdmin.FindAsync(id);
            db.UsuarioAdmin.Remove(usuarioAdmin);
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
