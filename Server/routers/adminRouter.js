const express=require('express')
const { fectchUsers, fetchClients, verifyClient, deleteUser, viewComplaints, addEquipment, viewEquipments, deleteEquipment, updateEquipment, equipBooking } = require('../controls/adminControl')

const adminRouter=express.Router()

const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage:storage,
    limits: { fileSize: 50 * 1024 * 1024 } 
})


adminRouter.route('/viewuser').get(fectchUsers)
adminRouter.route('/viewclient').get(fetchClients)
adminRouter.route("/verify").put(verifyClient)
adminRouter.route("/deleteUser").delete(deleteUser)
adminRouter.route("/viewcomplaints").get(viewComplaints)
adminRouter.route("/addequipment").post(uploads.fields([{name:"image",maxCount:1}]),addEquipment)
adminRouter.route('/equipments').get(viewEquipments)
adminRouter.route('/deleteequipment').delete(deleteEquipment)
adminRouter.route('/updateequipment').put(uploads.fields([{name:"image",maxCount:1}]),updateEquipment)
adminRouter.route('/equipmentbooking').get(equipBooking)

module.exports=adminRouter