using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EncuestaV2.Models
{
    public class CertezasView
    {
        public int IdCerteza { get; set; }
        public string AreaConocimiento { get; set; }
        public int Reactivos { get; set; }
        public int? Total { get; set; }
        public int? PreguntasRestantes { get; set; }
        public decimal ValorTotal { get; set; }
        public decimal ValorUnitario { get; set; }
        public string Factor { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Descripcion { get; set; }
    }
}