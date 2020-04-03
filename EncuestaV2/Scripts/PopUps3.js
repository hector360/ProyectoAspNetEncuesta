function PopUps() {
    this.PopUpGeneral = function (op) {

        var title = op.title ? op.title : 'Información general';
        var body = op.body ? op.body : 'Sin información';
        var clase = op.clase ? op.clase : 'btn-primary';
        var id = op.id ? op.id : '';
        var html = '<div class="modal fade" id="modalinfo" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">'
            + '  <div class="modal-dialog" id="' + id + '">'
            + '    <div class="modal-content">'
            + '         <div class="cabezera ' + clase + '">'
            + '         <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ></button>'
            + '         <img src="~/Content/img/12.png" />'
            + '         <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            + '         </div>'
            + '         <div class="modal-body">' + body
            + '         </div>'
            + '         <div class="modal-footer">'
            + '             <button type="button" class="btn colorB" onclick="Encuesta.Preguntas2.tiempo();" data-dismiss="modal">Ok</button>'
           
            + '     </div>'
            + '    </div>'
            + '   </div>'
            + '  </div>';
        $('.popup-info').html(html);
        $('#modalinfo').modal({ backdrop: 'static', keyboard: true, show: true });

    }


}