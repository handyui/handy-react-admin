const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      // target: "http://192.168.7.221:8080",
      // target:"http://192.168.3.104:8080",
      target: "http://localhost:3001",
      changeOrigin: true, // needed for virtual hosted sites
    //   ws: true, // proxy websockets
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};