const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// HOME PAGE
app.get('/', function(req, res){

    Contact.find({} , function(err, fetchedContacts){
        if(err){
            console.log("Error In Fetching Contacts");
            return;            
        }
        return res.render('home' , {
            title : "My Contacts List",
            contact_list : fetchedContacts
        });
    });    
});

// DELETE CONTACT
app.get('/delete-contact', function(req,res){
    //GET ID FROM URL
    let id = req.query.id;

    //FIND CONTACT IN DATABASE AND DELETE IT.
    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log("Error in deleting Contact form Database");
            return;
        }        
    });
    return res.redirect('back');
    
})

// CREATE CONTACT 
app.post('/create-contact', function(req,res){

    Contact.create({
        name : req.body.name,
        phone: req.body.phone
    }, function(err , newContact){
        if(err){
            console.log("Error in Creating Contact");
            return;           
        }
        console.log("********" , newContact);
        return res.redirect('back');
    })
});


app.listen(port , function(err){
    if(err){
        console.log("Problem Running the server" , err)
    }
    console.log("Server running on port:" , port);
    
});