// const autoUpdater = require('update-electron-app');
const bodyParser = require("body-parser");
// const dotenv = require('dotenv');
const express = require("express");
const favicon = require("serve-favicon");
const http = require("http");
// const i18n = require('i18n');
const path = require("path");
const session = require("express-session");
const {
  app: electronApp,
  clipboard,
  dialog,
  Menu,
  nativeImage,
  shell,
  Tray,
} = require("electron");

const APP_PORT = process.env.APP_PORT || 10101;

const expressApp = express();
const localServer = http.createServer(expressApp);

const { craeteOrGetEncrpytedPrivateKey } = require("./utils/wallet");

const indexRouteController = require("./routes/indexRoute");
const peersRouteController = require("./routes/peerRoute");
const roomRouteController = require("./routes/roomRoute");
const gossipRouteController = require("./routes/gossipRoute");

expressApp.set("view engine", "pug");
expressApp.set("views", path.join(__dirname, "views"));

expressApp.use(express.static(path.join(__dirname, "public")));
expressApp.use(
  favicon(path.join(__dirname, "public", "img/icons/favicon.ico"))
);
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(
  session({
    secret: "node101", // TODO: change this data/ yoksa oluştur varsa al
    resave: false,
    saveUninitialized: true,
  })
);

expressApp.use("/", indexRouteController);
expressApp.use("/peer", peersRouteController);
expressApp.use("/room", roomRouteController);
expressApp.use("/gossip", gossipRouteController);
expressApp.all("*", (req, res) => {
  return res.redirect("/");
});

const setupTrayMenu = (_) => {
  const image = nativeImage.createFromPath(
    path.join(__dirname, "build/icon.png")
  );
  const tray = Tray(image.resize({ width: 16, height: 16 }));
  const menu = Menu.buildFromTemplate([
    {
      label: "Launch",
      // click: _ => shell.openExternal(`http://localhost:${APP_PORT}/auth?app_key=${AppKey.get()}`)
    },
    {
      label: "About",
      click: (_) =>
        dialog.showMessageBox({
          type: "info",
          message: `node101 | ${electronApp.getVersion()}`,
          icon: image,
        }),
    },
    {
      type: "separator",
    },
    {
      label: "Quit",
      click: (_) => electronApp.quit(),
    },
  ]);

  tray.setContextMenu(menu);
};

if (!electronApp.requestSingleInstanceLock()) electronApp.quit();

electronApp.dock.hide();

electronApp
  .on("ready", (_) => {
    craeteOrGetEncrpytedPrivateKey((err, privateKey) => {
      if (err) console.log(err);

      localServer
        .listen(APP_PORT, (_) => {
          console.log(`Server is on port ${APP_PORT} and is running.`);

          console.log(require('os').networkInterfaces().en0[0].address);

          setupTrayMenu();
        })
        .on("error", (err) => {
          if (err.code == "EADDRINUSE")
            dialog.showMessageBoxSync({
              type: "warning",
              message: `Port ${APP_PORT} is already in use by another application. System restart is recommended.`,
            });
          else
            dialog.showMessageBoxSync({
              type: "error",
              message: `Server could not be started: ${err}`,
            });

          electronApp.quit();
        });
    });
  })
  .on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
  })
  .on("second-instance", (event, commandLine, workingDirectory) => {
    dialog.showErrorBox(
      "Welcome Back",
      `You arrived from: ${commandLine.pop()}`
    );
  });
