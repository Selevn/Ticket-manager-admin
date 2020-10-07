const express =require('express');
var cors = require('cors')
const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json({extended: true}))

app.use('/api/concerts',cors(corsOptions),require("./routes/addConcertRouter.js"))
app.use('/api/users',cors(corsOptions),require("./routes/addUserRouter.js"))

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});