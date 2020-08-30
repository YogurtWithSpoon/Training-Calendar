import * as firebase from "firebase/app";
import firebaseConfig from "./config";
import "firebase/database";
firebase.initializeApp(firebaseConfig);


var database = firebase.database();

export async function writeClient(id,name){
  return database.ref('/clients').update(
    {[id] : name}
  );
}

export async function writeTrain(date,day,time,type,clientid){
  return database.ref(`/trains/${date}/${day}/${time}`).update({
    "clientid": clientid,
    "type": type
  });
}

export async function deleteTrain(date,day,time){
  return database.ref(`/trains/${date}/${day}/${time}`).remove();
}

export async function deleteClient(id){
  return database.ref(`/clients/${id}`).remove();
}


export async function readClients(){
  const snapshot = await database.ref('/clients').once('value');
  return snapshot.val();
}

export async function readTrains(date){
  const snapshot = await database.ref('/trains/' + date).once('value');
  return snapshot.val();
}
