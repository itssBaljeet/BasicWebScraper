const { app, BrowserWindow, BrowserView } = require('electron/main')
const path = require('path');

// function for creating a window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 600,
    show: false,
  })
  return win; // Returns browser instance
}

app.whenReady().then(() => {
  let mainWindow = createWindow()
  let childWindow = createWindow()
  let view = new BrowserView()
  let mirrorView = BrowserView()
  mainWindow.maximize()
  mainWindow.loadFile(path.join(__dirname, 'app/index.html'))
  mainWindow.webContents.openDevTools()
  mainWindow.setBrowserView(mirrorView)
  mirrorView.webContents.loadURL('https://ammoseek.com/')
  mirrorView.setBounds({x: 500, y: 0, width: 1500, height: 1440})
  mainWindow.show()
  childWindow.webContents.openDevTools()
  childWindow.setBrowserView(view)
  view.webContents.loadURL('https://ammoseek.com/')
  view.setBounds({x: 0, y: 0, width: 800, height: 600})
  childWindow.show()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow.maximize()
        mainWindow.loadFile(path.join(__dirname, 'app/index.html'))
        mainWindow.webContents.openDevTools()
        mainWindow.show()
        childWindow.webContents.openDevTools()
        childWindow.show()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})