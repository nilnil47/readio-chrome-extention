// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD1sLngjyesF7P9X680xCa5pcWRBFN6Gmo",
    authDomain: "readio-7d378.firebaseapp.com",
    projectId: "readio-7d378",
    storageBucket: "readio-7d378.appspot.com",
    messagingSenderId: "617401816212",
    appId: "1:617401816212:web:f33eca0d35a7cc2eae1081",
    measurementId: "G-S4J6M5F4TC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


console.log(firebase);

var db = firebase.firestore();

/*
var db = firebase.firestore();

db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
*/

chrome.runtime.onMessage.addListener((msg, sender, resp) => {

  if(msg.command == "post"){
    db.collection("pages").doc("test-doc").set({
        data: msg.data
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  if(msg.command == "fetch"){
    var docRef = db.collection("cities").doc("LA");
    docRef.get().then(function(doc) {
        if (doc.exists) {
          //doc.data()
          resp({type: "result", status: "success", data: doc.data(), request: msg});
        } else {
            //No such document!
            resp({type: "result", status: "error", data: 'No such document!', request: msg});
        }
    }).catch(function(error) {
      //Error getting document:",error
      resp({type: "result", status: "error", data: error, request: msg});
    });
  }

  //submit  data..
  if(msg.command == "post"){
   //...
  }

  return true;


})
