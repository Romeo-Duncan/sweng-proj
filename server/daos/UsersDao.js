import BaseDAO from "./BaseDao.js"

class UsersDAO extends BaseDAO {
    async createUser(username, password, type) {
        try {
            return await this.collection.insertOne({
                username : username,
                password : password,
                type : type
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async verifyLoginRequest(username, password) {        
        const documentsWithLoginInfo = await this.collection.distinct("type", { username : username, password : password })

        return documentsWithLoginInfo.length > 0 && documentsWithLoginInfo[0]
    }
}

export default new UsersDAO("Users")