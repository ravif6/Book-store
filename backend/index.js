import Express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { mongoDBURL } from "./config.js";
import bookRouter from "./routes/booksRoute.js";
import cors from 'cors';

const app = Express();
//mongoose connection check
mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("running the node")
        });
    })
    .catch((error) => {
        console.log(error)
    })


//middleware fpor parsing request body
app.use(Express.json())


// middleware for handling cors 
//1. Allow all origin

app.use(cors())

//2. Allow custom origins 

app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET','PUT','POST','DELETE'],
    allowedHeaders: ['COntent-Type'],
}))

app.use('/books',bookRouter);
app.get('/', (req, res) => {
    console.log("running the mern stack");
    return res.status(200).send("ravi")
});


