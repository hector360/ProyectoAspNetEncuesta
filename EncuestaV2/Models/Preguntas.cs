using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class Preguntas
    {
        public int IDPregunta { get; set; }
        public string Texto { get; set; }
        public int IdCerteza { get; set; }
        public Certezas Certezas { get; set; }
        public bool Activo { get; set; }
        public string AreaConocimiento { get; set; }
        public List<Models.Certezas> Certeza { get; set; }
        public int IdEncuesta { get; set; }

        public int TiempoNotNull { get; set; }
        public List<Models.PreguntaRespuesta> preguntasRespuestas { get; set; }

        public Preguntas()
        {
            this.preguntasRespuestas = new List<Models.PreguntaRespuesta>();
        }
    }
}