import mongoose from 'mongoose'

const {Schema,model} = mongoose
 const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    date_released:{
        type:Date,
        required:true
    },
    author:{
        type:String,
        required:true
    }
 })

 const authorSchema = new Schema({
    author_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
    book:{
        type:String,
        required:true
    }
 })

export const Books = model('books',bookSchema)
export const Authors = model('authors',authorSchema)