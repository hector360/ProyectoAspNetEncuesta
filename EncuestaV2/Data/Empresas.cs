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
    
    public partial class Empresas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Empresas()
        {
            this.EncuestaTipo = new HashSet<EncuestaTipo>();
            this.UsuarioAdmin = new HashSet<UsuarioAdmin>();
            this.Usuarios = new HashSet<Usuarios>();
            this.Certezas = new HashSet<Certezas>();
        }
    
        public int IdEmpresa { get; set; }
        public string Nombre { get; set; }
        public string RFC { get; set; }
        public string PersonaContacto { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public Nullable<System.DateTime> FechaAlta { get; set; }
        public Nullable<System.DateTime> FechaCambio { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<System.DateTime> Vigencia { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EncuestaTipo> EncuestaTipo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UsuarioAdmin> UsuarioAdmin { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usuarios> Usuarios { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Certezas> Certezas { get; set; }
    }
}
