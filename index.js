const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const searchDAO = require('./dao/searchDAO')
const path = require('path')


const app = express();
require('dotenv').config()
app.use(cors())
app.use(express.json({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.use("/api/v1/users", require('./api/users') )
app.use("/api/v1/search", require('./api/search'))


//Serving static assets

//if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
//}

const PORT = process.env.PORT || 5000;





MongoClient.connect(
    process.env.DB_URI,
    { useNewUrlParser: true },
    { poolSize: 50 },
    { connectTimeoutMS: 2500 },
    { useUnifiedTopology: true },
    )
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })
        .then(async client => {
            await searchDAO.injectDB(client)
            app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        })
    