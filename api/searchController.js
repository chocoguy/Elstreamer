
const searchDAO = require('../dao/searchDAO')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//!--------------------------------------------AUTHENTICATION----------------------------


const hashPassword = async password => await bcrypt.hash(password, 10)

 class User {
    constructor({ name, email, password, preferences, isadmin = {} } = {}) {
      this.name = name
      this.email = email
      this.password = password
      this.preferences = preferences
      this.isadmin = isadmin
    }
    toJson() {
      return { name: this.name, email: this.email, preferences: this.preferences, isadmin: this.isadmin }
    }
    async comparePassword(plainText) {
      return await bcrypt.compare(plainText, this.password)
    }
    encoded() {
      return jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
          ...this.toJson(),
        },
        process.env.JWT_SECRET,
      )
    }
    static async decoded(userJwt) {
      return jwt.verify(userJwt, process.env.JWT_SECRET, (error, res) => {
        if (error) {
          return { error }
        }
        return new User(res)
      })
    }

  
  }
  
  class searchController {

 
    static async register(req,res) {
        try{
            const userFromBody = req.body
            let errors = {}
           /* if (userFromBody && userFromBody.password.length < 8) {
              errors.password = "Your password must be at least 8 characters."
            }
            if (userFromBody && userFromBody.name.length < 3) {
              errors.name = "You must specify a name of at least 3 characters."
            }*/
            
            
            
      
            if (Object.keys(errors).length > 0) {
              res.status(400).json({msg: errors})
              console.error(errors)
              return
            }

            const userInfo = {
                ...userFromBody,
                password: await hashPassword(userFromBody.password),
              }

            const insertResult = await searchDAO.addUser(userInfo)
            if (!insertResult.success) {
                console.error('Error while registering')
                res.status(400).json({msg: 'Error while registering'})
                return
            }

            const userFromDB = await searchDAO.getUser(userFromBody.email)
            if(!userFromDB){
                console.error('Error while getting registered user')
                res.status(400).json({msg: 'Error while getting registered user'})
                return
            }

            if (Object.keys(errors).length > 0) {
                res.status(400).json({ msg: errors })
                console.error(errors)
                return
            }

            const user = new User(userFromDB)

            res.json({
                auth_token: user.encoded(),
                info: user.toJson(),
            })
    }catch(error){
        res.status(500).json({msg: error})
        console.error(error)
    }
}







    static async login(req, res, next) {
        try{

            const {email, password} = req.body
            if(!email || typeof email !== "string") {
                res.status(400).json({ msg: 'Bad email, Expected a string' })
                return
            }
            if (!password || typeof password !== "string") {
                res.status(400).json({ msg: "Bad password format, expected string." })
                return
              }
              let userData = await searchDAO.getUser(email)
              if (!userData) {
                res.status(401).json({ msg: "Wrong credentials" })
                return
              }
              const user = new User(userData)

              if(!(await user.comparePassword(password))) {
                  res.status(401).json({ msg: 'Wrong credentials' })
                  return
              }

              const loginResponse = await searchDAO.loginUser(user.email, user.encoded())
              if (!loginResponse.success) {
                  res.status(500).json({ msg: loginResponse.error })
                  console.error(loginResponse.error)
                  return
              }
              res.json({ auth_token: user.encoded(), info: user.toJson() })

        } catch(error) {
            res.status(400).json({ msg: error })
            console.error(error)
            return
        }
    }







    static async logout(req, res) {
        try{
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const userObj = await User.decoded(userJwt)
            var { error } = userObj
            if(error){
                res.status(401).json({ msg: error })
                console.error(error)
                return
            }

            const logoutResult = await searchDAO.logoutUser(userObj.email)
            var { error } = logoutResult
            if(error) {
                res.status(500).json({ msg: error })
                console.error(error)
                return
            }
            res.json(logoutResult)


        }catch(error){
            res.status(500).json({ msg: error })
            console.error(error)
        }
    }




    static async current(req, res, next) {
        try{
            const jwt = req.get("Authorization").slice("Bearer ".length)
            const checkk = await searchDAO.check(jwt)
            res.json(checkk)

        }catch(error) {
            res.status(401).json({msg: error})
            console.error(error)
        }
    }



//!-----------------------------------------END AUTHENTICATION----------------------------------------------





    static async apiGet(req, res, next) {
        const VODS_PER_PAGE = 1000
        const{ vodsList, totalNumVods } = await searchDAO.getVods()
        let response = {
            vods: vodsList,
            page: 0,
            entries_per_page: VODS_PER_PAGE,
            total_results: totalNumVods
        }
        res.json(response)
    }


    static async apiSearch(req, res, next) {
        const VODS_PER_PAGE = 1000
        let page
        try{
            page = req.query.page ? parseInt(req.query.page, 10) : 0
        }catch(error){
            console.error(`bad value for page ${error}`)
            page = 0
        }
        let searchType
        try{
            searchType = Object.keys(req.query)[0]
        }catch(error) {
            console.error(`No keys specified ${error}`)
        }

        let filters = {}

        switch (searchType){
            case "type":
                if(req.query.type !== "") {
                    filters.type = req.query.type
                }
                break
            case "text":
                if(req.query.text !== ""){
                    filters.text = req.query.text
                }
                break
            default:
        }

        const { vodsList, totalNumVods } = await searchDAO.getVods({
            filters,
            page,
            VODS_PER_PAGE
        })

        let respose = {
            vods: vodsList,
            page: page,
            filters,
            entries_per_page: VODS_PER_PAGE,
            total_results: totalNumVods,
        }

        res.json(respose)

    }




    static async searchById(req, res, next) {
        try{
            let id = req.params.id
            let result = await searchDAO.getVodByID(id)
            if (!result) {
                res.status(404).json({ error: 'Not found' })
                return
            }
            res.json(result)
        } catch(error){
            console.error(`api ${error}`)
            res.status(500).json({ msg: error })
        }
    }

    







    static async apiGetHentai(req, res, next) {
        try{
        if(req.get("Authorization") == null){
            res.status(401).json({msg: "Unathorized"})
            return
        }
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const user = await User.decoded(userJwt)
        var { error } = user
        if (error) {
            res.status(401).json({ msg: "Unathorized" })
            return
        }
        const HENTAI_PER_PAGE = 20
        const { hentaiList, totalNumHentai } = await searchDAO.getHentai()
        let response = {
            hentai: hentaiList,
            page: 0,
            entries_per_page: HENTAI_PER_PAGE,
            total_results: totalNumHentai
        }
        res.json(response)
    }catch(error){
        res.status(500).json({ msg: error })
        console.error(error)

    }
}


static async getSeries(req, res, next) {
    try{
        let series = req.query.text
        let returnVodSeries = await searchDAO.vodSeries(series)
        if(!returnVodSeries) {
            res.status(400).json({ msg: 'Some error occured' })
            return
        }

        res.json(returnVodSeries)


    }catch(error){
        res.status(500).json({msg: error})
        console.error(error)
    }
}


static async getHentaiSeries(req, res, next) {
    try{
        if(req.get("Authorization") == null){
            res.status(401).json({msg: "Unathorized"})
            return
        }
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const user = await User.decoded(userJwt)
        var { error } = user
        if (error) {
            res.status(401).json({ msg: "Unathorized" })
            return
        }

        let series = req.query.text
        let returnHentaiSeries = await searchDAO.hentaiSeries(series)
        if(!returnHentaiSeries) {
            res.status(401).json({ msg: 'Unathorized' })
            return
        }
        res.json(returnHentaiSeries)
    }catch(error){
        res.status(500).json({ msg: error })
        console.error(error)
    }
}




static async searchByIdHentai(req, res, next) {
    try{
        if(req.get("Authorization") == null){
            res.status(401).json({msg: "Unathorized"})
            return
        }
        const userJwt = req.get("Authorization").slice("Bearer ".length)
        const user = await User.decoded(userJwt)
        var { error } = user
        if (error) {
            res.status(401).json({ msg: "Unathorized" })
            return
        }

        let id = req.params.id
        let hentai = await searchDAO.getHentaiByID(id)
        if (!hentai) {
            res.status(404).json({ msg: 'Not found' })
            return
        }
        res.json(hentai)
    }catch(error){
        res.status(500).json({ msg: error })
        console.error(error)
    }
}






    static async apiSearchHentai(req, res, next) {

        try{
            if(req.get("Authorization") == null){
                res.status(401).json({msg: "Unathorized"})
                return
            }
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const user = await User.decoded(userJwt)
            var { error } = user
            if (error) {
                res.status(401).json({ msg: "Unathorized" })
                return
            }


        const HENTAI_PER_PAGE = 1000
        let page
        try{
           page = req.query.page ? parseInt(req.query.page, 10) : 0 
        }catch(error){
            console.error(`bad value for page ${error}`)
            page = 0
        }
        let searchType
        try{
            searchType = Object.keys(req.query)[0]
        }catch(error) {
            console.error(`No keys specidied ${error}`)
        }

        let filters = {}

        switch (searchType) {
            case "text":
                if(req.query.text !== "") {
                    filters.text = req.query.text
                }
                break
            default:
        }


        const { hentaiList, totalNumHentai } = await searchDAO.getHentai({
            filters,
            page, 
            HENTAI_PER_PAGE
        })

        let response = {
            hentai: hentaiList,
            page: page,
            filters,
            entries_per_page: HENTAI_PER_PAGE,
            total_results: totalNumHentai
        }

        res.json(response)
        
    }catch(error){
        res.status(500).json({msg: error})
    }
}


    /*static async adminUpload(req, res, next) {
        try{
            if(req.get("Authorization") == null){
                res.status(401).json({msg: "Unathorized"})
                return
            }
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const user = await User.decoded(userJwt)
            var { error } = user
            if (error) {
                res.status(401).json({ msg: "Unathorized" })
                return
            }

            let authen = await searchDAO.getAdmin(user.email)
        if (!authen) {
          res.status(401).json({ msg: "You are not an admim" })
          return
        }


        if(req.files === null) {
            return res.status(400).json({ msg: 'No file was uploaded!' })
        }
 
        console.log(req)
        const file = req.files.file;

        file.mv(`${__dirname}../vods/${file.name}`)

        res.json({ filePath: file.name,  message: `Video Uploaded! PLEASE copy and paste the following text in the 'path' field for everything to work:   vods/${file.name} ` });






        }catch(error){
            console.log(error)
            res.status(400).json({msg: "That is not a file!"})
        }

    }



    /*static async admin(req, res, next) {
        try{
            if(req.get("Authorization") == null){
                res.status(401).json({msg: "Unathorized"})
                return
            }
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const user = await User.decoded(userJwt)
            var { error } = user
            if (error) {
                res.status(401).json({ msg: "Unathorized" })
                return
            }

            let authen = await searchDAO.getAdmin(user.email)
        if (!authen) {
          res.status(401).json({ msg: "You are not an admin!" })
          return
        }

      


        const {
            thumbnail,
            year,
            type,
            title,
            creator,
            series,
            ep,
            desc,
            path,
        } = req.body

        let postt = await searchDAO.adminPost(thumbnail, year, type, title, creator, series, ep, desc, path)
        if(!postt){
            res.status(401).json({msg: "Something went wrong when posting"})
        }

        res.json({ msg: "metadata has been uploaded! your video is online!!!" })
        
        

        }catch(error){
                console.log(error)
                res.json(500).json({msg: error})
            }

    }




   


    static async adminHentai(req, res, next) {
        try{
            if(req.get("Authorization") == null){
                res.status(401).json({msg: "Unathorized"})
                return
            }
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const user = await User.decoded(userJwt)
            var { error } = user
            if (error) {
                res.status(401).json({ msg: "Unathorized" })
                return
            }

            let authen = await searchDAO.getAdmin(user.email)
        if (!authen) {
          res.status(401).json({ msg: "You are not an admin!" })
          return
        }
        

        const {
            thumbnail,
            year,
            type,
            title,
            creator,
            series,
            ep,
            desc,
            path,
        } = req.body

        let postt = await searchDAO.adminPostHentai(thumbnail, year, type, title, creator, series, ep, desc, path)
        if(!postt){
            res.status(401).json({msg: "Something went wrong when posting"})
        }
        
        res.json({ msg: "metadata has been uploaded! your video is online!!!" })
        
        }catch(error){
                console.log(error)
                res.status(400).json({error: error})
            }

    }




    //!----------------------------hentai----------------------------
    //! all routes below are PROTECTED (Need an acc to accsess)------







    


    /*static async apiGetHentai(req, res, next) {
        try{

        }catch(err){

        }
    }*/



    /*static async apiFacetedSearch(req, res, next) {
        const VODS_PER_PAGE = 20

        let page
        try{
            page = req.query.page ? parseInt(req.query.page, 10) : 0
        } catch(error){
            console.error(`bad value for page defaulting to 0: ${error}`)
            page = 0
        }

        let filters = {}

        filters = 
            req.query.cast !== ""
                ? {}


    }*/

}

module.exports = searchController