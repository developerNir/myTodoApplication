const app = require('./server.js');
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Application listening on Port localhost:/${Port}`);
})

