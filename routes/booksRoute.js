import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear || !request.body.price) {
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear, price" });
        }
        
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            price: request.body.price
        };

        const book = await Book.create(newBook);
        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get a book by its ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).send({ message: 'Book not found.' });
        }
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear || !request.body.price) {
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear, price" });
        }
        
        const { id } = request.params;
        const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedBook) {
            return response.status(404).send({ message: 'Book not found.' });
        }
        return response.status(200).send({ message: 'Book updated successfully.', data: updatedBook });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return response.status(404).send({ message: 'Book not found.' });
        }
        return response.status(200).send({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;