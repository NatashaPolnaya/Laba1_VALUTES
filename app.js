const express = require("express");
const requestAPI = require("request");

const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("view options", { layout: "layout" });

app.get("/", (request, response) => {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";

    requestAPI(url, (error, requesr2, data) => {
        let model = {
            Valute: {}
        };
        let help_model = {
            Valute: {}
        }
        let rus_model = {
            Valute: {}
        }
        
        if (error) console.log(error);
        else {
            //model = JSON.parse(data);

            rus_model.Valute["RUS"] = {
                ID: "R0",
                NumCode: "0",
                CharCode: "RUS",
                Nominal: 1,
                Name: "Российский рубль",
                Value: 1,
                Previous: 1
            };

            help_model = JSON.parse(data);
            model.Valute = Object.assign(rus_model.Valute, help_model.Valute);

            var number = 0;
            for (const key in model.Valute) {
                const element = model.Valute[key];
                element.Value = (element.Value / element.Nominal).toFixed(3);
                element.DeValue = (1 / element.Value).toFixed(3);

                number += 1;
                element.Nom = number;

            }
        }

        response.render("main", model);
    });
});

app.get("/*", (request, response) => {
    response.redirect("/");
});

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}`);
});