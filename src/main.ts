import express, { Application } from "express";

const lb = require("@google-cloud/logging-bunyan");

async function startServer() {
  const { logger, mw } = await lb.express.middleware({
    logName: process.env.GOOGLE_SERVICE_LOGGER_NAME,
    projectId: process.env.GOOGLE_FIREBASE_ID_PROYECT,
    //keyfilename: if you has one set file path
  });
  const app: Application = express();
  const port = process.env.PORT || 8080;

  app.use(mw);
  app.use(async (req, resn, next) => {
    req.id = Date.now().toString();
    next();
  });
  app.use(express.json());
  app.get("/", async (req, res) => {
    req.log.info("this is an info log message");
    return res.send("hello world");
  });

  app.get("/shutdown", async (req, res) => {
    req.log.info({
      server: "close the server",
      port: "close ewqwq",
    });
    server.close();
    return res.sendStatus(200);
  });

  app.get("/test", async (req, res) => {
    try {
      const result = {
        message: "Request processed successfully",
        data: req.body,
      };
      console.log("info");

      await logger.info({ reqId: req.id, responseBody: result });
      res.send("tes OJ");
    } catch (error) {
      res.status(500).send("Error");
    }
  });

  const server = app.listen(port, () => {
    console.log(`http server listening on port ${port}`);
  });
}

startServer();
