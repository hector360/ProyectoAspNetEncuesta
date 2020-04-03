function Certainty() {

    this.GetCertaintys = function () {
        var data = { url: '/Certezas/GetCertezas', type: 'GET', data: '', datatype: 'json', callback: Survey.Certainty.BuildData };
        Survey.Main.CargaDatosAsync(data);
    }

    this.BuildData = function (res) {
        console.info(res);

        var html = '';

        for (var i = 0; i <= res.jsonCertezas.length - 1; i++) {
            var data = res.jsonCertezas[i];
            html += '<div class="card">' +
            '    <div class="card-header">' +
                '        <a class="card-link" data-toggle="collapse" href="#collapse-' + (i + 1) + '">' +
                data.AreaConocimiento + ' <div class=""><span class="badge badge-info"> Reactivos: ' + data.Reactivos + '</span> <span class="badge badge-primary"> Valor total: ' + data.ValorTotal + '</span> <span class="badge badge-dark"> Valor unitario: ' + data.ValorUnitario + '</span>' + '<a href = "/Certezas/Edit/' + data.IdCerteza + '">Editar</a>' /*+ '&nbsp;&nbsp;&nbsp;&nbsp'+ '<a>' + data.Descripcion + '<a/>'*/ + '</div>' +
            '        </a>' +
            '    </div>' +
            '    <div id="collapse-' + (i + 1) + '" class="collapse" data-parent="#accordion">' +
            '        <div class="card-body">'+
            '        <ul class="list-group">';
            for (var j = 0; j <= data.Preguntas.length - 1; j++) {
                var preg = data.Preguntas[j];
                console.info(preg.IDPregunta);
                html += '<li class="list-group-item">' + preg.Texto + "<a href=" + "/Preguntas/Edit/" + preg.IDPregunta +">Editar</a>" + '</li>'; //  '<div class="">' + preg.Texto + '</div>';
                
            }


            html += '  </ul>      </div>' +
            '    </div>' +
            '</div>';


        }

        $('#accordion').html(html);
    }
}