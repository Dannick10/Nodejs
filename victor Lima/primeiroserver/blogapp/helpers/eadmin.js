module.exports = {
    eadmin: function(req,res, next){
        if(req.isAuthenticated() && req.user.eadmin == 1){
            return next();
        }

        req.flash("error_msg", "Voçê deve estar logado para entrar aqui")
        res.redirect("/")
    }
}