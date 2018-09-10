const express 	= require("express"),
	app			= require("./server/server.js");


	app.use(express.static(__dirname + "/www"));



	app.listen(5000, () => {
		console.log("server started");
	}); 