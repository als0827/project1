import setting from "../server.js"
const {app, port} = setting;
app.listen(port, () => {
    console.log("Server is running on port 3000");
  }) 