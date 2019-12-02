module.exports = {
  // change "./server/index.js" to the relative path from the root directory to
  // the file that starts your server.
  // if you're connecting to an external server,
  // change "./server/index.js" to its URL in the following format:
  // "https://yourserverurl.com"
  entry: './src/index.ts',

  // change 3000 to the port number that your server runs on
  portNumber: 4000,

  // to increase the amount of time allowed for the server to startup, add a time
  // in milliseconds (integer) to the "serverStartupTimeAllowed"
  // serverStartupTimeAllowed: 5000,
};
