window.onload = function() {
	var messages = []; 
	var socket = io.connect('http://103.236.201.226:80');
	// var socket = io.connect('http://192.168.1.100:8080');
	// var socket = io.connect('http://localhost:8080');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function(data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++){
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function() {
		if(name.value == ""){
			alert("Please type your name!");
		} else {
			var text = field.value;
			socket.emit('send', {message:text, username:name.value});
			field.value = "";
		}
	};
	$('.mess-content').scrollTop($('.mess-content')[0].scrollHeight);

	socket.on('userspic', function(data) {
        raw = "<div class='inuser'><p align='center'><b>Daftar Hadir Audience</b></p><b>Pendaftar : <len id='len'>0</len></b><br><b>Online : <num id='num'>0</num></b></div>";
        var num=0;
        for (var i = 0; i < data.audi.length; i++) {
        	if(data.audi[i].status == 1){
        		raw += '<a href="/profile/'+ data.audi[i].username +'" title="'+ data.audi[i].username +'" target="_Blank"><img src="/../images/photo/'+ data.audi[i].photo +'"></a>';
        		num++;
        	}
        };
        $('#users').html(raw);
        $("#len").html(data.audi.length);
        $("#num").html(num);
    });
}