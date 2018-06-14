const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//for heroku
const port = process.env.PORT || 3000 ;
var apps = express();
//templating engine let me do 
/* A template engine enables you to use static template files in your application.
 At runtime, the template engine replaces variables in a template file with actual values, 
 and transforms the template into an HTML file sent to the client. mane templatke html e convert
 This approach makes it easier to design an HTML page.
 onek templating engine ase ami handlebar use korbo
 */
//registering partial

hbs.registerPartials(__dirname + '/views/partials')
//helper
hbs.registerHelper('getFullyear', ()=> {

    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) =>{

   return  text.toUpperCase();
})

//apps.set let us set express related configuaration
apps.set('view engine','hbs' )

//Middleware : to customize expresss framework,it's like 3rd party add-onn

//middleware hocce route ar res.send er moddoborti code ,eta static files a accees korar jonno use kora hoy css,js
//middleware e next() call na korle kono function run hobe na app crash korbe next() bole we are done




apps.use((req,res,next) =>{

    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);

    fs.appendFile('server.log', log + '\n');
    next(); //let the server process continue
})
//middleware next na korle kisu run hobe nai sudhu oi template ta render hobe


// apps.use((req,res,next)=>{

//   res.render('maintainence.hbs')
// })

apps.use(express.static(__dirname + '/public'));

apps.get('/json',(req,res)=>{

    // res.send(`<h1>Hello Express</h1>`);
    //sending json data 
    res.send({

        name:'Hridoy',
        Likes:['Girls','Car']
    })
})

//second route
apps.get('/about', (req,res)=>{

    // res.send('This is about js')
    //res.render() render any of the template i set up now in current view engine its about.hbs
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });

});
//another route


apps.get('/bad', (req,res) =>{
    res.send('Sorry this page does not exist')
})

apps.get('/', (req,res)=>{

    res.render('home.hbs', {
        homeTitle:`Hridoy's website`,
        copyright:'All Rights Reserved Hridoy',
        welcomeMessage:'welcome here'
 
    })
})

apps.get('/projects', (req,res) => {
 
    res.render('projects.hbs', {
         
        pageTitle:'Projects'
    })

})
apps.listen(port, ()=> {

    console.log(`Server run on ${port}`);
});