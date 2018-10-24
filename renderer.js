// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Promise = require('bluebird');

const doARun = () => new Promise((resolve) => {
  const startTime = Date.now();
  const webview = document.createElement('webview');
  webview.setAttribute('src', 'https://google.com')

  const webview2 = document.createElement('webview');
  webview2.setAttribute('src', 'https://google.com')
  document.body.appendChild(webview2);

  const webview3 = document.createElement('webview');
  webview3.setAttribute('src', 'https://google.com')
  document.body.appendChild(webview3);

  webview.addEventListener('dom-ready', () => {
    resolve(Date.now() - startTime);
    webview.remove();
    webview2.remove();
    webview3.remove();
  })
  document.body.appendChild(webview);
})

const displayResults = (results) => {
  const p = document.createElement(p).appendChild(createTextNode(JSON.stringify(results)));
  document.appendChild(p)
}

setTimeout(() => {
  Promise.mapSeries(
    new Array(10),
    // place a delay between runs
    () => Promise.delay(4000).then(() => doARun())
  ).then(res => document.write(JSON.stringify(res)));
}, 4000)