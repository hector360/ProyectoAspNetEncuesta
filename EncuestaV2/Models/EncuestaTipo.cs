using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class EncuestaTipo
    {
        public int IdEncuesta { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public Boolean Activo { get; set; }
        public DateTime ValorUnitario { get; set; }
        public Certezas Certezas { get; set; }

        public String Link { get; set; }

        public List<Models.Certezas> certezas { get; set; }

        public EncuestaTipo()
        {
            this.certezas = new List<Models.Certezas>();
        }
    }
}