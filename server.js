const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

//GET Routes
require('./routes/APIroutes')(app);
require('./routes/HTMLroutes')(app);

//We are listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);