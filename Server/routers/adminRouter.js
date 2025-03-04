const express=require('express')
const { fectchUsers, fetchClients, verifyClient, deleteUser, viewComplaints } = require('../controls/adminControl')

const adminRouter=express.Router()

adminRouter.route('/viewuser').get(fectchUsers)
adminRouter.route('/viewclient').get(fetchClients)
adminRouter.route("/verify").put(verifyClient)
adminRouter.route("/deleteUser").delete(deleteUser)
adminRouter.route("/viewcomplaints").get(viewComplaints)

module.exports=adminRouter