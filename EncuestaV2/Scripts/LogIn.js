function LogIn(){
    this.Sign=function(){
        var d= {usuario:$('#username').val(), contrasena:$('#password').val(), ID_OfertaLaboral:$('#ID_OfertaLaboral').val()};
        console.info(d);
        var data={url: 'http://admin.humansearch.aasoftware.mx/Login/Sing?usuario='+d.usuario+'&contrasena='+d.contrasena+'&ID_OfertaLaboral='+d.ID_OfertaLaboral, //  //'http://localhost:26454/Login/Sing', //
                    data:'',
                    callback:HumanSearch.LogIn.ValidarLogin
                };
        HumanSearch.Main.CargaDatosCors(data);
    }
    this.ValidarLogin=function(respuesta){
        console.info(respuesta);
    }
    this.ValidarDuplicado=function(){
        var user=$('#user').val();
        console.info(user, user.length);
        if(user.length>0){
            $('#DataTables_Table_0_wrapper').hide();
            var data={url: 'http://admin.humansearch.aasoftware.mx/Login/ValidarDuplicado', // 'http://localhost:26454/Login/ValidarDuplicado',// 
                    data:{user:user},
                    callback:HumanSearch.LogIn.RespuestaDuplicado
            };
        HumanSearch.Main.CargaDatosCors(data);
      }
        
    }
    this.RespuestaDuplicado=function(response){
        console.info(response, 'RespuestaDuplicado');
        if(response.Usuario){
            console.info("El usuario ya existe");
            var html='El usuario ya existe, recupere su cuenta.';
            $('#info-mensaje').addClass('alert-danger'); 
            $('#info-mensaje').html(html);
        }
    }

    this.GuardarRegistro=function(){
        var UsuarioCandidato={
            user:$('#user').val(),
            pass:$('#pass').val()
        };

        console.info(UsuarioCandidato);
        $('#DataTables_Table_0_wrapper').hide();
        var data={url:  'http://localhost:26454/Login/Register',// 'http://admin.humansearch.aasoftware.mx/ofertaslaborales/GetDetalleOferta', 
                  data:UsuarioCandidato,
                  callback:HumanSearch.LogIn.ResponseRegister
        };
       HumanSearch.Main.CargaDatosCors(data);
        
    }

    this.ResponseRegister=function(response){
        console.info(response);
        if(response.Success){
            var text='El usuario se creó correctamente!';
            $('#info-mensaje').removeClass('alert-danger').addClass('alert-success'); 
            $('#info-mensaje').html(text);
        }
    }

    this.Registrarse=function(opt){
     
        var html ='<div class="form-group">'+
        '					<div class="form-group">'+
        '                           <h4>Registro</h4>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
        '							<input type="text" class="form-control" name="user" id="user" placeholder="Correo" required="required" onblur="HumanSearch.LogIn.ValidarDuplicado();">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
        '							<input type="password" class="form-control" name="pass" id="pass" placeholder="Contraseña" required="required">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
        '							<input type="password" class="form-control" name="pass2" id="pass2" placeholder="Repetir Contraseña" required="required">'+
        '						</div>'+
        '					</div>'+
        '                    <div class="form-group">'+
        '						<button type="button" class="btn btn-primary btn-block btn-lg" onclick="HumanSearch.LogIn.GuardarRegistro()">Crear</button>'+
        '					</div>'+
        '					<p class="hint-text"><a class="pointer" onclick="HumanSearch.Vacantes.Regresar(2);">Regresar a las vacantes </a></p>'+
        '                    <div class="form-group">'+
        '						<div id="info-mensaje" class="alert"> </div>';
        '					</div>'+
        
        $('.login-left').html(html);
    }

    this.RecuperarPassword=function(){
        var html ='<div class="form-group">'+
        '					<div class="form-group">'+
        '                           <h4>Recuperar cuenta</h4>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
        '							<input type="text" class="form-control" name="username" placeholder="Correo" required="required">'+
        '						</div>'+
        '					</div>'+
        '                    <div class="form-group">'+
        '						<button type="submit" class="btn btn-primary btn-block btn-lg">Recuperar</button>'+
        '					</div>'+
        '					<p class="hint-text"><a href="#" class="pointer">Regresar a las vacates</a></p>'+
        '					<p class="hint-text" ><a onclick="HumanSearch.LogIn.Registrarse();"  class="pointer">¿No tienes una cuenta? Registrate aquí</a></p>';
        $('.login-left').html(html);
    }
    this.MostrarRegistro=function(){
        var html ='<div class="form-group job-register-login">'+
        '					<div class="form-group">'+
        '                           <h4>Registro</h4>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-use"></i></span>'+
        '							<input type="text" class="form-control" name="user" id="user" placeholder="Correo" required="required" onblur="HumanSearch.LogIn.ValidarDuplicado();">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-use"></i></span>'+
        '							<input type="password" class="form-control" name="pass" id="pass" placeholder="Contraseña" required="required">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-use"></i></span>'+
        '							<input type="password" class="form-control" name="pass2" id="pass2" placeholder="Repetir Contraseña" required="required">'+
        '						</div>'+
        '					</div>'+
        '                    <div class="form-group">'+
        '						<button type="button" class="btn btn-primary btn-block btn-lg" onclick="HumanSearch.LogIn.GuardarRegistro()">Crear</button>'+
        '					</div>'+
        '                    <div class="form-group">'+
        '						<div id="info-mensaje" class="alert"> </div>';
        '					</div>'+
        
        $('#info-registro').removeClass('oculto').html(html);
    }
    this.MostrarIngreso=function(){
        //$('.job-detail').remove();
        var html = '<div class="form-group job-register-login"><div class="row">'+
        '      <div class="col-md-12 login-left">'+
        '					<div class="form-group">'+
        '                           <h4>Ingreso al sistema</h4>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
        '							<input type="hidden" class="form-control" name="ID_OfertaLaboral" id="ID_OfertaLaboral" value="0">'+
        '							<input type="text" class="form-control" name="username" id="username" placeholder="Usuario" required="required">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<div class="input-group">'+
        '							<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+
        '							<input type="password" class="form-control" name="password" id="password" placeholder="Contranseña" required="required">'+
        '						</div>'+
        '					</div>'+
        '					<div class="form-group">'+
        '						<button type="button" class="btn btn-primary btn-block btn-lg" onclick="HumanSearch.LogIn.Sign();">Ingresar</button>'+
        '					</div>'+
        '					<p class="hint-text"><a  onclick="HumanSearch.LogIn.RecuperarPassword();" class="pointer" >Recuperar contraseña</a></p>'+
        //'					<p class="hint-text"><a  onclick="HumanSearch.Vacantes.Regresar(2);" class="pointer" >Regresar</a></p>'+
        '					<p class="hint-text"><a onclick="HumanSearch.LogIn.Registrarse();" class="pointer">¿No tienes una cuenta? Registrate aquí</a></p>'+
        '			</div>'+
        '</div> </div>';
        $('#info-registro').removeClass('oculto').html(html);
    }
}