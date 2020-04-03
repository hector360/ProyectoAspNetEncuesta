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
using System.Data.Entity.Validation;

namespace EncuestaV2.Controllers
{
    public class CertezasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: Certezas
        public async Task<ActionResult> Index()
        {
            List<Models.CertezasView> cer = new List<Models.CertezasView>();
            
            cer =  (from c in db.GetCertezas() select new Models.CertezasView {

                IdCerteza = c.IdCerteza,
                AreaConocimiento = c.AreaConocimiento,
                Reactivos = c.Reactivos,
                Total = c.total,
                PreguntasRestantes = c.Preguntas_Restantes,
                ValorTotal = c.ValorTotal,
                ValorUnitario = c.ValorUnitario,
                Factor = c.Factor,
                FechaCreacion = c.FechaCreacion
                
            }).ToList() ;

            return View(cer);
        }


        public JsonResult GetCertezas()
        {
            //var data = (from p in db.Preguntas
            //            join c in db.Certezas on p.IdCerteza equals c.IdCerteza
            //            select new Models.Preguntas
            //            {
            //                IDPregunta = p.IdPregunta,
            //                Texto = p.Texto,
            //                Certezas = new Models.Certezas
            //                {
            //                    AreaConocimiento = c.AreaConocimiento,
            //                    Factor = c.Factor,
            //                    IdCerteza = c.IdCerteza,
            //                    Reactivos = c.Reactivos,
            //                    ValorTotal = c.ValorTotal,
            //                    ValorUnitario = c.ValorUnitario
            //                },
            //                preguntasRespuestas = (from pr in db.PreguntaRespuestas
            //                                       where pr.IdPregunta == p.IdPregunta
            //                                       select new Models.PreguntaRespuesta
            //                                       {
            //                                           Activo = pr.Activo,
            //                                           Correcta = pr.Correcta,
            //                                           Texto = pr.Texto

            //                                       }).ToList()


            //            }).ToList();


            var data = (from c in db.Certezas
                        //join p in db.Preguntas on c.IdCerteza equals p.IdCerteza
                        //join pr in db.PreguntaRespuestas on p.IdPregunta equals pr.IdPregunta
                        select new Models.CertezasPreguntasView {
                            AreaConocimiento= c.AreaConocimiento, 
                            Descripcion=c.Descripcion, 
                            Factor=c.Factor, 
                            FechaCreacion=c.FechaCreacion, 
                            IdCerteza=c.IdCerteza, 
                            Desordenar=c.Desordenar, 
                            Reactivos=c.Reactivos, 
                            ValorTotal=c.ValorTotal, 
                            ValorUnitario=c.ValorUnitario, 
                            Preguntas=(from p in db.Preguntas
                                       where p.IdCerteza==c.IdCerteza
                                       select new Models.Preguntas {
                                           IDPregunta=p.IdPregunta, 
                                           Texto=p.Texto, 
                                           preguntasRespuestas=(from pr in db.PreguntaRespuestas
                                                                where pr.IdPregunta== p.IdPregunta
                                                                select new Models.PreguntaRespuesta {
                                                                    Activo=pr.Activo, 
                                                                    Correcta=pr.Correcta, 
                                                                    Texto=pr.Texto

                                                                }).ToList()
                                           
                                       }).ToList()
                            

                        }).ToList();


            return Json(new { jsonCertezas= data }, JsonRequestBehavior.AllowGet);
        }

        // GET: Certezas/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }


            var data = (from c in db.Certezas
                        join p in db.Preguntas on c.IdCerteza equals p.IdCerteza
                        select new Models.Certezas
                        {
                            IdCerteza = c.IdCerteza,
                            AreaConocimiento = c.AreaConocimiento,
                            Factor = c.Factor,
                            Reactivos = c.Reactivos,
                            ValorTotal = c.ValorTotal,
                            ValorUnitario = c.ValorUnitario,
                            Descripcion = c.Descripcion,
                            preguntas = (from pr in db.Preguntas
                                         where pr.IdCerteza == c.IdCerteza
                                         select new Models.Preguntas
                                            {
                                                IDPregunta = p.IdPregunta,
                                                Texto = p.Texto

                                            }).ToList()
                        }).FirstOrDefault();

            //Certezas certezas = await db.Certezas.FindAsync(id);

            return View(data);
        }

        // GET: Certezas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Certezas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdCerteza,AreaConocimiento,Descripcion,Reactivos,ValorTotal,ValorUnitario,Factor,FechaCreacion")] Certezas certezas, String[] Titulo, String[] DescripcionNivel, Decimal[] Min, Decimal[] Max)

        {
            if (ModelState.IsValid)
            {
                //Inserto certezas y cambio los valores
                certezas.Activo = true;
                certezas.ValorTotal = certezas.Reactivos * certezas.ValorUnitario;
                certezas.FechaCreacion = DateTime.Now;
                certezas.Factor = "Puntos";
                db.Certezas.Add(certezas);
                await db.SaveChangesAsync();

                var IdCerteza = certezas.IdCerteza;


                for (int i = 0; i < Titulo.Length; i++)
                {
                    NivelCertezas nc = new NivelCertezas {Titulo = Titulo[i],Descripcion = DescripcionNivel[i],maximo = Max[i],minimo = Min[i], IdCerteza = IdCerteza };
                    //Console.WriteLine(pr.Correcta);
                    //db.GuardarPreguntasRespuestas(IdPregunta, Respuesta[i], true, respuestas2[i]);

                    db.NivelCertezas.Add(nc);
                    db.SaveChanges();
                }

                return RedirectToAction("Index");
            }

            return View(certezas);
        }

        // GET: Certezas/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //Certezas certezas = await db.Certezas.FindAsync(id);

            var data = (from c in db.Certezas
                            //    join n in db.NivelCertezas on c.IdCerteza equals n.IdCerteza
                        where c.IdCerteza == id
                        select new Models.Certezas
                        {
                            IdCerteza = c.IdCerteza,
                            AreaConocimiento = c.AreaConocimiento,
                            Factor = c.Factor,
                            Reactivos = c.Reactivos,
                            ValorTotal = c.ValorTotal,
                            ValorUnitario = c.ValorUnitario,
                            Descripcion = c.Descripcion,
                            nivelCertezas = (from niv in db.NivelCertezas
                                         where niv.IdCerteza == c.IdCerteza
                                         select new Models.NivelCertezas
                                         {
                                             Descripcion = niv.Descripcion.Trim(),
                                             IdCerteza = niv.IdCerteza,
                                             IdNivel = niv.IdNivel,
                                             maximo = niv.maximo,
                                             minimo = niv.minimo,
                                             Titulo = niv.Titulo.Trim()

                                         }).ToList()
                        }).FirstOrDefault();


            if (data == null)
            {
                return HttpNotFound();
            }
            return View(data);
        }

        // POST: Certezas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdCerteza,AreaConocimiento,Reactivos,ValorTotal,ValorUnitario,Factor,FechaCreacion,Descripcion")] Certezas certezas, string[] Titulo, string[] DescripcionNivel, Decimal[] Min, Decimal[] Max, int[] IDNIVEL)
        {
            certezas.FechaCreacion = DateTime.Now;
            certezas.Factor = "Puntos";
            certezas.Activo = true;
            var IdCerteza = certezas.IdCerteza;
            
            //var data = (from niv in db.NivelCertezas
            //            where niv.IdCerteza == IdCerteza
            //            select new Models.NivelCertezas
            //            {
            //                Descripcion = niv.Descripcion,
            //                IdCerteza = niv.IdCerteza,
            //                IdNivel = niv.IdNivel,
            //                maximo = niv.maximo,
            //                minimo = niv.minimo,
            //                Titulo = niv.Titulo
            //            }).ToList();
            try
            {
                if (ModelState.IsValid)
                {
                    for (int i = 0; i < Titulo.Length; i++)
                    {
                        var n = db.NivelCertezas.Find(IDNIVEL[i]);
                        n.Titulo = Titulo[i];
                        n.Descripcion = DescripcionNivel[i];
                        n.maximo = Max[i];
                        n.minimo = Min[i];
                        n.IdCerteza = IdCerteza;
                        db.Entry(n).State = EntityState.Modified;
                        n = null;
                    }
                    db.Entry(certezas).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }

            return View(certezas);
        }

        // GET: Certezas/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Certezas certezas = await db.Certezas.FindAsync(id);
            if (certezas == null)
            {
                return HttpNotFound();
            }
            return View(certezas);
        }

        // POST: Certezas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Certezas certezas = await db.Certezas.FindAsync(id);
            db.Entry(certezas).State = EntityState.Modified;
            //db.Certezas.Remove(certezas);
            certezas.Activo = false;
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
