

const ObjectId = require("bson")

let vods
let hentai
let Elstreamer
let users 
let sessions
const DEFAULT_SORT = [["title", -1]]

class searchDAO {
    static async injectDB(conn){
        if (vods){
            return
        }
        try{
            Elstreamer = await conn.db(process.env.DB_NAME)
            vods = await conn.db(process.env.DB_NAME).collection("vods")
            hentai = await conn.db(process.env.DB_NAME).collection("hentai")
            users = await conn.db(process.env.DB_NAME).collection("users")
            sessions = await conn.db(process.env.DB_NAME).collection("sessions")
        }catch(error){
            console.error(`Cant connect to vods ${error}`)
        }
    }


    //!-------------------------------------- START AUTHENTICATION-----------------------------------



    static async addUser(userInfo) {

        try{
            await users.insertOne({name: userInfo.name, email: userInfo.email, password: userInfo.password})
            return { success: true }

        }catch(error){
            if (String(error).startsWith("MongoError: E11000 duplicate key error")) {
                return { error: "A user with the given email already exists." }
              }
              console.error(`Error occurred while adding new user, ${error}.`)
              return { error: error } 
        }
    }





    static async getUser(email){
        return await users.findOne({ email: email })
    }


    static async getAdmin(email){
            return await users.findOne({ email: email, isadmin: "true" })
    }


    static async check(jwt) {
        try{
            return await sessions.findOne({ "jwt" : jwt })
        }catch(error){
            console.error(error)
        }
    }




    static async loginUser(email, jwt) {
        try{
        await sessions.updateOne(
            { user_id: email },
            { $set: { jwt: jwt } },
            { upsert: true }
        )
        return { success: true }
    }catch(error){
        console.error(`Eror while logging in ${error}`)
        return {error: error}
    }
}


//!----------------------------------------HERE FOR ADMIN

    /*static async adminPost(thumbnail, year, type, title, creator, series, ep, desc, path){

        try{
            await vods.insertOne({ 
            "thumnmail" : thumbnail,
             "year" : year,
             "type" : type,
             "title" : title,
             "creator" : creator,
             "series" : series,
             "ep" : ep,
             "desc" : desc,
             "path" : path,
             "streamerID" : `${Math.floor(Math.random() * Math.floor(1000000000000))}`
            })
            return { success: true }

        }catch(error){
            console.error(`Error ${error}`)
            return {error: error}
        }

    }




    static async adminPostHentai(thumbnail, year, type, title, creator, series, ep, desc, path) {
        try{
            await hentai.insertOne({ 
            "thumnmail" : thumbnail,
             "year" : year,
             "type" : type,
             "title" : title,
             "creator" : creator,
             "series" : series,
             "ep" : ep,
             "desc" : desc,
             "path" : path,
             "hentaiID" : `${Math.floor(Math.random() * Math.floor(1000000000000))}`
            })
            return { success: true }

        }catch(error){
            console.error(`Error ${error}`)
            return {error: error}
        }


    }*/





    static async logoutUser(email) {
        try{
            await sessions.deleteOne({ user_id: email })
            return { success: true }

        }catch(error){
            console.error(`Error occured while loging out ${error}`)
            return { error: error }
        }
    }









    //!----------------------------------------------END AUTHENTICATION------------------------------------------




















    static textSearchQuery(text) {
        const query = { $text: { $search: text } }
   
    
        return { query }
      }


    static typeSearchQuery(type) {
         
        const query = { type : type }

        return {query}
    }


    









    
    static async getVods({
        filters = null,
        page = 0,
        vodsPerPage = 1000,
    } = {}) {
        let queryParams = {}
        if (filters) {
          if ("text" in filters) {
            queryParams = this.textSearchQuery(filters["text"])
          } else if ("type" in filters) {
            queryParams = this.typeSearchQuery(filters["type"])
          } 
        }

        let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams
        let cursor
        try{
            cursor = await vods
            .find(query)
            .project(project)
            .sort(sort)
        } catch(error){
            console.error(`Unable to issue find command ${error}`)
            return { vodsList: [], totalNumVods: 0 }
        }
        const displayCursor = cursor.skip(vodsPerPage * page).limit(vodsPerPage)
        try {
            const vodsList = await displayCursor.toArray()
            const totalNumVods = page === 0 ? await vods.countDocuments(query) : 0
            return { vodsList, totalNumVods }
        }catch(error) {
            console.error(`Unable to convert cursor array ${error}`)
            return { vodsList: [], totalNumVods: 0 }
        }
    }


    static async hentaiSeries(series) {
        let cursor
        console.log(series)
        try{
            cursor = await hentai.aggregate(
                [
                    {
                      '$match': {
                        'series': series
                      }
                    }, {
                      '$sort': {
                        'series': 1
                      }
                    }
                  ],)  
            let data = cursor.toArray()
            return data
            

        }catch(error){
            console.error(error)
            throw(error)
        }
    }


    static async vodSeries(series) {
        let cursor
        try{
            cursor = await vods.aggregate(
                [
                {
                  '$match': {
                    'series': series
                  }
                }, {
                  '$sort': {
                    'series': 1
                  }
                }
              ],)          
              let data = cursor.toArray()
              return data

        }catch(error){
            console.error(error)
            throw(error)
        }

    }
//{$match: { 'series' : 'music' }, }
//{ $text: { $search: text } }
//$sort: { 'series': 1 }
    static async getVodByID(id) {
            try{
             return await vods.findOne({ streamerID: id })

        }catch(error){
            console.error(error)
            throw(error)
        }
    }



    static async getHentaiByID(id) {
        try{
            return await hentai.findOne({ hentaiID: id })
        }catch(error) {
            console.error(error)
            throw(error)
        }
    }









    static async getHentai({
        filters = null,
        page = 0,
        hentaiPerPage = 1000,
    } = {}){
        let queryParams = {}
        if (filters) {
            if ("text" in filters) {
                queryParams = this.textSearchQuery(filters["text"])
            }
        }
        let { query = {}, project = {}, sort= DEFAULT_SORT } = queryParams
        let cursor
        try{
            cursor = await hentai
            .find(query)
            .project(project)
            .sort(sort)
        } catch(error) {
            console.error(`Unable to issue command ${error}`)
            return { hentaiList: [], totalNumHentai: 0 }
        }
        const displayCursor = cursor.skip(hentaiPerPage * page).limit(hentaiPerPage)
        try {
            const hentaiList = await displayCursor.toArray()
            const totalNumHentai = page === 0 ? await hentai.countDocuments(query) : 0
            return { hentaiList, totalNumHentai }
        }catch(error) {
            console.error(`Unable to convert cursor under array ${error}`)
            return { hentaiList: [], totalNumHentai: 0 }
        }
    }
    




}
//_id: ObjectId(id)
//_id: ObjectId(`${id}`)
//5eb36d0ad00567151cfdce25
//clowns4life61521561
module.exports = searchDAO