import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express, {
  Express,
  Response,
  NextFunction,
} from 'express';

// Defined Routes
const IndexRoute = require('./routes/index');
const betaRoute = require('./routes/index.beta');
const adminRoute = require('./routes/index.admin');

// Import middlewares
//import saveApiLogs from "./middleware/saveLogs";

// Create Express app
const app: Express = express();

// Middleware
//app.use(saveApiLogs);

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/beta", betaRoute);
app.use("/admin", adminRoute);
app.use(IndexRoute);

// 404 Error handler
app.use((
    next: NextFunction
) => {
    const error = new Error('Not Found');
    next(error);
});
  
// 500 Error handler
app.use((
    err: any, 
    res: Response, 
) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    });
});

export default app;
