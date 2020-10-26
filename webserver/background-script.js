// background-script.js

let portFromCS;
var sentip;

function resolved(record) {
  console.log(record.addresses);
  portFromCS.postMessage({resolvedad: record.addresses});
}

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener(function(m) {
    //console.log("In background script, received message from content script");
    //console.log(m.hostname);
    sentip = m.hostname;
    //portFromCS.postMessage({sentip: sentip});

    let resolving = browser.dns.resolve(sentip);
	   resolving.then(resolved);
    
    portFromCS.postMessage({resolvedad: sentip});
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  //portFromCS.postMessage({greeting: "they clicked the button!"});
});