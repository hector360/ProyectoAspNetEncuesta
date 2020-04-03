function LoginEncuesta() {

    this.mandarLink = function () {

        var resultado = Encuesta.LoginEncuesta.ValidarRegistro();
        console.info(resultado);
        if (resultado) {
            var usuario = {
                Link: $('#Link2').val()
            }


            console.info(usuario);
            var data = {
                url: '/LoginEncuesta/GuardarUsuario',
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