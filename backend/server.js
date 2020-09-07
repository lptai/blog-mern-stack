const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

// db
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log('Database connected'));

// routes
app.get('/api', (req, res) => {
    res.json({ item: Date().toString() });
});

// port
const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
