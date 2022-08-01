import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {Books,Authors} from './librarySchema.js'



dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())


const port = process.env.PORT || 3000

const db = process.env.DB_URL

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to MongoDB')
})


// landing page
app.get('/',(req,res) =>{
    res.send('Welcome to library webservice')
    })
    
// inserting a book

app.post('/book',async(req,res) =>{
    const {title,description,genre,date_released,author} = req.body
    const createBook = await Books.create({
        title,
        description,
        genre,
        date_released,
        author
    })
    if (createBook){
        res.status(200).json({
            Message: 'Book inserted successfully',
            data:createBook
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to insert book'
        })
    }
})

//searching for a single book
app.get('/books/:id',async(req,res) =>{
    const {id} = req.params
    const getBook = await Books.findById(id)
     if(getBook){
        res.status(200).json({
            Message:'Book found successfully',
            data:getBook
        })
     }
     else{
        res.status(404).json({
            Message:'Unable to fetch book'
        })
     }
})

// getting all books
app.get('/books',async(req,res) =>{
    const getBooks = await Books.find({})
     if(getBooks){
        res.status(200).json({
            Message:'Book found successfully',
            data:getBooks
        })
     }
     else{
        res.status(404).json({
            Message:'Unable to fetch book'
        })
     }
})

// updating a book
app.patch('/book/:id',async(req,res) =>{
    const {id} = req.params
    const {description,genre} = req.body
    const updateBook = await Books.updateOne({
        description,
        genre
    }).where({id})

    if(updateBook){
        res.status(200).json({
            Message:'Book updated succesfully',
            data:updateBook
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to update book'
        })
    }
})

// deleting a book
app.delete('/book/:id',async(req,res) =>{
    const {id} = req.params
    const deleteBook = await Books.findByIdAndDelete(id)

    if(deleteBook){
        res.status(200).json({
            Message:'Book deleted successfully'
        
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to delete book'
        })
    }
})


////AUTHORS
// inserting a book

app.post('/author',async(req,res) =>{
    const {author_name,email,gender,book} = req.body
    const createAuthor = await Authors.create({
        author_name,
        email,
        gender,
        book
    })
    if (createAuthor){
        res.status(200).json({
            Message: 'Author added successfully',
            data:createAuthor
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to add Author'
        })
    }
})

//searching for a single Author
app.get('/authors/:id',async(req,res) =>{
    const {id} = req.params
    const getAuthor = await Authors.findById(id)
     if(getAuthor){
        res.status(200).json({
            Message:'Author found successfully',
            data:getAuthor
        })
     }
     else{
        res.status(404).json({
            Message:'Unable to fetch Author'
        })
     }
})

// getting all Authors
app.get('/authors',async(req,res) =>{
    const getAuthors = await Authors.find({})
     if(getAuthors){
        res.status(200).json({
            Message:'All uthors found successfully',
            data:getAuthors
        })
     }
     else{
        res.status(404).json({
            Message:'Unable to fetch Authors'
        })
     }
})

// updating an Author
app.patch('/author/:id',async(req,res) =>{
    const {id} = req.params
    const {email,gender,book} = req.body
    const updateAuthor = await Authors.updateOne({
        email,
        gender,
        book
    }).where({id})

    if(updateAuthor){
        res.status(200).json({
            Message:'Author updated succesfully',
            data:updateAuthor
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to update Author'
        })
    }
})

// deleting an Author
app.delete('/author/:id',async(req,res) =>{
    const {id} = req.params
    const deleteAuthor = await Authors.findByIdAndDelete(id)

    if(deleteAuthor){
        res.status(200).json({
            Message:'Author deleted successfully'
        
        })
    }
    else{
        res.status(404).json({
            Message:'Unable to delete Author'
        })
    }
})









app.listen(port,()=> {
    console.log(`Server is running on ${port}`)
})