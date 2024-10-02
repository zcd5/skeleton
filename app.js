const express = require('express');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded())

const pets = [
	{
		name: "Scout",
		image: "cute-dog.jpg",
		superpower: "paws"
	},
	{
		name: "Toby",
		image: "cute-cat.jpg",
		superpower: "eyes"
	}
] 

const votes =[];

app.get('/', function(req, res) {
  res.render('home', {pets});            //pets is both the key and the value
});

app.post("/vote", (req, res) =>{
	console.log(req.body)
	votes.push({...req.body, ip: req.ip});
	console.log(votes)
	res.redirect('/')
  })
  

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
}); 


// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
