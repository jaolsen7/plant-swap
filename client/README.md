# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## MERN-GQL-START

Boilerplate app for full-stack MERN app with Create React App client tool chain. Includes React, JWT authentication, Mongoose/MongoDB, Apollo Server/Client, and ExpressJS.

## Getting Started

- Add a `.env` file to `server` directory to run locally. Use `server/.env.example` as a template.

- `npm start` script: Production startup. Only runs backend server.

- `npm run develop` script: Uses `concurrently` to run the back-end with `nodemon` and launches the `create-react-app` development server for front-end development. `concurrently` runs these within the same terminal. Logging is tagged with `[server]` or `[client]`.

- `npm run client` script: Launches the `create-react-app` development server for the client only. Will not start back-end.

- `npm run server` script: Starts the back-end server with `nodemon` for easy development without launching the client.

- The `npm install` script: Installs all dependencies for root as wells as `client` and `server`.

- The `npm run build` script: Runs `create-react-app` build script to create client bundles and assets.

## Deploying to Heroku

- Requires a MongoDB server. MongoDB Atlas is a fairly easy choice for this requirement. Create an Atlas account and setup a database.

- Add the following values to the Heroku config for the app:

  - `SECRET` - used for signing and verifying tokens
  - `TOKEN_EXP` - duration before token expires in milliseconds or a string
    describing a time span. ([zeit/ms](https://github.com/vercel/ms))
  - `MONGODB_URI` - used for connecting to MongoDB service

- Push your code to GitHub

- Connect your Heroku app with GitHub or push code directly to Heroku. (See [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs))

## Apollo Server

This project uses `apollo-server-express v 3.x` which means GraphQL Playground (deprecated) is not included. Instead, Apollo Server 3 uses [Apollo Studio](https://www.apollographql.com/docs/studio/) as a development tool for building your api. If you would like to use GraphQL Playground, refer to [this guide](https://www.apollographql.com/docs/apollo-server/migration/#graphql-playground) to enable the tool.

## Create React App

The client for this project is built with the `create-react-app` tool chain. The README file generated by `create-react-app` has been preserved. See [client/README.md](./client/README.md) for details about the tools.
