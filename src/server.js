import express from 'express';
import bodyParser from 'body-parser';
import { db } from './db';
import { routes } from './routes';

const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

//Explicitely defining routes
// app.get('/hello', (req, res) => {
//     res.send("Hellows");
// })

const start = async () => {
    await db.connect('mongodb://localhost:27017');
    await app.listen(8080);
    console.log("Listening on port 8080");
}

start();