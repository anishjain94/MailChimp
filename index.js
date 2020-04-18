const exp = require('express');
const bodyParser = require('body-parser');

const request = require('request');

const app = exp();


//sets up the path for static file ie /public
app.use(exp.static('Public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log("Listening on port 3000");
});

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {

    var email = req.body.email;
    var name = req.body.name;
    var pwd = req.body.pasword;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/791f9f88ed",
        method: "POST",
        headers: {
            "Authorization": "Maillist 020b30c71ebdf61a77e546b5c4eaf691-us19"
        },
        body: jsonData
    }

    request(options, function (error, response, body) {
        // if (error) {
        //     console.log(error);
        // }
        // else {
        //     console.log(response.statusCode);
        // }

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    })

});



//Api Key
// 020b30c71ebdf61a77e546b5c4eaf691-us19
//ID
// 791f9f88ed 