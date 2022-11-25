import Express from "express"
import Mongodb from "mongodb"
import Dotenv from "dotenv"
import Cors from "cors"

//Controllers
import UserController from "./controllers/UserController.js"

Dotenv.config()

const mongoClient = Mongodb.MongoClient
const port = process.env.SERVER_PORT
const Router = Express.Router()
const app = Express()

function createAppRoutes(){
    const routeCallbacks = [
        {
            route : "/log-in",
            callback : UserController.onLoginRequest
        }
    ]

    function callControllerMethod(method) {
        return (req, res) => {
            try {             
                method(req, res);
            } catch (error) {
                res.status(500).json({ error : err.message })
            }
        }
    }

    routeCallbacks.forEach(function(routeCallbackInfo){
        Router.route(routeCallbackInfo.route).post(callControllerMethod(routeCallbackInfo.callback))
    })
}

function initControllers(client){
    [UserController].forEach(function(controller){
        controller.init(client)
    })    
}

function initMongoClient(){
    mongoClient.connect(
        process.env.DATABASE_URI,
        {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser:true
        }
    ) .catch(err => {
        console.error(err.stack)
        process.exit(1)
    }) .then(async client => {
        initControllers(client)
    
        app.listen(port, () => {
            console.log("Port Created")
        })
    });
}

function initApp(){
    app.use("/api/v1", Router)
    app.use(Express.json())
    app.use(Cors())
}

createAppRoutes()

initApp()
initMongoClient()