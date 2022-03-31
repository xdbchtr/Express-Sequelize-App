const user_ctrl = require("./../controllers/user_ctrl");
const brand_ctrl = require("./../controllers/brand_ctrl");
const item_ctrl = require("./../controllers/item_ctrl");
const auth_ctrl = require("./../controllers/auth_ctrl")
module.exports = function(express) {
 const route = express.Router();
//Auth
 route.post("/user/register", user_ctrl.register);
 route.post("/user/login", user_ctrl.login);

//brands route
 route.get("/brand", brand_ctrl.getAll);
 route.get("/brand/:id",brand_ctrl.get);
 route.get("/brand_search",brand_ctrl.search);
 route.post("/brand", auth_ctrl.validateUser, brand_ctrl.save);
 route.put("/brand/:id",brand_ctrl.update);
 route.delete("/brand/:id",brand_ctrl.delete);
 route.get("/brand_with_items",brand_ctrl.getWithItems);
//items route
 route.get("/item",item_ctrl.getAll);
 route.get("/item/:id",item_ctrl.get);
 route.get("/item_search",item_ctrl.search);
 route.post("/item",item_ctrl.save);
 route.put("/item/:id",item_ctrl.update);
 route.delete("/item/:id",item_ctrl.delete);
 return route;
};