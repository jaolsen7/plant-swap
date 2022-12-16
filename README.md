# Plant-Swap-Lite

## Description

Plant Swap Lite is a mobile-responsive web app that connects plant lovers in the same zip code for houseplant exchanges. This CRUD app allows users to post their favorite plant species and comment on other users posts in order to communicate if they want to swap.

## Demo

Video demonstrating mobile-responsive navbar and pages:
![demo-gif](demo.gif)

## Installation

Heroku deployment no longer working...must clone application and run locally. :(

## Usage

Navigate to the live Heroku application for immediate use. Otherwise, fork the github repo, follow the next section's instructions.

## Technology

To create an app similar to this, you will need the MERN stack (MongoDB/Mongoose, Express, React, Node), Apollo Client, and GraphQL (see /client/package.json or the links below). Create the React client-side with ```npx generate-react-app client``` and using node, install packages with ```npm i```. You will see these packages also include jwt-token for authorization and bootstrap/react-bootstrap/react-icons for styling.

Then, you can set up your Apollo Server in /server/server.js. Connect your MongoDB Compass in the connection.js, which will require you to login to MongoAtlas, create a Cluster, set up a User, set up local browser connection, and using copy&pasting the appropriate links (which will go in the .env file as well). To deploy to Heroku later, you will need Mongo Atlas connected and your environmental variables setup. This app uses SECRET=secret and TOKEN_EXP=12h for JWT and MONGODB_URI for the connection string.

With that all good to go, configure your models, schemas, seeds on the server-side and the mutations and queries on the client-side. After this, use React to create your front-end/import back-end data. Once finished with you site, deploy it to Heroku and make sure to setup the MONGODB_URI environmental variable.

Here is the technology used along with links to them where applicable:

- [VScode](https://code.visualstudio.com/download)
- [MongoDB](https://www.mongodb.com/)<br>
- [MongodbCompass](https://www.mongodb.com/products/compass)<br>
- [ApolloGraphql](https://www.apollographql.com/)<br>
- [React](https://reactjs.org/)<br>
- [MongodbAtlas](https://www.mongodb.com/atlas/database)<br>
- [Heroku](https://devcenter.heroku.com/articles/git)<br>

## Credits

JWT/Auth and Apollo Server Boilerplate provided by UCSD Bootcamp Professor John Desrosiers (@median-man)

## Questions

If you have any questions, please contact me via the channels provided below:<br />
________________________________________
Github: https://github.com/jaolsen7<br>
Portfolio: https://jaolsen7.github.io/json-portfolio/<br>
Email: json.olsen@gmail.com<br>