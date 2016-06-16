$(document).ready(function() {
    var id = $('#docId').val();
    var key = $('#docKey').val();
    var index= 1;

    $('#prev').bind('click', function() {
        var url = '/seminar/move/'+id+'/'+key+'/'+index;
        console.log(url);
        $.get(url, function(data){
            var imgSrc = 'data:image/png;base64,'+data.imgSrc;
            $('#slide').css('background-image', "url('"+imgSrc+"')");
        });
        index = (index-1) < 0 ? 0 : index-1;
    });
    $('#next').bind('click', function() {
        var url = '/seminar/move/'+id+'/'+key+'/'+index;
        $.get(url, function(data) {
            var imgSrc = 'data:image/png;base64,'+data.imgSrc;
            $('#slide').css('background-image', "url('"+imgSrc+"')");
        });
        index++;
    });
});