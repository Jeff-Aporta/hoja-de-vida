"use strict";

//configuracion del servidor
const http = require("http");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const socketio = require("socket.io");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongo = require("./app/mongo");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const config = require("./app/config");
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(express.static("views"));
app.use(urlencodedParser);
app.set("view engine", "ejs");

app.use(cookieParser("clave"));
app.use(
  session({
    secret: "clave",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const pack_app = {
  io,
  config,
  app,
  passport,
  mongo,
  urlencodedParser,
};

passport.use(
  new passportLocal(
    {
      usernameField: "usuario",
      passwordField: "contraseña",
    },
    async (usuario, contraseña, done) => {
      let user = await mongo.leer(usuario, "Usuarios");
      if (!user) {
        return done(null, false);
      }
      if (user.contraseña != contraseña) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
  let user = await mongo.leer(_id, "Usuarios");
  delete user["contraseña"];
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

server.listen(app.get("port"), () => {
  console.log("corriendo en el puerto:", app.get("port"));
});

require("./app/imgbb")(pack_app);
require("./app/socket.io")(pack_app);
require("./app/rutas")(pack_app);