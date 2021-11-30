module.exports = app => {

    // Usuarios

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.save))
        .get(admin(app.api.user.get))
        

        app.route('/user/:id')
        .all(app.config.passport.autenticate())
        .put(admin.api.user.save)
        .get(admin(app.api.user.getByid))
        .delete(admin(app.api.user.remove))

        // Rotas do mOngoDB
        
}