
var sesi;

exports.main = function(req, res){
  	sesi = req.session;
	if(sesi.username) {
		var sesi = {
			iduser : sesi.iduser,
            username : sesi.username,
            level : sesi.level,
            menu : sesi.menu,
            booking : sesi.booking
        };
    	req.getConnection(function(err,connection){
	        var query = connection.query('SELECT * FROM seminar where status = ? or status = ? order by tgl_upload desc',[0,3],function(err,rows){
	            if(err){
	                console.log("Error Selecting : %s ",err );
	            } else {
	            	waktu = new Date().toLocaleDateString();
	          //   	time = waktu.split('/');
	          //   	dd = time[1];
		        	// mm = time[0];
		        	// yy = time[2];
		        	time = waktu.split('-');
	            	dd = time[2];
		        	mm = time[1];
		        	yy = time[0];
	            	pad = "00";
					day = pad.substr(0, pad.length - dd.length) + dd;
					mon = pad.substr(0, pad.length - mm.length) + mm;
	            	datenow = yy+"-"+mon+"-"+day;
	            	var query = connection.query('SELECT * FROM audience join seminar on audience.id_seminar=seminar.id_seminar where audience.username = ? and seminar.waktu like ? order by audience.id_audience desc',[sesi.username,'%'+datenow+'%'],function(err,rowsb){
	            		res.render('audience',{page_title:"Tiens Webinar",sesi,data:rows,listbook:rowsb});
			        });
	            }
	         });
	    });
	}
	else {
	    res.redirect('/');
	}
};

exports.booking = function(req,res){
	sesi = req.session;
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    	if(input.key == input.kode){
    		var query = connection.query('SELECT * FROM audience where id_seminar = ? and username = ?',[input.idseminar,sesi.username],function(err,rowsb){
        		if(rowsb.length >= 1){
        			sesi.booking = "Booking Gagal, Anda sudah melakukan booking untuk seminar ini";
        			res.redirect('/audience');
        		} else {
        			var data = {
			            id_seminar : input.idseminar,
			            username : sesi.username
			        };
			        var query = connection.query("INSERT INTO audience set ? ",data, function(err, rows){
			            sesi.booking = "Booking Success, Silahkan cek daftar booking anda.";
			            res.redirect('/audience');
			        });
        		}
	        });
	    } else {
	        sesi.booking = "Booking Gagal, Kode <b>(KEY)</b> anda salah !";
	    	res.redirect('/audience');
	    }
    });
};


