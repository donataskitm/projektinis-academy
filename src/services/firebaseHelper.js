import db from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const  SaveMessageToFirebase = (setSmShow, toSend)=>{
    
  addDoc(collection(db, "message-project"), {
    from_name: toSend.name,
    to_name: toSend.email,
    message: toSend.message,
    created: serverTimestamp()
  })
    .then(() => {

      setSmShow(true);
    })
    .catch((err) => {
      alert(err.message);
    });
};

export const FirebaseHelper = {
  SaveMessageToFirebase
};