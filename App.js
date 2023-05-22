const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
  
mongoose.connect("mongodb+srv://andresmaltesvarela:12345Andres@cluster0.8d6kjrz.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  
const contactSchema = {
  nombre: String,
  email: String,
  nombreMascota: String,
  razaMascota: String,
  telefono: String,
  tratamiento: String
};
  
const Contact = mongoose.model("Contact", contactSchema);
  
const app = express();
  
app.set('view engine', 'ejs');
  
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(express.static(__dirname + '/public'));
  
app.get("/contact", function(req, res){
    res.render("contact");
});
  
app.post("/contact", function (req, res) {
    console.log(req.body.email);
  const contact = new Contact({
      nombre: req.body.nombre,
      email: req.body.email,
      nombreMascota: req.body.nombreMascota,
      razaMascota: req.body.razaMascota,
      telefono: req.body.telefono,
      tratamiento: req.body.tratamiento,
  });
  contact.save(function (err) {
      if (err) {
          throw err;
      } else {
        res.render("contact");
      }
  });
});
  
app.listen(3000, function(){
    console.log("App is running on Port 3000");
});