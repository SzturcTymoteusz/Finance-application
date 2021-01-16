const  express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/mongoose');
const userRouter = require('./routers/userRouter');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
    res.render('index');
});




app.listen(port, () => {
    console.log('Server is up on port' + port);
})