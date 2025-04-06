const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('procs', {
  get_afp: () => ipcRenderer.invoke('get_afp')
})