module.exports = (app, passport) => {
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/autenticacion/iniciar-sesion",
    }),
    (req, res) => {
      console.log(req.user);
    }
  );
};
