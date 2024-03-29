const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'myAPI', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
  },
);

