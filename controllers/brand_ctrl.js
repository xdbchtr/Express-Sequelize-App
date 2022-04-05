const {
    brand,
    item,
    user,
    Sequelize
} = require('./../models');

const Op = Sequelize.Op;

class brandsController {
    static async getAll(req, res) {
        try {
            let data = await brand.findAll({
                attributes: ["id", "name"],
                include:[
                    {
                     model:user,
                     as:'user',
                     attributes:["username","email"]
                    }
                   ]
            });
            return res.json({
                status: "ok",
                data:data
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error
            })
        }
    }

    static async get(req, res) {
        try{
            let id = req.params.id;
            let data = await brand.findOne({
             attributes:["id","name"],
             where:{
              id:id
             }
            });
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }

    static async getWithItems(req, res) {
        try{
            let data = await brand.findAll({
             attributes:["id","name"],
             include:[
              {
               model:item,
               as:'items',
               attributes:["id","name","price","stock"]
              }
             ]
            });
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }

    static async search(req, res) {
        try{
            let text = req.query.text;
            let data = await brand.findAll({
             attributes:["id","name"],
             where:{
              name:{
               [Op.like]:"%"+text+"%"
              }
             }
            });
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }

    static async save(req, res) {
        try{
            let body = req.body;
            let data = await brand.create(body);
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }

    static async update(req, res) {
        try{
            let id = req.params.id;
            let body = req.body;
            let data = await brand.update(body,{
             where:{
              id:id
             }
            });
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }

    static async delete(req, res) {
        try{
            let id = req.params.id;
            let data = await brand.destroy({
             where:{
              id:id
             }
            });
            return res.json({
             status:"ok",
             data:data
            })
           }catch(error){
            res.status(500).json({
             status:"error",
             data:error
            })
           }
    }
}
   module.exports = brandsController;