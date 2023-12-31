//@ts-check
import flash from "connect-flash";
import MongoStore from 'connect-mongo';
import crypto from 'crypto';
import "dotenv/config";
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from "path";
import { iniPassport } from './config/passport.config.js';
import { apiRouter } from "./routes/api.routes.js";
import { authRouter } from './routes/auth.router.js';
import { ChatRouter } from './routes/chat.router.js';
import { viewRouter } from './routes/view.routes.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';


const app = express();
const port = 8081;
const secreto = crypto.randomBytes(64).toString('hex');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

const httpServer = app.listen(port, () => {
    console.log("example app listen port " + "http://localhost:" + port + "/api/products");
});

// Conexión a mongo 
connectMongo();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Engine handlerbars 
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


// Configuración de la sesión.
app.use(
    session({
        store: MongoStore.create({ mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@comerce.nbjkdia.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`}),
        secret: secreto,
        resave: false,
        saveUninitialized: false,
        ttl: 800000,
    })
);


//Passport
iniPassport();
app.use(passport.initialize()); // Inicializa passport
app.use(passport.session()); // Enlaza passport con la sesion
app.use(flash());


// Routes
app.use("/", viewRouter);
app.use("/api", apiRouter);
app.use("/chat", ChatRouter);
app.use('/auth', authRouter);

// Websockets
connectSocket(httpServer);