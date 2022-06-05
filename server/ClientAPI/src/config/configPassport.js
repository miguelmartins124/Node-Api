const passport = require('passport');
// npm install passport

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

passport.use(new LocalStrategy( 
    { usernameField: 'username'  },
    
    (username, password, done) => {
        Cliente.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'username incorreto.' }); 
            }
            if (!user.validarPassword(password)) {
                 return done(null, false, { message: 'Palavra chave incorreta!'}); 
            }
            return done(null, user); 
          });
    }
  ));
