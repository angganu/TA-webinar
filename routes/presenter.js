
var sesi;

exports.main = function(req, res){
  	sesi = req.session;
	if(sesi.username) {
		var sesi = {
			iduser : sesi.iduser,
            username : sesi.username,
            level : sesi.level,
            menu : sesi.menu
        };
        if(sesi.menu == "list"){
        	req.getConnection(function(err,connection){
		        var query = connection.query('SELECT * FROM seminar order by tgl_upload desc',function(err,rows){
		            if(err){
		                console.log("Error Selecting : %s ",err );
		            } else {
		            	res.render('presenter',{page_title:"Tiens Webinar",sesi,data:rows});
		            }
		         });
		    });
        } else {
        	res.render('presenter',{page_title:"Tiens Webinar",sesi});
        }
	}
	else {
	    res.redirect('/');
	}
};
