import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });




import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as webpush from "web-push";

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();
//get router
// var router = express.Router();
main.use('/api/v1', app);
// main.use(bodyParser.json());

main.use(bodyParser.urlencoded({
    extended: false
  }));
//   main.use(bodyParser.json());
app.use(cors());
//get router
// var router = express.Router();

// http://127.0.0.1:8080
// http://192.168.0.106:8080
// http://172.18.0.1:8080


//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: API_URL,
  origin: 'http://127.0.0.1:8080',
  preflightContinue: false
};

//use cors middleware
app.use(cors(options));

//add your routes

//enable pre-flight
app.options("*", cors(options));

  

export const webApi = functions.https.onRequest(main);

// app.get('/warmup', (request, response) => {

//     response.send('Warming up friend.');

// })




app.get('/', (req, res) => {
  res.send('This is a push notification server use post');
});

app.post('/subscribe', (req, res) => {
  let sub = req.body;
  res.set('Content-Type', 'application/json');
  webpush.setVapidDetails(
    'mailto:developer.tahirghori@gmail.com',
    "BAhlNbCbzEyraICbjOI_9TAqyIyLK3MLB1Nwu1PHgzcki0LgrbLYaFu8SJzsapRQdme-RqzJnx6AUNRTSUoVQj8", 
    "DwHphbs-rfL6DXNli7dqju0j3eru5VeEXVNkltJJgYU"
  );

  let payload = JSON.stringify({
    "notification": {
      "title": "Blackbox Tech",
      "body": "Thanks for subscribing to my channel",
      "icon": "https://yt3.ggpht.com/a-/AAuE7mCxr-4W53FAxBRcKR0iDk_vPCSAmW-QKFGaFA=s88-mo-c-c0xffffffff-rj-k-no"
    }
  });

  Promise.resolve(webpush.sendNotification(sub, payload))
    .then(() => res.status(200).json({
      message: 'Notification sent'
    }))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});


