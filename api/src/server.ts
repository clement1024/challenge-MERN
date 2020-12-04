import express, {Router} from "express";
import { createConnection } from 'typeorm';
import withJson from 'express-with-json'
import path from 'path';
import glob from 'glob';
import "reflect-metadata";
import bodyParser from 'body-parser';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

const port = process.env.NODE_PORT || 4848;
const db_user = process.env.MYSQL_USER || 'root';
const db_password = process.env.MYSQL_ROOT_PASSWORD ||'';
const db_dbname = process.env.MYSQL_DATABASE || 'adfoodio';

function findAllControllers() {
  return glob
    .sync(path.join(__dirname, 'controllers/*'), { absolute: true })
    .map(controllerPath => require(controllerPath).default)
    .filter(applyController => applyController);
 }
 
 function errorHandler(error: any, req: any, res: any, next: any) {
  if (!error) {
    return next();
  }
 
 
  if (error) {
    res.status(500);
    res.json({ error: error.message });
  }
  console.error(error);
 }
 
 export function entityNotFoundErrorHandler(error: any, req: any, res: any, next: any) {
  if (!(error instanceof EntityNotFoundError)) {
    return next(error);
  }
 
  res.status(401);
  res.json({ error: 'Not Found' });
 }
 

export async function run () {
  await createConnection();
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  const router = Router();

  findAllControllers().map(applyController => applyController(app));
  app.use(entityNotFoundErrorHandler);
  app.use(errorHandler);

  app.get("/", function(_, res) {
    res.type('text/plain').send("Food can be served");
  });

    // add mysql connection configuration
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    host : 'localhost',
    user : db_user,
    password : db_password,
    database : db_dbname
    });

    connection.connect((err: any) => {
      if (err) throw err;
      console.log("Connected!");
    });

    app.get('/load',function(req,res){

      connection.query("select * from food",
      function(err: any ,rows:any ,fields: any){
      if(err) throw err;
      res.end(JSON.stringify(rows));
      });
    });
      
    // add mysql db fetch data
    
  app.listen(port, function () {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
  return app;

}

if(process.env.NODE_ENV !== 'testing') {
  run();
}
