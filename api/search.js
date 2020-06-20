const express = require('express');
const router = express.Router();
const searchController = require('./searchController')

router.route("/get").get(searchController.apiGet)
router.route("/search-vod").get(searchController.apiSearch)
//router.route("/facet-search").get(searchController.apiFacetedSearch)
router.route("/id/:id").get(searchController.searchById)
router.route("/get-series").get(searchController.getSeries)

router.route("/hentai").get(searchController.apiGetHentai)
router.route("/hentai/search").get(searchController.apiSearchHentai)
//router.route("/hentai/facet-search").get(searchController.apiFacetedSearchHentai)
router.route("/hentai/id/:id").get(searchController.searchByIdHentai)
router.route("/hentai/get-series").get(searchController.getHentaiSeries)


module.exports = router