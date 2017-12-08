var func = require('../func/func'),
bcrypt = require('bcrypt-nodejs'),
mongoose = require('mongoose'),
db = require('../func/db');

var arkUser = mongoose.model('arkUser', db.user);

module.exports = function(app){

    app.get('/admin', function(req, res){ res.redirect('/ark/login'); });
    app.get('/ark', function(req, res){ res.redirect('/ark/login'); });
    
    app.get('/ark/login', function(req, res){
        session=req.session;
        if(session.user) {
            res.redirect('/ark/dashboard');
        } else {
            res.render("admin/login.njk", { csrfToken: req.csrfToken() });
        }             
    });

    app.post('/ark/login', function(req, res) {
        session=req.session;
        arkUser.findOne({ username: req.body.username }, function(err, user) {
            if (err) return console.error(err);
            if(user === null) {
                res.redirect('/ark/login');
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    session.user = req.body.username;
                    res.redirect('/ark/dashboard');
                } else {
                    res.redirect('/ark/login');
    }
            }
        });

    });

    app.all('/ark/*', function(req,res,next) {
        session=req.session;
        if(session.user) {
            next();
        } else {
            res.redirect('/ark/login');
        }   
    });

    app.get('/ark/logout', function(req, res){
        session=req.session;
        session.user = null;
        res.redirect("/");         
    });

    app.get('/ark/dashboard', function(req, res){
        session=req.session;
        res.render("admin/dashboard.njk", { pagename: 'Dashboard', username: session.user });          
    });

    app.get('/ark/pages', function(req, res){
        session=req.session;
        res.render("admin/dashpages.njk", { pagename: 'Pages', username: session.user });          
    });

}