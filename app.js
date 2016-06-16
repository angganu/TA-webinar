var express = require('express');
var session = require('express-session');
var http    = require('http');
var url     = require('url');
var path    = require('path');
var fs      = require('fs');
var mysql   = require('mysql');
var oop     = require('oop-module');
var socketio    = require('socket.io');
var multipart   = require('connect-multiparty');
var connection  = require('express-myconnection');

// Define Class
var userlog     = oop.class('./routes/userlog.js');
var presenter   = oop.class('./routes/presenter.js');
var audience    = oop.class('./routes/audience.js');
var seminar     = oop.class('./routes/seminar.js');

// Call Object
var userlog     = new userlog();
var presenter   = new presenter();
var audience    = new audience();
var seminar     = new seminar();

//load route
var sesi;
var app = express();
var multipartMiddleware = multipart();
var NodePort    = 80;
var home        = require('./routes/home');
// var userlog  = require('./routes/userlog');
// var presenter    = require('./routes/presenter')
// var audience     = require('./routes/audience');
// var seminar  = require('./routes/seminar');

// all environments
app.configure(function(){
    app.set('port', process.env.PORT || NodePort);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    // app.use(express.favicon());
    app.use(session({secret: 'ssshhhhh'}));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('id_seminar',0);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodeweb'
    },'pool') //or single
);


/* ////////////////////////////////////////////////////////////////////// */

app.use(app.router);
app.get('/', home.index);
app.get('/presenter/newseminar', home.newseminar);
app.get('/presenter/listseminar', home.listseminar);
app.get('/logout', function(req,res){ userlog.logout(req,res); });
app.post('/login', function(req,res){ userlog.login(req,res); });
app.post('/register', function(req,res){ userlog.register(req,res); });
app.get('/profile', function(req,res){ userlog.users(req,res); });
app.post('/updprof', function(req,res){ userlog.updprofile(req,res); });
app.post('/updpass', function(req,res){ userlog.changepass(req,res); });
app.post('/upload', multipartMiddleware, function(req,res){ seminar.upload(req,res); });
app.post('/update', multipartMiddleware, function(req,res){ seminar.update(req,res); });
app.post('/seminar/join', function(req,res){ audience.booking(req,res); });
app.get('/profile/:username', function(req,res){ userlog.profile(req,res); });
app.get('/presenter', function(req,res){ presenter.main(req,res); });
app.get('/audience', function(req,res){ audience.main(req,res); });
app.get('/seminar/mulai/:id', function(req,res){ seminar.mulai(req,res); });
app.get('/seminar/presenter/:id', function(req,res){ seminar.presenter(req,res); });
app.get('/seminar/audience/:id', function(req,res){ seminar.audience(req,res); });
app.get('/seminar/selesai/:id', function(req,res){ seminar.selesai(req,res); });
app.get('/seminar/buka/:id', function(req,res){ seminar.buka(req,res); });
app.get('/seminar/batal/:id', function(req,res){ seminar.batal(req,res); });
app.get('/seminar/hapus/:id', function(req,res){ seminar.hapus(req,res); });
app.get('/seminar/update/:id', function(req,res){ seminar.ubah(req,res); });

app.get('/seminar/masuk/:id', function(req,res){
    var id = req.params.id;
    var sta = "1";
    sesi = req.session;
    var sesi = {
        iduser : sesi.iduser,
        username : sesi.username,
        level : sesi.level
    };
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE audience set status = ? WHERE id_seminar = ? and username = ?',[sta,id,sesi.username], function(err, rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            } else {
                app.set('id_seminar',id);
                connection.query('SELECT data_user.photo,audience.id_seminar,audience.username,audience.status FROM audience JOIN data_user ON data_user.username=audience.username WHERE audience.id_seminar = ?',[id], function(err, audi){
                    console.log(audi);
                    io.sockets.emit('userspic', { audi });
                });
                res.redirect('/seminar/audience/'+id);
            }
        });
    });
});

app.get('/keluar/:id/:us', function(req,res){
    var id = req.params.id;
    var uname = req.params.us;
    req.getConnection(function (err, connection) {
        var query = connection.query('UPDATE audience set status = ? WHERE id_seminar = ? and username = ?',[2,id,uname], function(err, rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            } else {
                connection.query('SELECT data_user.photo,audience.id_seminar,audience.username,audience.status FROM audience JOIN data_user ON data_user.username=audience.username WHERE audience.id_seminar = ?',[id], function(err, audi){
                    console.log(audi);
                    io.sockets.emit('userspic', { audi });
                });
                res.redirect('/audience');
            }
        });
    });
});

app.get('/seminar/move/:id/:key/:index', function (req, res) {
    var id = req.params.id;
    var key = req.params.key;
    var index = req.params.index;

    var imgDir = './public/presentations/' + key;

    fs.readdir(imgDir, function(error, files) {
        if(error) {
            console.log(error);
        }

        if(index > files.length) {
            return ;
        }
        var file = files[index];
        // console.log(JSON.stringify(files));
        // console.log(file);
        fs.readFile(imgDir+'/'+index +".png", function(error, data) {
            if(error) {
                console.log(error);
                return;
            }
            res.send({imgSrc : data.toString('base64')});
            io.of('/seminar/audience/'+id).emit('move', {imgSrc: data.toString('base64')});
        });
    });
});


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(server);
io.set('log level', 4);

io.sockets.on('connection', function(socket){
    socket.emit('message', { message: 'welcome to the chat'});
    socket.on('send', function(data){
        io.sockets.emit('message', data);
    });
});

var clientHandler = io.of('/seminar/audience/'+app.get('id_seminar')).on('connection', function(socket) {
    socket.emit('move', {imgSrc : presenter.getCurrentImage } );
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
