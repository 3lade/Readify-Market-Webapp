const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const userRoutes_fs = require('./routes/userRoutes_fs');
const bookRoutes = require('./routes/bookRoutes');
const bookRoutes_fs = require('./routes/bookRoutes_fs');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = 8080;


const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8081',  // allow your frontend
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.options('*', cors()); // handle preflight

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


app.use('/api/users', userRoutes);
// app.use('/api/users_fs', userRoutes_fs);
app.use('/api/books', bookRoutes);
// app.use('/api/books_fs', bookRoutes_fs);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);


app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

mongoose.connect('mongodb://localhost:27017/readify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connected to mongoDb")
}).catch(() => {
  console.log("Failed to connect")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;