using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncuestaV2.Models
{
    public class MensajeRespuesta
    {
            public bool Exito { get; set; }
            public string Alerta { get; set; }
            public string Mensaje { get; set; }
            public int IdUsuario { get; set; }

    }
}