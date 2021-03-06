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
    
    public partial class Certezas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Certezas()
        {
            this.EncuestaCertezas = new HashSet<EncuestaCertezas>();
            this.Preguntas = new HashSet<Preguntas>();
            this.NivelCertezas = new HashSet<NivelCertezas>();
        }
    
        public int IdCerteza { get; set; }
        public string AreaConocimiento { get; set; }
        public int Reactivos { get; set; }
        public decimal ValorTotal { get; set; }
        public decimal ValorUnitario { get; set; }
        public string Factor { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public bool Desordenar { get; set; }
        public string Descripcion { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> IdEmpresa { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EncuestaCertezas> EncuestaCertezas { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Preguntas> Preguntas { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NivelCertezas> NivelCertezas { get; set; }
        public virtual Empresas Empresas { get; set; }
    }
}
