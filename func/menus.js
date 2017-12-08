var term = require( 'terminal-kit' ).terminal,
packagejson = require('../package.json'),
func = require('./func');
var ver = packagejson.version;
var verName = ver+' alpha';

term.on('key', function(name, matches, data){
	if ( name === 'CTRL_C' ) { process.exit(); }
});

module.exports = {
    mainMenu: function() {
        createMainMenu()
    },

    firstTimeMenu: function() {
        term.clear();
        genAsci();
        var items = [
            'a. Create or reset \'arkadmin\' user',
            'c. Stop server'
        ] ;
        term("This is a new install. create a user before continuing\n\n")
        term.singleColumnMenu(items, function( error, response){

            if(response.selectedIndex == "0") { createUserMenu() };
            if(response.selectedIndex == "1") {process.exit();};

        });
    },

    userMenu: function() {
        createUserMenu();
    },

    createAsci: function() {
        genAsci();
    }
}

function createMainMenu() {
    term.clear();
    genAsci();
    var items = [
        'a. Create or reset \'arkadmin\' user',
        'b. Go west' ,
        'c. Stop server'
    ] ;
    
    term.singleColumnMenu( items, function( error , response ) {
        if(response.selectedIndex == "0") { createUserMenu() };
        if(response.selectedIndex == "2") {
            process.exit();
        }
    } ) ;
}

function createUserMenu() {
    term.clear()
    genAsci();
    term("This wizard will create a new user named \'arkadmin\'\n")
    term("We recomend changing the username once this user is created for security\n")
    term( "Enter a password: " ) ;
    term.inputField( function( error , input ) {
        p1=input;
        func.createUser('arkadmin', input, 'arkadmin@test.com', function(t) {
            if(t) {
                term("\nSuccess. You can now login with the username \'arkadmin\' and the password you just set")
                setTimeout(function() {
                    createMainMenu()
                }, 3000);
            }
        })
    });
    
}

function genAsci() {
    var asci = '\n'+
    ' █████╗ ██████╗ ██╗  ██╗\n'+
    '██╔══██╗██╔══██╗██║ ██╔╝\n'+
    '███████║██████╔╝█████╔╝ \n'+
    '██╔══██║██╔══██╗██╔═██╗ \n'+
    '██║  ██║██║  ██║██║  ██╗\n'+
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝\n';
    term.clear();
    term.green(asci);
    term.colorGrayscale(48,'****************************************************************\n');
    term('Ark NodeJS Edition V'+ver+'\n');
    term.colorGrayscale(48,'****************************************************************\n');
}