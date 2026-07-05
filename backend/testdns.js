const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv("_mongodb._tcp.cluster0.3zt7wrg.mongodb.net", (err, records) => {
  console.log(err || records);
});
