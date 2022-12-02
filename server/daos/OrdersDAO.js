import BaseDAO from "./BaseDAO.js"

import {ObjectId} from "mongodb"

class OrdersDAO extends BaseDAO {
    async createOrder(userId, orderData, time){
        await this.collection.insertOne({
            userId : userId,
            orderData : orderData,
            status : 0, 
            time : time
        })
    }

    async getCustOrders(userId){
        return await this.collection.aggregate([
            { $match : { userId : userId} },         
            { $unwind : "$orderData"},
            {
                $lookup : {
                    from: "Inventory",
                    let: {
                        itemId : { $toObjectId: "$orderData.itemId"},
                        items: "$orderData"
                    },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$itemId" ] } } },
                        { $unset : [ "Description", "Category", "_id", "Ingredients"] },
                        { $replaceRoot: { newRoot: { $mergeObjects: ["$$items", "$$ROOT"] } } }
                    ],
                    as: "orderData"
                }
            },
            {
                $group: {
                  _id: "$_id",
                  userId: { $first: "$userId" },
                  time: { $first: "$time" },
                  status: {$first: "$status"},
                  orderData: { $push: { $first: "$orderData" } }
                }
            },
            { $sort : { status : 1, time : -1 } },          
            { $addFields : { orderId : "$_id" } },    
            { $unset : [ "_id", "userId" ] }
        ]).toArray()
    }

    async getAllOrders(){
        return await this.collection.aggregate([  
            { $addFields : { userObjectId : { $toObjectId: "$userId"} } },  
            {
                $lookup : {
                    from: "Users",
                    localField: "userObjectId" ,
                    foreignField: "_id",
                    as: "customerData"
                }
            },
            { $unset : [ "customerData._id", "customerData.type", "customerData.password" ] },
            { $unwind : "$orderData"},
            {
                $lookup : {
                    from: "Inventory",
                    let: {
                        itemId : { $toObjectId: "$orderData.itemId"},
                        items: "$orderData"
                    },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$itemId" ] } } },
                        { $unset : [ "Description", "Category", "_id", "Ingredients"] },
                        { $replaceRoot: { newRoot: { $mergeObjects: ["$$items", "$$ROOT"] } } }
                    ],
                    as: "orderData"
                }
            },
            {
                $group: {
                  _id: "$_id",
                  userId: { $first: "$userId" },
                  time: { $first: "$time" },
                  status: {$first: "$status"},
                  customerData: {$first: "$customerData"},
                  employees: {$first: "$employees"},
                  orderData: { $push: { $first: "$orderData" } }
                }
            },
            { $sort : { status : 1, time : -1 } },          
            { $addFields : { orderId : "$_id" } },    
            { $unset : [ "_id", "userId" ] }
        ]).toArray()
    }

    async updateOrderStatus(orderId, status){
        orderId = ObjectId(orderId)

        return await this.collection.updateMany(
            { _id : orderId},
            {$set: {
                status:status
            }}
        )
    }

    async assignOrder(orderId, employeeIdList){
        orderId = ObjectId(orderId)

        return await this.collection.updateMany(
            { _id : orderId},
            {$set: {
                employees:employeeIdList
            }}
        )
    }

    async getAssignedOrders(employeeId){
        return
    }

    async cancelOrder(orderId){
        orderId = ObjectId(orderId)

        return await this.collection.deleteOne({"_id" : orderId})
    }
}

export default new OrdersDAO("Orders")