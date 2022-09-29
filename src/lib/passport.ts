import passport from 'passport';
import * as passportLocal from 'passport-local';
import {helpers} from './helpers';
import UserService from '../services/UserService';
import {User} from '../entities/User'

const LocalStrategy = passportLocal.Strategy;


// signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

},async(req,username,password,done) =>{

    const userService = new UserService();

    const users: User[] = await userService.buscarUsername(username)
    if (users.length == 1) {

        const user:User = users[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {

            req.flash("success", "Bienvenido " , user.name)
        done(null, user);
        } else {

            req.flash("error", "Error 404")
            done(null, false);
        }
    } else {

        req.flash("error", "Error 404")
        return done(null, false);
    }
}));


// signup 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done)=>{
    const {name, email, phone, city, state} =req.body

    const newUser = {
        name,
        username,
        password,
        email,
        phone,
        city,
        state,

    };
    
    //  encriptado de la contraseña
    newUser.password = await helpers.encryptPassword(password);


    // almacenamiento de usuario en la base de datos
    const userService = new UserService();
    try {
        await userService.create(newUser).then((result) => {
            req.flash('message', 'Usuario creado con éxito');
            return done(null, result);
        });
    } catch (err) {
        console.log(err.toString() )
        req.flash('message', err.toString());
        return done(null, null);
    }


    
        }
    )
)


passport.serializeUser((user: User, done) => {
    
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userService = new UserService()
    const result = await userService.edit(id)
    done(null, result);
})

export {passport}
