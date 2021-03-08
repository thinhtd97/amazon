import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

export const createOrder = asyncHandler(async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            itemsPrice,
            taxPrice,
            totalPrice,
        } = req.body

        const order = new Order({
            orderItems,
            user: req.user.id,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            itemsPrice,
            taxPrice,
            totalPrice,
        })
        
        const createdOrder = await order.save()
    
        res.status(201).json(createdOrder)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Order Failed!!")
    }
})
export const getOrderByID = asyncHandler(async (req, res) => {
    try {
       const order = await Order.findById(req.params.id).populate('user', 'name email')
       if(order) {
           res.json(order)
       } else {
           res.status(404)
           throw new Error('Order Not found')
       }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Order Failed!!")
    }
})
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    try {
       const order = await Order.findById(req.params.id)
       if(order) {
            order.isPaid = true 
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const updatedOrder = await order.save()
            res.json(updatedOrder)
       } else {
           res.status(404)
           throw new Error('Order Not found')
       }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Order Failed!!")
    }
})
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    if(orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error("Not found order")
    }
})
export const getListOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name')
    if(orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error("Not found order")
    }
})
export const updateOrderToDelivery = asyncHandler(async (req, res) => {
    try {
       const order = await Order.findById(req.params.id)
       if(order) {
            order.isDelivery = true 
            order.deliveryAt = Date.now()
           
            const updatedOrder = await order.save()
            res.json(updatedOrder)
       } else {
           res.status(404)
           throw new Error('Order Not found')
       }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Order Failed!!")
    }
})