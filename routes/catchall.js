var func = require('../func/func');
module.exports = function(app){
    
        app.get('/*', function(req, res, next){
            func.isNewInstall(function(r) {
               if(r) {
                    next();
               } else {
                    res.render("admin/newinstall.njk");
               }
            });
        });

        app.use(function (err, req, res, next) {
            if (err.code !== 'EBADCSRFTOKEN') return next(err)
          
            // handle CSRF token errors here
            res.status(403)
            res.send('session has expired or form tampered with')
          })
    
    }