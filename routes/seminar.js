var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');
var child;
var sesi;

var UPLOAD_PATH = './public/presentations/';
var JAR_PATH = './public/java/PptToImage-0.0.1-jar-with-dependencies.jar '
var current_image;

// Status Seminar
// 0 : Mulai Baru
// 1 : Sudah Selesai
// 2 : Dibatalkan
// 3 : Sedang Mulai

// exports.presenter = function(req, res) {
//     sesi = req.session;
//     var id = req.params.id;
//     var sesi = {
//         iduser : sesi.iduser,
//         username : sesi.username,
//         level : sesi.level
//     };
//     req.getConnection(function (err, connection) {
//         var query = connection.query('SELECT * FROM seminar WHERE id_seminar = ? ',[id], function(err, rows){
//             key = rows[0].key;
//             res.render('presenters/show', {page_title:"Tiens Webinar",sesi,data:rows,uniqueKey:key});
//         });
//     });
// };

// exports.audience = function(req, res) {
//     sesi = req.session;
//     var id = req.params.id;
//     var sesi = {
//         iduser : sesi.iduser,
//         username : sesi.username,
//         level : sesi.level
//     };
//     req.getConnection(function (err, connection) {
//         var query = connection.query('SELECT * FROM seminar WHERE id_seminar = ? ',[id], function(err, rows){
//             key = rows[0].key;
//             res.render('audiences/show', {page_title:"Tiens Webinar",sesi,data:rows,uniqueKey:key});
//         });
//     });
// };

exports.show = function(req, res) {
    sesi = req.session;
    var id = req.params.id;
    var sesi = {
        iduser : sesi.iduser,
        username : sesi.username,
        level : sesi.level
    };
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM seminar WHERE id_seminar = ? ',[id], function(err, rows){
            key = rows[0].key;
            res.render('seminar/show', {page_title:"Tiens Webinar",sesi,data:rows,uniqueKey:key});
        });
    });
};

exports.upload = function(req, res) {
    // console.log('file: '+JSON.stringify(req.files));
    // console.log('req.files='+req.files);
    fs.readFile(req.files.pptFile.path, function(error, data) {
        var fileName = req.files.pptFile.name;
        var destination = UPLOAD_PATH + fileName;
        fs.writeFile(destination, data, function(error) {
            if(error) {
                console.log('file write error, '+error);
                res.render('presenter', { page_title:"Tiens Webinar" });
                return ;
            }

            var id = new Date().getTime();
            var command = 'java -jar ' + JAR_PATH + ' ' +UPLOAD_PATH + fileName+' '+ UPLOAD_PATH + id;
            // console.log('Command: '+ command);
            child = exec(command, function(error, stdout, stderr) {
                // console.log(stdout);
                // console.log(stderr);
                // sys.print('stdout:' + stdout);
                // sys.print('stderr:' + stderr);
                // Delete file PPT
                fs.unlink(destination, function(error) {
                    if(error) {
                        console.log('delete fail');
                    }
                    console.log('successfully delete file, '+ destination);
                });
            });

            // Insert To DB
            var input = JSON.parse(JSON.stringify(req.body));
            req.getConnection(function (err, connection) {
                var waktu = input.datetime;
                time = waktu.split(':');
                hh = parseInt(time[0].substr(-2));
                ii = parseInt(time[1].substr(0,2));
                if(waktu.substr(-2) == "PM"){
                    hh = hh + 12;
                } else {
                    hh = hh;
                }
                pad = "00";
                hours = pad.substr(0, pad.length - hh.length) + hh;
                minuts = pad.substr(0, pad.length - ii.length) + ii;
                date = waktu.substr(6,4)+"-"+waktu.substr(0,2)+"-"+waktu.substr(3,2);
                times = hours+":"+minuts+":00";
                datetime = date+" "+times;

                var seminar = {
                    judul: input.judul,
                    topik: input.topik,
                    deskripsi: input.deskripsi,
                    waktu: datetime,
                    level: input.openstat,
                    Key: id,
                    tgl_upload: new Date(),
                    status: "0",
                };
                    // penyelenggara: input.penyelenggara,
                    // pembicara: input.pembicara,
                var query = connection.query("INSERT INTO seminar set ? ",seminar, function(err, rows){
                    if (err) {
                        sesi = req.session;
                        sesi.menu = "new";
                        res.redirect('/presenter');
                    } else {
                        res.redirect('/presenter/listseminar');
                    }
                });
            });
        });
    });
};

exports.update = function(req, res) {
    // console.log('file: '+JSON.stringify(req.files));
    // console.log('req.files='+req.files);
    fs.readFile(req.files.pptFile.path, function(error, data) {
        var fileName = req.files.pptFile.name;
        var destination = UPLOAD_PATH + fileName;
        if(fileName != ""){
            fs.writeFile(destination, data, function(error) {
                if(error) {
                    console.log('file write error, '+error);
                    res.render('presenter', { page_title:"Tiens Webinar" });
                    return ;
                }
                var input = JSON.parse(JSON.stringify(req.body));
                var key = input.key;
                var id_seminar = input.id_seminar;

                // Delete Gambar Sebelumnya
                imgPath = UPLOAD_PATH + key + "/";
                fs.readdir(imgPath, function(error, files) {
                    if(error) {
                        console.log('Tidak Ada Folder');
                    } else {
                        for(var i= 0; i < files.length; i++) {
                            var imgName = files[i];
                            var imgdes = imgPath + imgName;
                            fs.unlink(imgdes, function(error) {
                                if(error) {
                                    console.log('delete fail');
                                }
                            });
                        }
                    }
                });

                // Masukan Gambar Baru
                var command = 'java -jar ' + JAR_PATH + ' ' +UPLOAD_PATH + fileName+' '+ UPLOAD_PATH + key;
                // console.log('Command: '+ command);
                // child = exec(command, function(error, stdout, stderr) {
                //     console.log(stdout);
                //     console.log(stderr);
                //     sys.print('stdout:' + stdout);
                //     sys.print('stderr:' + stderr);
                //     Delete file PPT
                //     fs.unlink(destination, function(error) {
                //         if(error) {
                //             console.log('delete fail');
                //         }
                //         console.log('successfully delete file, '+ destination);
                //     });
                // });

                // Insert To DB
                req.getConnection(function (err, connection) {
                    var waktu = input.datetime;
                    time = waktu.split(':');
                    hh = parseInt(time[0].substr(-2));
                    ii = parseInt(time[1].substr(0,2));
                    if(waktu.substr(-2) == "PM"){
                        hh = hh + 12;
                    } else {
                        hh = hh;
                    }
                    pad = "00";
                    hours = pad.substr(0, pad.length - hh.length) + hh;
                    minuts = pad.substr(0, pad.length - ii.length) + ii;
                    date = waktu.substr(6,4)+"-"+waktu.substr(0,2)+"-"+waktu.substr(3,2);
                    times = hours+":"+minuts+":00";
                    datetime = date+" "+times;

                    var seminar = {
                        judul: input.judul,
                        topik: input.topik,
                        deskripsi: input.deskripsi,
                        waktu: datetime,
                        level: input.openstat,
                        Key: key,
                        tgl_upload: new Date(),
                        status: "0",
                    };
                        // penyelenggara: input.penyelenggara,
                        // pembicara: input.pembicara,
                    var query = connection.query("UPDATE seminar set ? where id_seminar = ?",[seminar,id_seminar], function(err, rows){
                        if (err) {
                            sesi = req.session;
                            sesi.menu = "new";
                            res.redirect('/presenter');
                        } else {
                            res.redirect('/presenter/listseminar');
                        }
                    });
                });
            });
        } else {
            var input = JSON.parse(JSON.stringify(req.body));
            req.getConnection(function (err, connection) {
                var id_seminar = input.id_seminar;
                var key = input.key;
                var waktu = input.datetime;
                time = waktu.split(':');
                hh = parseInt(time[0].substr(-2));
                ii = parseInt(time[1].substr(0,2));
                if(waktu.substr(-2) == "PM"){
                    hh = hh + 12;
                } else {
                    hh = hh;
                }
                pad = "00";
                hours = pad.substr(0, pad.length - hh.length) + hh;
                minuts = pad.substr(0, pad.length - ii.length) + ii;
                date = waktu.substr(6,4)+"-"+waktu.substr(0,2)+"-"+waktu.substr(3,2);
                times = hours+":"+minuts+":00";
                datetime = date+" "+times;

                var seminar = {
                    judul: input.judul,
                    topik: input.topik,
                    deskripsi: input.deskripsi,
                    waktu: datetime,
                    level: input.openstat,
                    Key: input.key,
                    tgl_upload: new Date(),
                    status: "0",
                };
                var query = connection.query("UPDATE seminar set ? where id_seminar = ?",[seminar,id_seminar], function(err, rows){
                    if (err) {
                        sesi = req.session;
                        sesi.menu = "new";
                        res.redirect('/presenter');
                    } else {
                        res.redirect('/presenter/listseminar');
                    }
                });
            });
        }
    });
};

exports.masuk = function(req,res){
    var id = req.params.id;
    var sta = "1";
    sesi = req.session;
    var sesi = {
        iduser : sesi.iduser,
        username : sesi.username,
        level : sesi.level
    };
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE audience set kehadiran = ? WHERE id_seminar = ? and username = ?',[sta,id,sesi.username], function(err, rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            } else {
                res.redirect('/seminar/audience/'+id);
            }
        });
    });
};

exports.buka = function(req,res){
    var id = req.params.id;
    var sta = "0";
    var tgl = new Date();
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE seminar set status=?,tgl_upload=? WHERE id_seminar = ? ',[sta,tgl,id], function(err, rows){
            if(err){
                console.log("Error : %s ",err );
            } else {
                connection.query('DELETE FROM audience where id_seminar = ? ',[id]);
                res.redirect('/presenter');
            }
        });
    });
};

exports.selesai = function(req,res){
    var id = req.params.id;
    var sta = "1";
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE seminar set status = ? WHERE id_seminar = ? ',[sta,id], function(err, rows){
            if(err){
                console.log("Error : %s ",err );
            } else {
                // var query = connection.query('DELETE FROM audience where id_seminar = ? ',[id],function(err,rowsb){
                //     if(err)
                //         console.log("Error : %s ",err );
                // });
                res.redirect('/presenter');
            }
        });
    });
}

exports.batal = function(req,res){
    var id = req.params.id;
    var sta = "2";
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE seminar set status = ? WHERE id_seminar = ? ',[sta,id], function(err, rows){
            if(err){
                console.log("Error : %s ",err );
            } else {
                connection.query('DELETE FROM audience where id_seminar = ? ',[id]);
                res.redirect('/presenter');
            }
        });
    });
};

exports.mulai = function(req,res){
    var id = req.params.id;
    var sta = "3";
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE seminar set status = ? WHERE id_seminar = ? ',[sta,id], function(err, rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            } else {
                res.redirect('/seminar/'+id);
            }
        });
    });
};

exports.hapus = function(req,res){
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query('DELETE FROM seminar where id_seminar = ? ',[id]);
        connection.query('DELETE FROM audience where id_seminar = ? ',[id]);
    });
    res.redirect('/presenter');
};

exports.ubah = function(req, res){
    sesi = req.session;
    var id = req.params.id;
    if(sesi.username) {
        var sesi = {
            iduser : sesi.iduser,
            username : sesi.username,
            level : sesi.level,
            menu : sesi.menu
        };
        req.getConnection(function(err,connection){
            var query = connection.query('SELECT * FROM seminar where id_seminar = ? ',[id],function(err,rows){
                if(err){
                    console.log("Error Selecting : %s ",err );
                } else {
                    res.render('seminar/update',{page_title:"Tiens Webinar",sesi,data:rows});
                }
             });
        });
    } else {
        res.redirect('/');
    }
};

exports.getCurrentImage = current_image;