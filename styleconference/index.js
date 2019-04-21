var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
// var assetPath = path.join(__dirname , '/assets');
var htmlPath = path.join(__dirname);

// console.log(assetPath);
// console.log(htmlPath);
console.log('Server listening...');


http.createServer((req, res) => {
	console.log(req.url);

	if(req.url === '/' && req.method === 'GET') {
		var file = htmlPath + '/index.html';
		res.setHeader('Content-Type', 'text/html');
		console.log(file);

		res.writeHead(200);
		fs.createReadStream(file).pipe(res);
		// res.end();
	}

	// Checking for Speakers
	if(req.url === '/speakers.html' && req.method === 'GET') {
		console.log('Requesting Speakers.html now...');
		var file = htmlPath + '/speakers.html';
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === '/schedule.html' && req.method === 'GET') {
		console.log('Requesting Schedule.html now...');
		var file = htmlPath + '/schedule.html';
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === '/venue.html' && req.method === 'GET') {
		console.log('Requesting venue.html now...');
		var file = htmlPath + '/venue.html';
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === '/register.html' && req.method === 'GET') {
		console.log('Requesting register.html now...');
		var file = htmlPath + '/register.html';
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url.includes('css')) {
		var filePath = htmlPath + req.url;
		console.log(filePath, 'requesting CSS file'); 
		res.setHeader('Content-Type', 'text/css');
		fs.createReadStream(filePath).pipe(res);
	}
	if(['jpg', 'png', 'gif', 'jpeg'].indexOf(req.url.split('.').pop()) > -1) {
		var extension = req.url.split(".").pop();
		var filePath = htmlPath + req.url;
		res.setHeader('Content-Type', `images/${extension}`);
		fs.createReadStream(filePath).pipe(res);
	}
	if(req.url === '/register.html' && req.method === 'POST') {
		var contact = '';
		req.on('data', (chunk) => {
			contact += chunk;
		}).on('end', () => {
			// console.log(contact, 'this is just contact variable data');
			var parsedContact = querystring.parse(contact);

			//saving the received data in object form
			var user = JSON.stringify(parsedContact);
			// console.log(parsedContact, 'this is parsedContact');

			//Sending data as response back in object form
			res.end(user);
			//taking the name out of the object to create a file with that name on local system and save the form data inside it.
			var fileName = `${parsedContact.name}.json`;
			// console.log(fileName, 'this is fileName');

			//Opening the directory and creating a .json file to save the data in it.
			fs.open(`${htmlPath}/${fileName}`, 'wx', (err, fd) => {
				if(err) console.log(err);
				fs.writeFile(fd, user, (err) => {
					if(err) console.log(err);
					console.log('Creating file with name: ', fileName);
					fs.close(fd, (err) => {
						if(err) console.log(err);
						console.log('Successfully saved file with name: ', fileName);
					})
				})
			})
		})
	}

}).listen(7042);