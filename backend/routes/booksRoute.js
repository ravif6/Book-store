import  express  from "express";
import { Book } from "../models/bookModel.js";

const bookRouter  = express.Router();

// create a book
bookRouter.post('/', async (request, response) => {
    try {
        if (!(request.body.title &&
            request.body.author &&
            request.body.publishYear)) {
            return response.status(400).send({
                message: 'Send all require fields'
            })
        }
        const data = request.body;
        const newBook = {
            title: data.title,
            author: data.author,
            publishYear: data.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(200).send(book);

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// get all books
bookRouter.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// get book by id 
bookRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);
        if (books) {
            return response.status(200).send({
                count: books.length,
                data: books
            });
        } else {
            return response.status(404).send({ message: "book not found" })
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// update book by id
bookRouter.put('/:id', async (request, response) => {
    try {
        if (!(request.body.title &&
            request.body.author &&
            request.body.publishYear)) {
            return response.status(400).send({
                message: 'Send all require fields'
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (result) {
            return response.status(200).send({message:"updated successfully"})
        } else {
            return response.status(404).send({ message: "book not found" })
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//delete book by id
bookRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findByIdAndDelete(id);
        if (book) {
        return response.status(200).send({
           message:"book deletd success"
        });
        }
        else{
            return response.status(404).send({message : "book not found"})
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default bookRouter;