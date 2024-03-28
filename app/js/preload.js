const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'myAPI', {
    send: (channel, data) => ipcRenderer.send(channel, data)
  }
);