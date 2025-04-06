const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const fileType = require('file-type');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 允许渲染进程访问 Node.js
    },
  });

  win.loadFile('index.html');
  Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
  ipcMain.handle('get_afp', async () => await get_afp())
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

async function get_afp() {
  let args = process.argv.slice(1);
  if (args && args.length > 0) {
    const filePath = args[0];
    if (fs.existsSync(filePath)) {
      let stream = fs.createReadStream(filePath);
      let type = await fileType.fromStream(stream);
      if (type && type.mime.startsWith('image/'))
        return filePath
    }
  }

  return null
}