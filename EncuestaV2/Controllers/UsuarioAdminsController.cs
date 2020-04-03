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
    public class UsuarioAdminsController : Controller
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
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdUsuarioAdmin,Nombre,Contrasena,Correo,Activo,FechaAlta,IdEmpresa")] UsuarioAdmin usuarioAdmin)
        {
            if (ModelState.IsValid)
            {
                usuarioAdmin.FechaAlta = DateTime.Now;
                var numero = Convert.ToInt32(Session["IdEmpresa"]);
                usuarioAdmin.IdEmpresa = numero;
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
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdUsuarioAdmin,Nombre,Contrasena,Correo,Activo,FechaAlta")] UsuarioAdmin usuarioAdmin)
        {
            var usuario = (from c in db.UsuarioAdmin
                           where c.IdUsuarioAdmin == usuarioAdmin.IdUsuarioAdmin
                           select c
               ).FirstOrDefault();

            if (ModelState.IsValid)
            {
             


                usuario.Nombre = usuarioAdmin.Nombre;
                usuario.Contrasena = usuarioAdmin.Contrasena;
                usuario.Correo = usuarioAdmin.Correo;
                usuario.Activo = usuarioAdmin.Activo;
               
                //usuario.FechaAlta = usuarioAdmin.FechaAlta;
                //db.Entry(usuario).State = EntityState.Modified;
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
