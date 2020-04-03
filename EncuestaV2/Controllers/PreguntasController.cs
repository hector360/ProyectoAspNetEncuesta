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
    public class PreguntasController : Controller
    {
        private SurveyEntities db = new SurveyEntities();

        // GET: Preguntas
        public async Task<ActionResult> Index()
        {
            var preguntas = db.Preguntas.Where(x => x.Activo == true).Include(p => p.Certezas);
            return View(await preguntas.ToListAsync());
        }

        // GET: Preguntas/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }


            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento");

            var data =( from p in db.Preguntas
                       //join pr in db.PreguntaRespuestas on p.IdPregunta equals pr.IdPregunta
                       join c in db.Certezas on p.IdCerteza equals c.IdCerteza
                        where id == p.IdPregunta
                        select new Models.Preguntas
                       {
                           IDPregunta = p.IdPregunta,
                           Texto = p.Texto,
                           Certezas = new Models.Certezas
                           {
                               AreaConocimiento = c.AreaConocimiento,
                               Factor = c.Factor,
                               IdCerteza = c.IdCerteza,
                               Reactivos = c.Reactivos,
                               ValorTotal = c.ValorTotal,
                               ValorUnitario = c.ValorUnitario
                           },
                           preguntasRespuestas = (from pr in db.PreguntaRespuestas
                                                  where pr.IdPregunta == p.IdPregunta
                                                  select new Models.PreguntaRespuesta
                                                  {
                                                      Activo = pr.Activo,
                                                      Correcta = pr.Correcta,
                                                      Texto = pr.Texto
                                                     
                                                  }).ToList()


                       }).FirstOrDefault();




            return View(data);
        }


        // GET: Preguntas/Create
        public ActionResult Create()
        {
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento");
            return View();
        }

        // POST: Preguntas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "IdPregunta,Texto,Activo,IdCerteza,Correcta")] Preguntas preguntas, string[] Respuesta, int respuestaCorrecta)
        {


            //For para crear el arreglo de las respuestas
            List<bool> respuestas2 = new List<bool>();
            for (int i = 0; i < Respuesta.Length; i++)
            {
                bool resp = false;
                if (i == respuestaCorrecta)
                {
                    resp = true;
                }
                respuestas2.Add(resp);
            }
            if (ModelState.IsValid)
            {
                db.Preguntas.Add(preguntas);
                await db.SaveChangesAsync();

                var IdPregunta = preguntas.IdPregunta;

                
                for (int i = 0; i < Respuesta.Length; i++)
                {
                    //PreguntaRespuestas pr = new PreguntaRespuestas { Activo = true, IdPregunta = IdPregunta, Texto = Respuesta[i], Correcta = respuestas2[i] };
                    //Console.WriteLine(pr.Correcta);
                    db.GuardarPreguntasRespuestas(IdPregunta, Respuesta[i], true, respuestas2[i]);

                    //db.PreguntaRespuestas.Add(pr);
                    //db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", preguntas.IdCerteza);
            return View(preguntas);
        }

        // GET: Preguntas/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //Preguntas preguntas = await db.Preguntas.FindAsync(id);
            //if (preguntas == null)
            //{
            //    return HttpNotFound();
            //}
            //ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", preguntas.IdCerteza);
            //ViewBag.IdPregunta = new SelectList(db.PreguntaRespuestas, "IdPreguntaRespuesta", "Texto");

            var data = (from p in db.Preguntas
                            //join pr in db.PreguntaRespuestas on p.IdPregunta equals pr.IdPregunta
                       where id == p.IdPregunta join c in db.Certezas on p.IdCerteza equals c.IdCerteza
                        select new Models.Preguntas
                        {
                            IDPregunta = p.IdPregunta,
                            Texto = p.Texto,
                            Activo = p.Activo,
                            IdCerteza = p.IdCerteza,
                            Certezas = new Models.Certezas
                            {
                                AreaConocimiento = c.AreaConocimiento,
                                Factor = c.Factor,
                                IdCerteza = c.IdCerteza,
                                Reactivos = c.Reactivos,
                                ValorTotal = c.ValorTotal,
                                ValorUnitario = c.ValorUnitario
                            },
                            preguntasRespuestas = (from pr in db.PreguntaRespuestas
                                                   where pr.IdPregunta == p.IdPregunta
                                                   select new Models.PreguntaRespuesta
                                                   {
                                                       Activo = pr.Activo,
                                                       Correcta = pr.Correcta,
                                                       Texto = pr.Texto

                                                   }).ToList(),
                            Certeza = (from cs in db.Certezas
                                    select new Models.Certezas
                                    {
                                        AreaConocimiento = cs.AreaConocimiento,
                                        Factor = cs.Factor,
                                        IdCerteza = cs.IdCerteza,
                                        Reactivos = cs.Reactivos,
                                        ValorTotal = cs.ValorTotal,
                                        ValorUnitario = cs.ValorUnitario
                                    }).ToList()



                        }).FirstOrDefault();
            return View(data);
        }

        // POST: Preguntas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "IdPregunta,Texto,Activo,IdCerteza")] Preguntas preguntas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(preguntas).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.IdCerteza = new SelectList(db.Certezas, "IdCerteza", "AreaConocimiento", preguntas.IdCerteza);
            return View(preguntas);
        }

        // GET: Preguntas/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Preguntas preguntas = await db.Preguntas.FindAsync(id);
            if (preguntas == null)
            {
                return HttpNotFound();
            }
            return View(preguntas);
        }

        // POST: Preguntas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Preguntas preguntas = await db.Preguntas.FindAsync(id);
            db.Entry(preguntas).State = EntityState.Modified;
            //db.Preguntas.Remove(preguntas);
            preguntas.Activo = false;
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
