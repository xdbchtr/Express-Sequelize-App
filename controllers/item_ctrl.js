const {
 item,
 brand,
 Sequelize
} = require("../models");
const Op = Sequelize.Op;

class itemsController {
    static async getAll(req, res) {
        try{
            let data = await item.findAll({
             attributes:["id","name","brand_id","price","stock"],
             include:[
              {
               model:brand,
               as:'brand',
               attributes:["id","name"]
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

    static async get(req, res) {
        try{
            let id = req.params.id;
            let data = await item.findOne({
             attributes:["id","name","brand_id","price","stock"],
             include:[
              {
               model:brand,
               as:'brand',
               attributes:["id","name"]
              }
             ],
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

    static async search(req, res) {
        try{
            let text = req.query.text;
            let data = await item.findAll({
             attributes:["id","name","brand_id","price","stock"],
             include:[
              {
               model:brand,
               as:'brand',
               attributes:["id","name"]
              }
             ],
             where:{
              [Op.or]:{
               name:{
                [Op.like]:"%"+text+"%"
               },
               //search by name of brands
               '$brand.name$':{
                [Op.like]:"%"+text+"%"
               }
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
            let data = await item.create(body);
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
            let data = await item.update(body,{
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
            let data = await item.destroy({
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

module.exports = itemsController;