module.exports = {
    isLoggedIn: (req, res, next) => {
      req.session.currentUser ? next() : res.render("auth/login", { errorMessage: "Has de estar logueado para ver este contenido" })
    },
    checkRoles: (...roles) => (req, res, next) => {
      console.log(req.session.currentUser);
        roles.includes(req.session.currentUser.role) ? next() : res.status(401).render("auth/login", { errorMessage: "No tienes los permisos adecuados" })
      }
}