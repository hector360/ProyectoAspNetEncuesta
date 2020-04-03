using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class DameCalificacion
    {
        public int IdFechaEncuesta { get; set; }
        public DateTime? FechaInicio { get; set; }
        public string Fecha { get; set; }
        public string AreaConocimiento { get; set; }
        public decimal? Calificacion { get; set; }
        public int? Correctas { get; set; }
        public int IdCerteza { get; set; }
        public int? IdEncuesta { get; set; }
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Clave_Certeza { get; set; }
        public string Clave_Certeza2 { get; set; }
        public int? ReactivosObtenidos { get; set; }
        public int? Total { get; set; }

        
    }
}