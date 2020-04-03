window.onload = function Sola() {
    //Encuesta.Preguntas2.GetPreguntas();
    //Encuesta.Preguntas2.moverDerecha(0);
    //Encuesta.Preguntas2.tiempo();
    //window.preventDefault();
    
    
}
function Preguntas2(isDebug) {
    var dns = '';
    if (isDebug) {
        dns = 'http://localhost:2205'
    } else {
        dns = 'midominio';
    }
    var jsonPreg = {
        pregTotal: 0,
        respTotal: 0,
        idPreg: []
    };
    var jsonFecha = {
        IdFechaEncuesta: 0
    };

    //agregar el 
    //var estaAhi = jsonPreg.idPreg.indexOf(55);
    //jsonPreg.idPreg.push(7)
    this.Siguiente = function (j) {
        console.log(j);
        $('#pregunta-' + j).addClass('activo').removeClass('oculto');
        var p2 = Number(j) - 1;
        $('#pregunta-' + p2).addClass('oculto').removeClass('activo');
        //aqui
    }

    this.GetPreguntas = function () {
        //$(".oculto .contP label input").prop("disabled", true);
        Encuesta.Preguntas2.checarFecha();
        //console.info(dns+ '/Preguntas/GetPreguntas', 'dns');
        var IdEncuesta = $('#IdEncuesta').val();
        //Encuesta.Preguntas2.checarFecha(IdEncuesta);
        try {
            var data = {
                url: '/api/ApiPreguntas?IdEncuesta=' + IdEncuesta,
                type: 'GET',
                data: '',
                callback: Encuesta.Preguntas2.RespuestaGetPreguntas
            }
            Encuesta.Preguntas2.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }

    this.RespuestaGetPreguntas = function (response) {
        var tiempoS = response[0].TiempoNotNull;
        Encuesta.Preguntas2.tiempo(tiempoS); 
        
        //   console.log(response);
        //console.info('el tamaño de esta respuesta es de: '+response.length);
        var html = '';
        var cert = '';
        var TotalP = response.length;
        var cadaP = 100 / TotalP;
        var contador = 0;
        var cadaP2 = cadaP;
        jsonPreg.pregTotal = TotalP;
        //<div class="questions-slider active" data-q="1"><span class="q-n">1.</span> ¿Haces comentarios o acusaciones irreflexivas de las cuales te arrepientes después?</div>
        for (var i = 0; i <= response.length - 1; i++) {
            var r = response[i];
            var contPop = response.length;
            
            var AreaConocimiento = r.AreaConocimiento;
            var IPregunta = r.IDPregunta;
            var IdEncuesta = r.IdEncuesta;
            var activo = (i + 1 == 1) ? 'activo' : 'oculto';
            var activo2 = (i + 1 == 1) ? 'activo2' : 'oculto2';

            //var TotalP = response.length;
            //var cadaP = 100 / TotalP;

            cert += '<div class="certeza1 ' + activo2 + '" dta-c="' + (i + 1) + '" >' + AreaConocimiento +'</diV>';
            html += '<div id="' + IPregunta + '" class="questions-slider ' + activo + '" dta-q="' + (i + 1) + '"><div class="tPreg"><div class="tituloPreg">' + r.Texto + '</div></div>' +
                '<div class="contP">';
            for (var j = 0; j <= r.preguntasRespuestas.length - 1; j++) {
                var r2 = r.preguntasRespuestas[j];
                var contador2 = j + 1;
                var activo = contador2;
                var IRespuesta = r2.IdPreguntaRespuesta;

                html += '<label id="p' + i + 's' + IRespuesta + '" class="container" >' + r2.Texto
                    + '<input id="'+i+'" onclick="Encuesta.Preguntas2.tipoRespuesta(' + IRespuesta + ',' + cadaP2 + ',' + IPregunta + ',' + IdEncuesta + ',' + contPop + ')" type="radio" name="radio' + i + '">'
                    + '<span class="checkmark"></span>'
                    + '</label>';
            }

            cadaP2 = cadaP + cadaP2;
            html += '</div>' +
            '</div>';
            //    '<div id="test-progress" class="">' +
            //    '<div class="progress-expanation over-expanation" style="opacity: 1;"></div>' +
            //    '<p class="text-center">—DESARROLLO DEL TEST—</p>' +
            //    '<div class="progress">' +
            //    '<div class="progress-bar progress-bar-striped active" style="width: ' + contador + '%;">' + contador+'</div>' +
            //        '</div>' +
            //    '</div>' +
            //    '</div>';
            //var contador = contador + cadaP;
        }


        $('.questions').html(html);
        $('.certeza').html(cert);
        //window.location.href = "http://localhost:2205/Encuesta/Respuestas";
    }
    this.moverDerecha = function (posicionActual) {
        var valorX = 100 * posicionActual;
        $('.questions').css('transform', 'translateX(-' + valorX + '%)');
        $('[dta-q="' + (Number(posicionActual) + 1) + '"]').removeClass('oculto').addClass('activo');
        $('[dta-q="' + Number(posicionActual) + '"]').removeClass('activo').addClass('oculto');

        $('[dta-c="' + (Number(posicionActual) + 1) + '"]').removeClass('oculto2').addClass('activo2');
        $('[dta-c="' + Number(posicionActual) + '"]').removeClass('activo2').addClass('oculto2');
        $(".oculto .contP label input").prop("disabled", true);
        $(".activo .contP label input").prop("disabled", false);
        console.log(posicionActual);
        if (posicionActual == 1) {
            //console.log("aqui escondo");
            //$('#izquierdaF').addClass('esconderF');
            $('#izquierdaF').addClass('mostrar');
        }
    }
    this.moverIzquierda = function (posicionActual) {
        $('#izquierdaD').addClass('mostrar');
        //console.log("pa:" + posicionActual);
        var posicionAnterior = Number(posicionActual) - 2;
        var valorx = 100 * posicionAnterior;
        $('.questions').css('transform', 'translatex(-' + valorx + '%)');
        $('[dta-q="' + (posicionAnterior + 1) + '"]').removeClass('oculto').addClass('activo');
        $('[dta-q="' + (posicionAnterior + 2) + '"]').removeClass('activo').addClass('oculto ');
        $(".oculto .contP label input").prop("disabled", true);
        $(".activo .contP label input").prop("disabled", false);
        console.log("pactual:" + posicionAnterior);

        if (posicionActual == 2) {
            //console.log("aqui escondo");
            $('#izquierdaF').removeClass('mostrar');

            //$('#izquierdaF').addClass('esconderF');


        }

    }

    this.flechaMDerecha = function () {
        //var valorId = $('.activo').attr('dta-q');
        ////console.log(valorId);
        //Encuesta.Preguntas2.moverDerecha(valorId);
    }
    this.checarActivo2 = function () {
        var valorId = $('.activo').attr('dta-q');

        //console.log(valorId);
        Encuesta.Preguntas2.moverIzquierda(valorId);
    }
    this.checarActivo3 = function () {
        var valorId = $('.activo').attr('dta-q');
        //console.log(valorId);
        Encuesta.Preguntas2.moverDerecha(valorId);
    }
    this.tipoRespuesta = function (IdResp, cadaP2, IdPregunta, IdEncuesta, contPop) {
        //var contadorResp = jsonPreg.idPreg.length;

        
        //------------------------------------------------------
        var usuarioSesion = $('#IdUsuaro').val();

        var totalPreguntas = jsonPreg.pregTotal
        var totalPreguntas2 = totalPreguntas;
        var estaAhi = jsonPreg.idPreg.indexOf(IdPregunta)
        if (estaAhi == -1) {
            jsonPreg.idPreg.push(IdPregunta);
            console.log(estaAhi);
            console.log(jsonPreg);
            var contadorResp = jsonPreg.idPreg.length;

            jsonPreg.respTotal = contadorResp;
            var veinticinco = contPop / 4;
            var veinteCerrado = Math.round(veinticinco);
            var veinteCerrado2 = veinteCerrado + veinteCerrado;
            var veinteCerrado3 = veinteCerrado2 + veinteCerrado;
            //var veinticinco2 = veinticinco + veinticinco;
            console.log("popdivi: " + veinteCerrado);
            var popConti = $('.activo').attr('dta-q');
            if (popConti == veinteCerrado) {
                //alert("25% de la encuesta");
                Encuesta.PopUps2.PopUpGeneral({ title: "Progreso", body: "Has completado un 25% de la encuesta" });
            }
            if (popConti == veinteCerrado2) {
                //alert("50% de la encuesta");
                Encuesta.PopUps2.PopUpGeneral({ title: "Progreso", body: "Has completado un 50% de la encuesta" });
            }
            if (popConti == veinteCerrado3) {
                //alert("75% de la encuesta");
                //Encuesta.PopUps4.PopUpGeneral({ title: "Progreso", body: "Has completado un 75% de la encuesta" });
                Encuesta.PopUps2.PopUpGeneral({ title: "Progreso", body: "Has completado un 75% de la encuesta" });
            }
            console.info(contadorResp, totalPreguntas2);
            if (contadorResp == totalPreguntas2) {
                let IdFechaEncuesta = localStorage.getItem('IdFechaEncuesta');
                Encuesta.Preguntas2.ActualizarF(IdFechaEncuesta);
                window.location.href = "/Encuesta/Respuestas?IdUsuario=" + usuarioSesion + '&IdEncuesta=' + IdEncuesta;
            }
            console.log("aqui va el contador: " + contadorResp);
        } else {
            console.log("este idP ya existe");
        }


        $('.progress-bar').css('width', cadaP2 + '%');
        //var id = $('.questions-slider.activo a').each(function () {
        //    $(this).removeClass('colorBack');
        //});
        var valorId = $('.activo').attr('dta-q');

        var sacarId = $('.activo').attr('dta-q');
        var sacarId2 = $('.activo').attr('id');

        // var IPregunta = (sacarId2 - 1);
        var nPregunta = Number(sacarId) - 1;
        



        console.log(nPregunta, IdResp);
        console.log('p' + (nPregunta - 1) + 's' + IdResp);
        console.log(sacarId2, IdResp)
        var RespuestaPregunta = {
            IdPregunta: IdPregunta,
            IdPreguntaRespuesta: IdResp,
            IdUsuario: usuarioSesion,
            IdEncuesta: IdEncuesta,
            IdFechaEncuesta: jsonFecha.IdFechaEncuesta
        };


        var data = {
            url: '/UsuarioRespuestas/GuardarRespuesta',
            data: RespuestaPregunta,
            callback: Encuesta.Preguntas2.RespGuardarDatos
        };

        var valorId = $('.activo').attr('dta-q');
        //var valorId2 = valorId - 1;
        //var contadorResp2 = contadorResp - 1;
        //console.log("contadorResp:" + contadorResp);
        //console.log("valorId:" + valorId);
        if (contadorResp == valorId) {
            //console.log("aqui escondo");
            $('#izquierdaD').removeClass('mostrar');
        }

        Encuesta.Main.CargaDatosAsync(data);
        setTimeout(function () {

            Encuesta.Preguntas2.moverDerecha(valorId);
        }, 400);
        
    }
    

    this.RespGuardarDatos = function (response) {
        console.log(response.resultado);
        //console.log("no muestra response");
    }
    this.CargaDatosCors = function (Op) {
        var _url = (Op.url) ? Op.url : '';
        var _data = (Op.data) ? Op.data : '';
        var _callback = (Op.callback) ? Op.callback : '';

        $.ajax({
            url: _url,
            async: false,
            crossDomain: true,
            data: _data,
            type: "GET",
            async: false,
            jsonp: false,
            success: function (response) {
                console.info(response, 'CargaDatos');
                if (_callback) {
                    console.info("Hay Callback");
                    _callback(response);
                }
            }
        });
    }
    this.ObtenerBoton = function (j) {
        Encuesta.Preguntas2.Siguiente(j);
    }
    this.ObtenerValor = function (n) {
        var usuarioSesion = $('#IdUsuaro').val();
        console.info("Respuesta: " + n + " Usuario: " + usuarioSesion);
    }
    this.tiempo = function (tiempoS) {
        if (tiempoS == 0) {
            $('#timer').addClass('oculto');
        } else {
            html = '';
            html += 'aqui va el tiempo';
            counter = 0;
            //var timeLeft = 5400;
            var tiempoS2 = tiempoS * 60;
            var timeLeft = tiempoS2;
            var tiempdiv = timeLeft / 4;
            var tiemp1 = tiempdiv;
            var tiemp2 = tiempdiv + tiempdiv;
            var tiemp3 = tiempdiv + tiempdiv + tiempdiv;
            //console.log(tiemp1, tiemp2, tiemp3)
            function convertSeconds(s) {
                var min = Math.floor(s / 60);
                var sec = s % 60;
                sec = (sec < 10) ? '0' + sec : sec;
                return min + ':' + sec;
            }
            function timeIt() {
                counter++;
                var tempo = timeLeft - counter;
                console.log("tiempo:" + timeLeft);
                //if (tempo < 15) {
                //    $('#timer').addClass('colorUno');

                //}
                if (tempo < tiemp3) {
                    $('#timer').removeClass('coloruno');
                    $('#timer').addClass('colordos');
                    $('#barraProgress').removeClass('coloruno');
                    $('#barraProgress').addClass('colordos');
                }
                if (tempo < tiemp2) {
                    $('#timer').removeClass('colordos');
                    $('#timer').addClass('colortres');
                    $('#barraProgress').removeClass('colordos');
                    $('#barraProgress').addClass('colortres');
                }
                if (tempo < tiemp1) {
                    $('#timer').removeClass('colortres');
                    $('#timer').addClass('colorcuatro');
                    $('#barraProgress').removeClass('colortres');
                    $('#barraProgress').addClass('colorcuatro');
                }

                if (tempo == 0) {
                    //alert("se te acabo el tiempo brother");
                    //var title = "Fin de encuesta";
                    //var body = "se acabo el tiempo";
                    //Encuesta.PopUps.PopUpGeneral({ title: "Fin de la Encuesta", body: "Se acabo tu tiempo Brother" });
                    Encuesta.PopUps2.PopUpGeneral({ title: "Fin de la Encuesta", body: "Se acabo tu tiempo!" });
                    window.location.href = "/Encuesta";
                } else {
                    $('#timer').html(convertSeconds(timeLeft - counter));
                }

            }
            setInterval(timeIt, 1000);
        }

    }
    this.Instrucciones = function (evento) {
        html = '';
        html += '<div class="contInstruc">' +
            '<h2>Instrucciones</h2>' +
            '<p>1.- Lee con atención.</p>' +
            '<p>2.- Tienes 90 minutos.</p>' +
            '<p>3.- Una respuesta correcta para cada pregunta, no pueden elegirse 2.</p>' +
            '<p>4.- Una vez comenzado no puede ser pausado.</p>';
        Encuesta.PopUps2.PopUpGeneral({ title: "Aviso!!", body: html, funClick: "Encuesta.Preguntas2.GetPreguntas();" });

    }
    this.Verificar = function (event) {
        var tecla = event.keyCode;
        event.preventDefault();
        //console.info(tecla);
        if (tecla == 116) {

            //Encuesta.PopUps.PopUpGeneral({ title: "sdsdsdsd", body: "sdsdsdsd" });
            Encuesta.PopUps2.PopUpGeneral({ title: "Aviso!!", body: "No puedes Refrescar la pagina" });
            //confirm('Si recarga la página perdera todos los datos ingresados,<br> ¿Deseas recargar la página?"', function (result) {
            //    if (result) {
            //        location.reload();
            //    } else {
            //        event.keyCode = 0;
            //        event.returnValue = false;
            //    }
            //});
        }

    }

    this.ActualizarF = function (IdFechaEncuesta) {
        try {
            var data = {
                url: '/Fecha/RecargarFechaFinal?IdFechaEncuesta=' + IdFechaEncuesta,
                type: 'GET',
                data: '',
                callback: Encuesta.Preguntas2.RespuestaActualizarFecha
            }
            Encuesta.Preguntas2.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    this.RespuestaActualizarFecha = function (response) {
        console.log(response);
    }
    this.checarFecha = function (){
        var IdEncuesta = $('#IdEncuesta').val();
        var usuarioSesion = $('#IdUsuaro').val();
        
        try {
            var data = {
                url: '/Fecha/GuardarFecha?IdEncuesta=' + IdEncuesta + '&IdUsuario=' + usuarioSesion,
                type: 'GET',
                data: '',
                callback: Encuesta.Preguntas2.RespuestaFecha
            }
            Encuesta.Preguntas2.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    
    this.RespuestaFecha = function(response){
        console.log(response);
        console.log(response.resultado[0].IdFechaEncuesta);
        var IdFechaEncuesta = response.resultado[0].IdFechaEncuesta;
        localStorage.setItem('IdFechaEncuesta', IdFechaEncuesta);
        
        //jsonFecha.IdFechaEncuesta.push(response.resultado[0].IdFechaEncuesta);
        jsonFecha.IdFechaEncuesta = response.resultado[0].IdFechaEncuesta;
    }
    //this.sacarHora = function () {
    //    var tiempo = new Date();
    //    var fecha = tiempo.getDate();
    //    var hora = tiempo.getHours();
    //    var minutos = tiempo.getMinutes();
    //    var segundos = tiempo.getSeconds();
    //    var TiempoEncuesta = 5000;
    //    var HA = hora * 3600;
    //    var MA = minutos * 60;
    //    var SA = segundos;
    //    var segTotal = (HA + MA + SA);
    //    var segFinal = segTotal +TiempoEncuesta;

    //    console.log(segTotal);
    //    var usuario = {
    //        SegTotal: segTotal,
    //        SegFinal: segFinal,
    //        IdUsuario: IdUsuario


    //    }

    //    var data = {
    //        url: dns + '/Usuarios/GuardarUsuario',
    //        data: usuario,
    //        callback: Encuesta.Registro.RespGuardarDatos
    //    };
    //    Encuesta.Preguntas2.CargaDatosCors(data);
    //}
}

