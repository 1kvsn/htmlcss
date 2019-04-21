var express = require('express');
var app = express();

var path = require('path');

app.use((req, res, next) => {
	console.log(req.url, req.method, req.ip);
	next();
})

// Template residing location
//Comes before any routes
app.set('views', path.join(__dirname, 'views'))
// console.log(__dirname);

// USE eJS as our View Engine.
app.set('view engine', 'ejs')

// Auto defined middlewares, so no need to call next(). They call next() themselves.
// Only works when json or form data is coming.
app.use(express.json());
app.use(express.urlencoded());

// ===== GET Request Handle ==== //
// When the GET request comes from client on port defined, send the file given into res.
app.get('/', (req,res) => {
	// Send File needs absolute path.
	// res.sendFile(__dirname + '/index.html');

	// Instead of sending file, we use res.render() and send using eJS Template.
	//This will make the eJS Template look for index.eJS file and send it as a response.
	// automatically looks for index.eJS file in 'Views' folder.
	res.render('index');
})
app.get('/schedule.html', (req, res) => {
	console.log(req, 'Requesting /schedule.html now...');
	res.render('schedule');
})
app.get('/speakers.html', (req, res) => {
	res.render('speakers');
})
app.get('/venue.html', (req, res) => {
	res.render('venue');
})
app.get('/register.html', (req, res) => {
	res.render('register');
})

// ==== POST ===== //
app.post('/register.html', (req, res) => {
	console.log(req.body);
})





// ==== STATIC Folder Set ====//
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'), ' => logging full path of public directory');

// Listen takes a callback as well to test.
app.listen(7042, () => {
	console.log('Server running on port: 7042');
});





