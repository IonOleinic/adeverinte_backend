const expressServer = require('express')()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const corsOptions = require('../../config/corsOptions')

const userRoutes = require('../routes/userRoutes')
const studentRoutes = require('../routes/studentRoutes')
const facultyRoutes = require('../routes/facultyRoutes')
const certificateRequestRoutes = require('../routes/certificateRequestRoutes')
const certificateOptionsRoutes = require('../routes/certificateOptionsRoutes')
const certificateRoutes = require('../routes/certificateRoutes')

// expressServer.use(credentials)
expressServer.use(cors(corsOptions))

expressServer.use(bodyParser.json())
expressServer.use(cookieParser())

// expressServer.use('/', loginRoutes)
// expressServer.use('/', tokenRoutes)
// expressServer.use(verifyJWT)
expressServer.use('/', userRoutes)
expressServer.use('/', studentRoutes)
expressServer.use('/', facultyRoutes)
expressServer.use('/', certificateRequestRoutes)
expressServer.use('/', certificateOptionsRoutes)
expressServer.use('/', certificateRoutes)

module.exports = expressServer
