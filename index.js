

//Express : the famous node js framework   
const express = require('express'),
//body-parser: allow us to get the data from the body of the requests
bodyParser = require('body-parser'),
//morgan : logs the requests in the console
morgan      = require('morgan'),
//jsonwebtoken : the package that allows us to generate jwt and build our middleware to check whether the token is valid or not .
jwt    = require('jsonwebtoken'),

/**
 * well accually this file is used to setup some configurations that most users need to do in order to better organise their projects.
   They can setup configuration for databases or for other purposes ,
   In our case we are going to use this file to setup our secret which will be used when creating our jwt so the file should look like this
 */

config = require('./configurations/config'),
app = express(); 

//set secret
app.set('Secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000,()=>{

 console.log('server is running on port 3000') 

});
app.get('/', function(req, res) {
    res.send('Hello world  app is running on http://localhost:3000/');
});

app.post('/authenticate',(req,res)=>{

    if(req.body.username==="login"){
        if(req.body.password===123){
             //if eveything is okey let's create our token 
         
        const payload = {

            check: true
  
          };

          var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours
 
          });
  
          res.json({
            message: 'authentication done ',
            token: token
          });
       
        }else{
            res.json({message:"please check your password !"})
        }

    }else{
       
        res.json({message:"user not found !"})

    }

});


const  ProtectedRoutes = express.Router(); 
app.use('/api', ProtectedRoutes);



//just for testing our api prefix
ProtectedRoutes.get('/getAllProducts',(req,res)=>{

    const products = [

        {
            id: 1,
            name:"cheese"
        },
        {
           id: 2,
           name:"carottes"
        }
    ];
   
    res.json(products)
   
   }) ;


ProtectedRoutes.use((req, res, next) =>{

     
    // check header for the token
    var token = req.headers['access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
        if (err) {
          return res.json({ message: 'invalid token' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token  
     
      res.send({ 
    
          message: 'No token provided.' 
      });
  
    }
  });

