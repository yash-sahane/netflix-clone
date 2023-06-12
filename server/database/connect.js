import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'netflix',
        useNewUrlParser: true,
        useUnifiedTopology : true
    }).then((c) => {
        console.log(`Database connected with ${c.connection.host}`);
    }).catch((e) => console.log(e))
}

