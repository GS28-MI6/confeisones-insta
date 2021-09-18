const express = require("express");
const cors = require("cors");
var xoauth2 = require("xoauth2");
let bodyParser = require("body-parser");
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const nodemailer = require("nodemailer");
const port = 4000;

async function sendMail(texto) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "confesanosloquequieras@gmail.com",
      pass: "38167613elias",
    },
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: "confesanosloquequieras@gmail.com",
    subject: "Confesión anonima",
    html:
      "<p>"+ texto +"</p>",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(400, 400);
      console.log("Error en el envio del mail de cuenta habilitada");
    } else {
      res.status(200).send("Usuario correctamente actualizado");
    }
  });
}

app.post("/enviarMail", (req, res) => {
  try {
    const { texto } = req.body;
    console.log("try", texto);
    sendMail(texto);
    res.status(200).send("ok");
  } catch (err) {
    console.log(err, req.body);
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
