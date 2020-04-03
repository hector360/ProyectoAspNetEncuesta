using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class Certezas
    {
        public int IdCerteza { get; set; }
        public string AreaConocimiento { get; set; }
        public int Reactivos { get; set; }
        public decimal ValorTotal { get; set; }
        public decimal ValorUnitario { get; set; }
        public string Factor { get; set; }
        public string Descripcion { get; set; }

        public List<Models.Preguntas> preguntas { get; set; }
        public List<Models.NivelCertezas> nivelCertezas { get; set; }
        public Certezas()
        {
            this.preguntas = new List<Models.Preguntas>();
            this.nivelCertezas = new List<NivelCertezas>();
        }
    }
}