import users from './data/user.js'
import products from './data/products.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import connectDB from "./config/db.js";
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()
    
        const createdUser = await User.insertMany(users)
    
        const adminUser = createdUser[0]._id
    
        const sampleProduct = products.map(product => {
            return { ...product, user: adminUser }
        })
    
        await Product.insertMany(sampleProduct)
    
        console.log("Imported Data");
        process.exit()
    
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(0)
    }
}
const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Destroyed Data!")

        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit()
    }
    
}
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}