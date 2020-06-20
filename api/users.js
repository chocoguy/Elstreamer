const express = require('express');
const searchController = require('./searchController');
const router = express.Router();

router.route("/register").post(searchController.register)
router.route("/login").post(searchController.login)
router.route("/logout").post(searchController.logout)
router.route("/current").get(searchController.current)
//router.route("/admin").post(searchController.admin)
//router.route("/admin/upload").post(searchController.adminUpload)
//router.route("/admin/hentai").post(searchController.adminHentai)

module.exports = router

