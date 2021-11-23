module.exports = app => {
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 
  
  // User Routes
  const users = require("./user.routes");
  app.use("/users", users); 

}
