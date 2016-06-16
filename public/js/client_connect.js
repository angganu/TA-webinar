$(document).ready(function() {
    console.log('URL: '+ location.origin);
    console.log('URL: ' + location.href);
   var socket = io.connect(location.href);
    socket.on('move', function(data) {
        console.log(data);
        var imgSrc = 'data:image/png;base64,'+data.imgSrc;
        $('#slide').css('background-image', "url('"+imgSrc+"')");
    })
});