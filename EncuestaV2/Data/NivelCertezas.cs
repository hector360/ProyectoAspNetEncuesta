//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EncuestaV2.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class NivelCertezas
    {
        public int IdNivel { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public Nullable<decimal> minimo { get; set; }
        public Nullable<decimal> maximo { get; set; }
        public int IdCerteza { get; set; }
    
        public virtual Certezas Certezas { get; set; }
    }
}
