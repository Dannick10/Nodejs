const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bycript = require("bcryptjs");

require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email", passwordField: "senha" }, (email, senha, done) => {
      Usuario.findOne({ email: email }).then((usuario) => {
        if (!usuario) {
          return done(null, false, { message: "está conta não existe" });
        }

        bycript.compare(senha, usuario.senha, (erro, batem) => {
          if (batem) {
            return done(null, usuario);
          } else {
            return done(null, false, { message: "Senha incorreta" });
          }
        });
      });
    })
);

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})

passport.deserializeUser((id,done)=>{
    Usuario.findById(id).then((usuario)=>{
        done(null,usuario)
    }).catch((err)=>{
         done (null,false,{message:'algo deu errado'})
    })


    })

};

