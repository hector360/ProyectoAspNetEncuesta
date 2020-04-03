using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class NivelCertezas
    {
        public int IdNivel { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public Nullable<decimal> minimo { get; set; }
        public Nullable<decimal> maximo { get; set; }
        public int IdCerteza { get; set; }
    }
}