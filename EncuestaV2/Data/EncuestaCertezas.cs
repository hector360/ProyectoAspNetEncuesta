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
    
    public partial class EncuestaCertezas
    {
        public int IdEncuestaCertezas { get; set; }
        public int IdEncuesta { get; set; }
        public int IdCertezas { get; set; }
    
        public virtual EncuestaTipo EncuestaTipo { get; set; }
        public virtual Certezas Certezas { get; set; }
    }
}
