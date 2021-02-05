const express = require("express");

const app = express();
const port = 3000;

app.get("/", (request, response) => {
    response.send("It's working!!!");
});

app.get("/*", (request, response) => {
    response.redirect("/");
});

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}`);
});