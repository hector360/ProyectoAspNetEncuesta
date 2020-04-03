function Preguntas(isDebug) {

    this.Siguiente = function (j) {
        console.log(j);
        $('#pregunta-' + j).addClass('activo').removeClass('oculto');
        var p2 = Number(j) - 1;
        $('#pregunta-' + p2).addClass('oculto').removeClass('activo');
    }

    this.GetPreguntas = function () {
        //console.info(dns+ '/Preguntas/GetPreguntas', 'dns');
        try {
            var preg = {
                Nombre: $('#nombre').val(),//
                Apellido: $('#apellido').val(),//


            }

            var data = {
                url: '/api/ApiPreguntas',
                type: 'GET',
                data: preg,
                datatype: 'json',
                callback: Encuesta.Preguntas.RespuestaGetPreguntas
            }
            Encuesta.Preguntas.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    this.RespuestaGetPreguntas = function (response) {
        console.log(response);
        var html = '';
        
        for (var i = 0; i <= response.jsonPregunta.length - 1; i++) {
            var d = response.listaPreguntas.Preguntas[i];
            var activo = (i + 1 == 1) ? 'activo' : 'oculto';
            html += '<div id="pregunta-' + (i + 1) + '" class="' + activo + ' questions-slider">' +
                '<p><span class="q-n">' + d.IdPregunta + '</span>' + d.Texto + '</p>' +
                '<a class="btn btn-squiggly" onclick="Encuesta.Preguntas.Siguiente(' + (i + 2) + ')">Sig.Pregunta</a>' +
                '</div>';
            for (var j = 0; j <= d.Respuestas.length - 1; j++) {
                var r2 = d.preguntasRespuestas.PreguntaRespuesta[j];
                html += '<div class="respuestas" id="respuestas-">' +
                    '         <a class="btn btn-primary">' + r2.Texto + '</a>' +
                    '          </div>' +
                    '          </div>';

            }
        }

        $('.questions').html(html);

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
}

