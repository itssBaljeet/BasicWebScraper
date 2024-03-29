const { app, BrowserWindow, BrowserView, ipcMain } = require('electron/main')
const jsdom = require("jsdom");
const path = require('path');
const fs = require('fs');
const { JSDOM } = jsdom;

// function for creating a window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 405,
    height: 900,
    x: 0,
    y: 0,
    show: false,
    webPreferences: {
        preload: path.join(__dirname, 'app/js/preload.js'),
        nodeIntegration: true
    }
  })
  return win; // Returns browser instance
}

app.whenReady().then(() => {
  let childWindow = createWindow()
  let mainWindow = createWindow()
  let view = new BrowserView()
  childWindow.maximize()
  childWindow.setBrowserView(view)
  view.webContents.loadURL('https://ammoseek.com/')
  view.setBounds({x: 500, y: 0, width: 1500, height: 1440})
  childWindow.loadFile(path.join(__dirname, 'app/child.html'))
  childWindow.webContents.openDevTools()
  childWindow.show()
  mainWindow.loadFile(path.join(__dirname, 'app/controller.html'))
  mainWindow.setAlwaysOnTop(true)
  mainWindow.show()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow.maximize()
        mainWindow.loadFile(path.join(__dirname, 'app/controller.html'))
        mainWindow.show()
        childWindow.webContents.openDevTools()
        childWindow.show()
    }
  })
  
  ipcMain.on('sendURL', (event, url) => {
    view.webContents.loadURL(url);
  })

  ipcMain.on('selectedURL', (event, url) => {
    childWindow.webContents.send('sURL', url);
  })
 
  ipcMain.on('scrape', (event) => {
    view.webContents.executeJavaScript('document.documentElement.outerHTML')
    .then(currentHTML => {
      childWindow.webContents.send('html', currentHTML);
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})