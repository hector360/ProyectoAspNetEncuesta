using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class PreguntaRespuesta
    {
        public int IdPreguntaRespuesta { get; set; }
        public int IdPregunta { get; set; }
        public string Texto { get; set; }
        public bool Activo { get; set; }
        public bool Correcta { get; set; }
    }
}