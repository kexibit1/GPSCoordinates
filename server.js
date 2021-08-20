const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/', require('./routers/gps.router'));

app.listen(PORT, () => console.log(`Server running on ${PORT} port`));