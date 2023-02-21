class auth{
    static isLoggedIn(req, res, next){
        // Usamos un método de passport que devuelve un boolean si hay un usuario logeado
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "No autorizado, debe iniciar sesion")
        
        return res.redirect('/signin');
    };

    static isNotLoggedIn(req, res, next){
        if (!req.isAuthenticated()) {
            return next();
        }
        else{
            req.flash("success", "Sesion iniciada")
            return res.redirect('/profile');
        }
        
    };
}

export default auth