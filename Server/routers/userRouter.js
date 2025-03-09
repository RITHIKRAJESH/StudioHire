const express=require('express')
const { register, login, viewProfile, bookproject, viewBooking, viewBookingClient, updatebooking, registerComplaint, booking, addPhotos, viewPhotoUser, viewPhotos, bookEquipment } = require('../controls/userControl')

const multer=require('multer')
const path=require('path')
const userRouter=express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage:storage})



userRouter.route('/register').post(uploads.fields([{ name: 'image', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]),register)
userRouter.route('/login').post(login)
userRouter.route('/profile').get(viewProfile)
userRouter.route('/addproject').post(bookproject)
userRouter.route("/viewbooking").get(viewBooking)
userRouter.route("/viewbookingclient").get(viewBookingClient)
userRouter.route("/updatebooking").put(updatebooking)
userRouter.route("/addComplaints").post(registerComplaint)
userRouter.route("/booking").get(booking)
userRouter.route("/addphoto").post(uploads.fields([{name:"image",maxCount:1}]),addPhotos)
userRouter.route("/viewphotosuser").get(viewPhotoUser)
userRouter.route("/viewphotos").get(viewPhotos)
userRouter.route("/bookequipment").post(bookEquipment)

module.exports=userRouter