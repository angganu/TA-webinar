
var sesi;

exports.index = function(req, res){
	var notif = {
            login_notif : "",
            regist_notif : ""
        };
	res.render('home',{page_title:"Tiens Webinar",notif});
};

// Daftar Menu

exports.newseminar = function(req, res){
	sesi = req.session;
	sesi.menu = "new";
	res.redirect('/presenter');
};

exports.listseminar = function(req, res){
	sesi = req.session;
	sesi.menu = "list";
	res.redirect('/presenter');
};