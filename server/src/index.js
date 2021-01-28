const express = require('express');
const typeorm = require('typeorm');
const router = require('./routes/operation.routes');
const cors = require('cors');

typeorm
  .createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'alkemy',
    synchronize: true,
    logging: false,
    entities: [require('./entity/OperationSchema')],
  })
  .catch((error) => console.error(error.message));

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use(router);

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
