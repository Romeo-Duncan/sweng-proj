import BaseController from "./BaseController.js"
import UsersDAO from "../daos/UsersDao.js"

class UsersController extends BaseController{
    async onLoginRequest(req, res) {
        const body = req.body;
        const username = body.username
        const password = body.password
        const userType = UsersDAO.verifyLoginRequest(username, password)

        res.json({
            userType : userType
        })
    }
}

export default new UsersController(UsersDAO)