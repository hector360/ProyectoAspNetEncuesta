function Main(){
    this.CargaDatosAsync = function (Op) {
        var r = '';
        var _url = (Op.url) ? Op.url : '';
        var _type = (Op.type) ? Op.type : 'POST';
        var _data = (Op.data) ? Op.data : '';
        var _datatype = (Op.datatype) ? Op.datatype : 'html';
        var _callback = (Op.callback) ? Op.callback : '';
        var _async = true;// (Op.async) ? Op.async : true;
        var _crossDomain = Op.crossDomain ? Op.crossDomain : 'false';

        $.ajax({
            type: _type,
            url: _url,
            data: _data,
            dataType: _datatype,
            async: _async,
            crossDomain:_crossDomain,
            success: function (response) {
                //console.info("CargaDatos2", response, typeof response);
                if (_callback) {
                    _callback(response);
                }
                r = response;
            }
        });
        return r;
    }

    this.CargaDatosCors=function(Op){
        var _url = (Op.url) ? Op.url : '';
        var _data = (Op.data) ? Op.data : '';
        var _callback = (Op.callback) ? Op.callback : '';
        
        $.ajax({
            url: _url, // 'http://admin.humansearch.aasoftware.mx//ofertaslaborales/GetOfertas',
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

    this.CargaDatos = function (Op) {
        var r = '';
        var _url = (Op.url) ? Op.url : '';
        var _type = (Op.type) ? Op.type : 'POST';
        var _data = (Op.data) ? Op.data : '';
        var _datatype = (Op.datatype) ? Op.datatype : 'html';
        var _callback = (Op.callback) ? Op.callback : '';
        var _async = false;// (Op.async) ? Op.async : true;
        var _crossDomain = Op.crossDomain ? Op.crossDomain : 'false';
        $.ajax({
            type: _type,
            url: _url,
            data: _data,
            dataType: _datatype,
            async: _async,
            crossDomain: _crossDomain,
            success: function (response) {
                //console.info("CargaDatos2", response, typeof response);
                r = response;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                r = XMLHttpRequest.responseText + '--' + textStatus;
            }
        });
        return r;
    }

}