export default class BaseController {    
    constructor(DAO) {
        this.DAO = DAO
    }

    init(client){
        this.DAO.load(client)
    }
}