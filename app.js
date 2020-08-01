require('dotenv').config();

const express = require('express'),
    helmet = require('helmet'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

// Database Setup
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(console.log('Connected to the database')).catch((err) => console.log(err));


// Setup Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(require('./passport').passport.initialize());

// <<<<<<<<<<< Routes >>>>>>>>>>>>
const routes = require('./routes')
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('*', (req, res) => {
        res.status(404).send({ 'message': 'Invalid endpoint' });
    });
}

app.listen(process.env.PORT || 8080, () => {
    console.log('Starting the server');
});