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
    public class UsuariosController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: Usuarios
        public async Task<ActionResult> Index()
        {
            var usuarios = db.Usuarios.Include(u => u.Paises);
            return View(await usuarios.ToListAsync());
        }

        // GET: Usuarios/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Usuarios usuarios = await db.Usuarios.FindAsync(id);
            if (usuarios == null)
            {
                return HttpNotFound();
            }
            return View(usuarios);
        }

        // GET: Usuarios/Create
        public ActionResult Create()
        {
            ViewBag.IdPais = new SelectList(db.Paises, "IdPais", "Nombre");
            return View();
        }

        // POST: Usuarios/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdUsuario,Nombre,Apellido,Edad,Genero,IdPais,CP,Telefono,Email,IdEmpresa")] Usuarios usuarios)
        {
            if (ModelState.IsValid)
            {
                var numero = Convert.ToInt32(Session["IdEmpresa"]);
                usuarios.IdEmpresa =numero;
                db.Usuarios.Add(usuarios);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.IdPais = new SelectList(db.Paises, "IdPais", "Nombre", usuarios.IdPais);
            return View(usuarios);
        }

        // GET: Usuarios/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Usuarios usuarios = await db.Usuarios.FindAsync(id);
            if (usuarios == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdPais = new SelectList(db.Paises, "IdPais", "Nombre", usuarios.IdPais);
            return View(usuarios);
        }

        // POST: Usuarios/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdUsuario,Nombre,Apellido,Edad,Genero,IdPais,CP,Telefono,Email")] Usuarios usuarios)
        {
            if (ModelState.IsValid)
            {
                db.Entry(usuarios).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.IdPais = new SelectList(db.Paises, "IdPais", "Nombre", usuarios.IdPais);
            return View(usuarios);
        }

        // GET: Usuarios/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Usuarios usuarios = await db.Usuarios.FindAsync(id);
            if (usuarios == null)
            {
                return HttpNotFound();
            }
            return View(usuarios);
        }

        // POST: Usuarios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Usuarios usuarios = await db.Usuarios.FindAsync(id);
            db.Usuarios.Remove(usuarios);
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

        [AllowCrossSiteJson]
        public JsonResult GuardarUsuario(Usuarios miusuario)
        {
            MensajeRespuesta mensaje = new MensajeRespuesta();
            mensaje.Exito = false;
            int l = 0;
            try
            {
                var log = (from li in db.Usuarios
                           where li.Email == miusuario.Email
                           select li).FirstOrDefault();




                if (log == null)
                {
                    
                    Usuarios usuario = new Usuarios();
                    
                    usuario.Nombre = miusuario.Nombre;
                    usuario.Apellido = miusuario.Apellido;
                    usuario.Edad = miusuario.Edad;
                    usuario.Genero = miusuario.Genero;
                    usuario.IdPais = miusuario.IdPais;
                    usuario.CP = miusuario.CP;
                    usuario.Telefono = miusuario.Telefono;
                    usuario.Email = miusuario.Email;
                    //Revisar el modelo Usurios con la variable Link
                    var Link = miusuario.Link;
                    var MiPutoLink = (from et in db.EncuestaTipo select et).Where(x => x.Link.Contains(Link)).FirstOrDefault();

                    l = MiPutoLink.IdEncuesta;




                    db.Usuarios.Add(usuario);
                    var res = db.SaveChanges();
                    if (res > 0)
                    {
                        mensaje.Exito = true;
                        mensaje.Mensaje = "Se guardaron los datos correctamente";
                        mensaje.Alerta = "alert alert-success";
                        Session["IdUsuario"] = usuario.IdUsuario;
                        mensaje.IdUsuario = usuario.IdUsuario;
                    }
                }
                else
                {
                    mensaje.Exito = true;
                    mensaje.Mensaje = "Redirigiendo a las preguntas por que ya existe el usuario";
                    var Link = miusuario.Link;
                    var MiPutoLink = (from et in db.EncuestaTipo select et).Where(x => x.Link.Contains(Link)).FirstOrDefault();

                    l = MiPutoLink.IdEncuesta;
                    mensaje.IdUsuario = log.IdUsuario;
                    
                    //string Error = "El correo ya existe";
                    //Response.Redirect("/Encuesta/Preguntas?IdUsuaro=" + usuarioId + "&IdEncuesta=" + l);
                }
                
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
            return Json(new { resultado = mensaje, Link = l }, JsonRequestBehavior.AllowGet);
        }
    }
}
