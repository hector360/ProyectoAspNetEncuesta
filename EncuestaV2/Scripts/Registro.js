function Registro(IsDebug) {
    var dns = '';
    if (IsDebug) {
        dns = 'http://localhost:2205';
    } else {
        dns = 'http://admin.humansearch.aasoftware.mx';
    }


    this.GuardarRegistro = function () {

        var resultado = Encuesta.Registro.ValidarRegistro();
        console.info(resultado);
        if (resultado) {
            var usuario = {
                Nombre: $('#nombre').val(),//
                Apellido: $('#apellido').val(),//
                Edad: $('#edad').val(),//
                Genero: $('#genero').val(),//
                IdPais: $('#pais').val(),
                CP: $('#cp').val(),
                Telefono: $('#mobile').val(),
                Email: $('#email').val(),
                Link: $('#Link').val()
            }

            
            console.info(usuario);
            var data = {
                url: '/Usuarios/GuardarUsuario',
                data: usuario,
                callback: Encuesta.Registro.RespGuardarDatos
            };
            Encuesta.Main.CargaDatosCors(data);
        }

    };
    this.RespGuardarDatos = function (response) {
        console.log(response.resultado.Mensaje);
        if (response.resultado.Exito) {
            var IdUsuaro = response.resultado.IdUsuario;
            var Link = response.Link;
            //alert(IdUsuaro);
            window.location.href = "/Encuesta/Preguntas?IdUsuaro=" + IdUsuaro + "&IdEncuesta=" + Link;
        } else {
            console.log(response);
        }
    }

    this.ValidarRegistro = function () {
        contador = 0;
        $('.required').each(function () {
            console.info($(this).val(), $(this).attr('id'));
            if ($(this).val() <= 0) {
                $(this).addClass('requerido');
                contador += 1;
            }

        });
        console.log(contador);
        if (contador == 0) {
            console.log("todo bien");
            return true;
        } else {
            console.log("campos vacios");
            return false;
        }
    }
    //this.removerRequired = function () {
    //    $('#nombre').removeClass('requerido');
    //    $('#apellido').removeClass('requerido');
    //    $('#edad').removeClass('requerido');
    //    $('#cp').removeClass('requerido');
    //    $('#email').removeClass('requerido');
    //    $('#mobile').removeClass('requerido');
    //}

    this.removerRequired = function (elemento) {
        var valor = $(elemento).val();
        console.info(valor);
        if (valor.length > 0) {
            $(elemento).removeClass('requerido');
        } else {
            $(elemento).addClass('requerido');
        }
    }

}