var cluster = require("cluster");
var os = require("os");

var CPUS = os.cpus();

if(cluster.isMaster){
	CPUS.forEach(function(){
		cluster.fork();
	});

	cluster.on("listening", function(worker){
		console.log("Cluster %d conectado", worker.process.pid);
	});

	cluster.on("disconected", function(worker){
		console.log("Cluster %d desconectado", worker.process.pid);
	});

	cluster.on("exit", function(worker){
		console.log("Cluster %d saiu dp ar", worker.process.pid);
		cluster.fork();
	});
} else {
	require("./index.js");
}