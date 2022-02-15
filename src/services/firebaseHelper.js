import db from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const  SaveMessageToFirebase = (setSmShow, inputs)=>{
    
  addDoc(collection(db, "message-project"), {
    from_name: inputs.name,
    to_name: inputs.email,
    message: inputs.message,
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