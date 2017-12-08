var packagejson = require('./package.json'),
    term = require( 'terminal-kit' ).terminal,
    express = require('express'),
    app = require('express')(),
    session = require('express-session'),
    csrf = require('csurf'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    nunjucks = require('nunjucks'),
    mongoose = require('mongoose'),
    config = require('./conf/config'),
    menus = require('./func/menus'),
    db = require('./func/db'),
    func = require('./func/func');

var ver = packagejson.version;
var verName = ver+' alpha';

mongoose.connect(config.dbconnect, { useMongoClient: true });
var arkUser = mongoose.model('arkUser', db.user);


mongoose.connection.on('error',function (err) {  
    term.bgRed('Database connection error: ' + err);
    term.bell();
    process.exit();
  }); 

app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: config.sessionkey,
    saveUninitialized: false,
    resave: false
}));

app.use(helmet.dnsPrefetchControl())
app.use(helmet.frameguard())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.xssFilter())
app.use(bodyParser.urlencoded({extended: true}));
app.use(csrf())

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use('/public/admin', express.static('adminstatic'))

require('./routes/catchall')(app);
require('./routes/admin')(app);

app.get('/hello',function(req,res){
    res.send("Hello world");
    console.log(mongoose.connection.readyState);
});

console.log('');
mongoose.connection.on('connected', function () { 
    if(config.sessionkey=="changeme") {
        console.log('Server Not Started');
        console.log('Reason: Session Key default');
        console.log('See config.js for more info');
        console.log('');
        process.exit();
    } else {
        menus.createAsci();
        app.listen(config.port, function() {
            console.log("Ark listening on *:"+config.port);
            func.isNewInstall(function(r) {
                if(r) {
                    menus.mainMenu();
                } else {
                    menus.firstTimeMenu();
                }
                
            })
        });
    }
});