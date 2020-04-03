using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class FechaEncuesta
    {
        public int IdFechaEncuesta { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaTermino { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdEncuesta { get; set; }

        
        public List<Models.DameCalificacion> resultados2 { get; set; }

        public FechaEncuesta()
        {
            this.resultados2 = new List<Models.DameCalificacion>();
        }
    }
}