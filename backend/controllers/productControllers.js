import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

export const getProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1
    const pageSize = 2
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count/pageSize) })
})

export const getProductsTop = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })
    if(!products) {
        res.status(404)
        throw new Error("Not found Product")
    } else {
        res.json(products)
    }
})

export const getProductID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(404)
        throw new Error("Not found Product")
    } else {
        res.json(product)
    }
})
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        await product.remove()
        res.json({ message: 'Remove Successfully' }) 
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})
export const createProduct = asyncHandler(async (req, res) => {
    try {
        const name = "Sample name"
        const image = "/images/sample.png"
        const brand = "Sample brand"
        const category = "Electronics"
        const description = "Sample description"
        const price = 10

        const product = new Product({
            user: req.user.id,
            name,
            image,
            brand,
            category,
            description,
            price
        })
        
        const createdProduct = await product.save()

        res.status(201).json(createdProduct)

    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Create Product Failed!!")
    }
})
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.brand = req.body.brand || product.brand
        product.description = req.body.description || product.description
        product.countInStock = req.body.countInStock || product.countInStock
        product.image = req.body.image || product.image

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error("Update  Product Failed!!!")
    }
})
export const createReviews = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body 
    const product = await Product.findById(req.params.id)
    const user = await User.findById(req.user.id)
    const alreadyReview = product.reviews.find(r => r.user.toString() === req.user.id.toString())
    if(alreadyReview) {
        res.status(400)
        throw new Error('Review already!!')
    } else {
        const review = {
            comment,
            rating: Number(rating),
            name: user.name,
            user: req.user.id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, i) => i.rating + acc, 0)/product.reviews.length
        await product.save()
        res.json({ message: "Review successfully" })
    }
})