#!/usr/bin/env node

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');


const app = express();
const port = 5000;

app.use(express.json());
app.use("/api", router);

const uri = 'mongodb+srv://chrisben:chb220898@cluster0.luj3c.mongodb.net/updates?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
