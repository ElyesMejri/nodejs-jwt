#  Node js api with JSON Web Token
This repository show us an example of static authentication client-server side using Node JS and Json Web token  

To use that you need have node js installed in your machine and Postman for testing the requests  


What is a Token based authentication ?
  - It allow users to use their username and password in order to obtain a token which allows them to access a specific         resource without using every time their natural credentials.

 - Once their token has been obtained, the user can use that token to access a specific resource in a server for a time        period to the remote site

# The process of using jwt

  - authenticate using credentials
  - once authentication is granted the
  - server generate a random string which contains the json web token
  - return the token to the client side
  - storing the token in the client side
  - sending the token with every single http request from the client to the server
  - the server check whether the token is valid or not and grant access to the specified resource


For testing:
 - Go to the directory of the project and type node index.js check if there's syntax errors and run the server 
