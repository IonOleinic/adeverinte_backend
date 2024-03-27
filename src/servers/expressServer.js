const expressServer = require('express')()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const corsOptions = require('../../config/corsOptions')

const verifyJWT = require('../middleware/verifyJWT')
const credentials = require('../middleware/credentials')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../middleware/verifyRoles')

const tokenRoutes = require('../routes/tokenRoutes')
const authRoutes = require('../routes/authRoutes')
const userRoutes = require('../routes/userRoutes')
const rolesRoutes = require('../routes/rolesRoutes')

const studentRoutes = require('../routes/studentRoutes')
const facultyRoutes = require('../routes/facultyRoutes')
const certificateRequestRoutes = require('../routes/certificateRequestRoutes')
const certificateOptionsRoutes = require('../routes/certificateOptionsRoutes')
const certificateRoutes = require('../routes/certificateRoutes')

expressServer.use(credentials)
expressServer.use(cors(corsOptions))

expressServer.use(bodyParser.json())
expressServer.use(cookieParser())

expressServer.use('/', authRoutes)
expressServer.use('/', tokenRoutes)

//routes for sectretary and admin
expressServer.use(verifyJWT)
expressServer.use('/', studentRoutes)
expressServer.use('/', certificateRoutes)
expressServer.use('/', certificateRequestRoutes)

//routes only for admin
expressServer.use(verifyRoles(ROLES_LIST.Admin))
expressServer.use('/', rolesRoutes)
expressServer.use('/', userRoutes)
expressServer.use('/', facultyRoutes)
expressServer.use('/', certificateOptionsRoutes)

module.exports = expressServer
