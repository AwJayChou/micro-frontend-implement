const express = require('express');

const app = express();

app.use(express.static('.'))


app.listen(9000, () => {
    console.log('base app is starting on 9000')
})