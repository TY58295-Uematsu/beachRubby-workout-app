
const setUpServer = require('./server');
const PORT = 3000;
const app = setUpServer();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });