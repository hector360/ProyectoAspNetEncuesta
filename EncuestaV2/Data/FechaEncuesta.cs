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
    
    public partial class FechaEncuesta
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FechaEncuesta()
        {
            this.UsuarioRespuestas = new HashSet<UsuarioRespuestas>();
        }
    
        public int IdFechaEncuesta { get; set; }
        public Nullable<System.DateTime> FechaInicio { get; set; }
        public Nullable<System.DateTime> FechaAbandono { get; set; }
        public Nullable<System.DateTime> FechaTermino { get; set; }
        public Nullable<int> IdUsuario { get; set; }
        public Nullable<int> IdEncuesta { get; set; }
    
        public virtual EncuestaTipo EncuestaTipo { get; set; }
        public virtual Usuarios Usuarios { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UsuarioRespuestas> UsuarioRespuestas { get; set; }
    }
}