var fs = require('fs');
var sesi;
var crypto	= require('crypto');

exports.login = function(req,res){
	sesi = req.session;
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var username = input.username;
        var password = crypto.createHash('sha1').update(input.password).digest("hex");
        
        var query = connection.query("SELECT * FROM users WHERE username = ? AND password = ?",[username,password], function(err, rows){
       		if(rows.length == 1){
       			sesi.username = username;
            sesi.iduser = rows[0].id_user;
       			sesi.level = rows[0].level;
            if(sesi.level == 1){
       			  res.redirect('/presenter/listseminar');
            } else {
              res.redirect('/audience');
            }
       		} else {
       			var notif = {
		            login_notif : "Gagal Login! Username / Password Anda Salah.",
		            regist_notif : ""
		        };
       			res.render('home',{page_title:"Tiens Webinar",notif});
       		}
        });
    });
};

exports.register = function(req,res){
	sesi = req.session;
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    	var password = crypto.createHash('sha1').update(input.password).digest("hex");
    	var data = {
            username : input.username,
            password : password,
            email : input.email,
            level : "2"
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows){
            if (err) {
              var notif = {
  		            login_notif : "",
  		            regist_notif : "Username Sudah Digunakan."
  		        };
       			  res.render('home',{page_title:"Tiens Webinar",notif});
            } else {
              var data2 = {
                  username : input.username,
                  tgl_daftar : new Date()
              };
              connection.query('INSERT INTO data_user set ? ',data2);
            	sesi.username = data.username;
            	sesi.level = data.level;
              res.redirect('/audience');
            }
        });
    });
};

exports.users = function(req, res) {
    sesi = req.session;
    var sesi = {
        iduser : sesi.iduser,
        username : sesi.username,
        level : sesi.level
    };
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM data_user WHERE username = ? ',[sesi.username], function(err, rows){
            res.render('profile', {page_title:"Tiens Webinar",sesi,data:rows});
        });
    });
};

exports.profile = function(req, res) {
    sesi = req.session;
    var user = req.params.username;
    var sesi = {
        iduser : sesi.iduser,
        username : sesi.username,
        level : sesi.level
    };
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM data_user WHERE username = ? ',[user], function(err, rows){
            res.render('audiences/profile', {page_title:"Tiens Webinar",sesi,data:rows});
        });
    });
};

exports.updprofile = function(req, res) {
    sesi = req.session;
    var input = JSON.parse(JSON.stringify(req.body));
    var target_path = './public/images/photo/';

    req.getConnection(function (err, connection) {
      

      if(req.files.photo.name != ""){
        var temp_path = req.files.photo.path;
        // var file_name =  sesi.username +"_"+ new Date().getTime() + ".png";
        var file_name =  sesi.username + new Date().getTime();
        var file_type = req.files.photo.type;
        if(file_type=="image/gif" || file_type=="image/png" || file_type=="image/jpg" || file_type=="image/jpeg"){
            var dat = {
                nama_lengkap : input.nama,
                jenis_kelamin : input.kelamin,
                tgl_lahir : input.tgl_lahir,
                agama : input.agama,
                alamat_lengkap : input.alamat,
                telepon : input.telepon,
                photo : file_name
            };
            fs.readFile(temp_path, function(err, res) {
                fs.writeFile(target_path + file_name, res, function(err) {
                    fs.unlink(temp_path, function(err) {
                      if(input.old_photo != ""){
                        fs.unlink(target_path+input.old_photo, function(error) {
                            if(error) { console.log('delete fail'); }
                        });
                      }
                    });
                });
            });
        }
      } else {
        var dat = {
            nama_lengkap : input.nama,
            jenis_kelamin : input.kelamin,
            tgl_lahir : input.tgl_lahir,
            agama : input.agama,
            alamat_lengkap : input.alamat,
            telepon : input.telepon
        };
      }
          
        var query = connection.query('UPDATE data_user SET ? WHERE username = ? ',[dat,sesi.username], function(err, rows){
            res.redirect('/profile');
        });
    });
};

exports.changepass = function(req,res){
  sesi = req.session;
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var username = sesi.username;
        var old_pass = crypto.createHash('sha1').update(input.old_pass).digest("hex");
        var new_pass = crypto.createHash('sha1').update(input.new_pass).digest("hex");
        
        if(input.new_pass != input.con_pass){
            res.redirect('/profile');
        } else {
          var query = connection.query("SELECT * FROM users WHERE username = ? AND password = ?",[username,old_pass], function(err, rows){
            if(rows.length == 1){
              connection.query('UPDATE users set password = ? WHERE username = ?',[new_pass,username]);
              res.redirect('/logout');
            } else {
              res.redirect('/profile');
            }
          });
        }
    });
};

exports.logout = function(req,res){
    req.session.destroy(function(err) {
  	if(err) {
    	console.log(err);
  	} else {
    	res.redirect('/');
  	}
	});
};



