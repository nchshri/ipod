const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  if (process.env.NODE_ENV == "development") {
    win.loadURL("http://localhost:3001");
  } else {
    console.log(
      `Development Mode: Loading from localhost = ${process.env.NODE_ENV}`
    );
    win.loadFile(path.join(__dirname, "../index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});