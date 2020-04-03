using EncuestaV2.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

using System.Web.Http;

namespace EncuestaV2.Controllers
{
    public class ApiPreguntasController : ApiController
    {
        private SurveyEntities db = new SurveyEntities();


        [HttpGet]
        public IHttpActionResult Get(int IdEncuesta)
        {
            //var IdEncuesta = 37;


            List<Models.Preguntas> listaPreguntas = new List<Models.Preguntas>();


            listaPreguntas = (from p in db.GetPreguntasByEncuesta(IdEncuesta)
                              select new Models.Preguntas
                              {
                                  IDPregunta = p.IdPregunta,
                                  Texto = p.texto,
                                  IdEncuesta = IdEncuesta,
                                  TiempoNotNull = p.TiempoNotNull,
                                  AreaConocimiento = p.AreaConocimiento,
                                  preguntasRespuestas = (from pr in db.PreguntaRespuestas
                                                         where p.IdPregunta == pr.IdPregunta
                                                         select new Models.PreguntaRespuesta
                                                         {
                                                             IdPreguntaRespuesta = pr.IdPreguntaRespuesta,
                                                             IdPregunta = pr.IdPregunta,
                                                             Texto = pr.Texto
                                                         }).ToList()
                              }).ToList();


            return Ok(listaPreguntas);

        }

       

            // POST: api/ApiPreguntas
            public void Post([FromBody]string value)
        {
        }

        // PUT: api/ApiPreguntas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ApiPreguntas/5
        public void Delete(int id)
        {
        }
    }
}
