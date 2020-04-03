function PopUps2() {
    this.PopUpGeneral = function (op) {

        var title = op.title ? op.title : 'Información general';
        var body = op.body ? op.body : 'Sin información';
        var funClick = op.funClick ? op.funClick : '';
        var clase = op.clase ? op.clase : '';
        var id = op.id ? op.id : '';
        var html = '<div class="modal fade" id="modalinfo" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">'
            + '  <div class="modal-dialog" id="' + id + '">'
            + '    <div class="modal-content">'
            + '         <div class="cabezera ' + clase + '">'
            + '         <div class="cimage">'
            + '         <img class="impop" src="/Content/img/15.png" />'
            + '         </div>'
            + '         </div>'
            + '         <div class="modal-body">' + body
            + '         </div>'
            + '         <div class="modal-footer">'
            + '             <button type="button" class="btn colorB" onclick="'+funClick+'" data-dismiss="modal">Ok</button>'
            + '     </div>'
            + '    </div>'
            + '   </div>'
            + '  </div>';
        $('.popup-info').html(html);
        $('#modalinfo').modal({ backdrop: 'static', keyboard: true, show: true });

    }


}