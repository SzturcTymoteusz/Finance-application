const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://taskapp:Szturc1tymek@.@cluster0.whosv.mongodb.net/Financial-App?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});