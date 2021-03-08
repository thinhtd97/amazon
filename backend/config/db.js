import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect successfully!!");
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB