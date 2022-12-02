import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { useState, useEffect } from 'react'

import OrderService from '../../Services/OrderService.js'
import Statuses from '../../constants/statuses'

import ViewCustOrderDetails from './ViewCustOrderDetails.js'

function onOrderCancelled(orderId){
    return OrderService.cancelOrder(orderId)
}

function ViewCustOrders(props) {
    const [detailsShow, setDetailsShow] = useState(false)
    const [orderDetails, setOrderDetails] = useState([]) 
    const [orderData, setOrderData] = useState([]) 
    
    function updateOrderData(){
        OrderService.getCustOrders(props.userId).then((custOrderData) => {
            if (custOrderData){
                setOrderData(custOrderData)
            }                
        })      
    }

    useEffect(() => {
        OrderService.getCustOrders(props.userId).then((custOrderData) => {
            if (custOrderData){
                setOrderData(custOrderData)
            }                
        })        
    }, [])

    return(
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    <th>Tracking Number </th>
                    <th>Date Placed</th>
                    <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orderData.map(order => {
                            return(
                                <tr>
                                    <td>{order.orderId}</td>
                                    <td>{(new Date(order.time)).toLocaleString()}</td>
                                    <td>{Statuses[order.status]}</td>
                                    <td>
                                        <Button 
                                            variant='primary rounded-pill fw-bold'
                                            onClick={() => {
                                                setOrderDetails(order.orderData)
                                                setDetailsShow(true)
                                            }}                       
                                        >
                                            View
                                        </Button>  
                                    </td>
                                    {
                                        order.status < 2
                                        &&
                                        <td>
                                            <Button 
                                                variant='danger rounded-pill fw-bold'
                                                onClick={() => {
                                                    onOrderCancelled(order.orderId).then(updateOrderData)
                                                }}                       
                                            >
                                                Cancel
                                            </Button>  
                                        </td> 
                                    }                                    
                                </tr>
                            )
                        })
                    }  
                    {
                        orderData.length == 0
                        &&
                        <div class="mt-3 fw-light fs-4">
                            YOU HAVE NO ORDERS TO TRACK
                        </div>
                    }    
                </tbody>
            </Table>
            <div>
                    
            </div>

            <ViewCustOrderDetails
                show={detailsShow}
                onHide={() => setDetailsShow(false)}
                orderDetails={orderDetails}
            />
        </>
    )
}

export default ViewCustOrders