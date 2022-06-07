// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getFirestore,
  collection,
  // getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvb67Xhi5zMEVnCbAZIpswjQ_gD3aUC1U",
  authDomain: "washing-machines-f9de6.firebaseapp.com",
  databaseURL: "https://washing-machines-f9de6-default-rtdb.firebaseio.com",
  projectId: "washing-machines-f9de6",
  storageBucket: "washing-machines-f9de6.appspot.com",
  messagingSenderId: "82869910580",
  appId: "1:82869910580:web:1f87db7ee79e3a22005e61",
  measurementId: "G-DH1RGBYP0P",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

// collection ref
const colRef = collection(db, "messages");
// get collection data
function sendDataToFirebase() {
  const phoneNumbers = document.querySelectorAll("#number");
  const names = document.querySelectorAll("#name");
  const sendMessageBtns = document.querySelectorAll("#sendMessage");
  const nameErrMessage = document.querySelectorAll(".err-message-for-name");
  const numberErrMessage = document.querySelectorAll(".err-message-for-number");

  for (let i = 0; i < sendMessageBtns.length; i++) {
    sendMessageBtns[i].addEventListener("click", () => {
      // Checking the input forms they are full or empty

      let eMessName = [];
      let eMessPhone = [];
      if (names[i].value.length <= 2 || phoneNumbers[i].value.length <= 10) {
        if (names[i].value.length <= 2) {
          eMessName.push("Your name have to be more than 2 characters");
        }
        if (
          phoneNumbers[i].value.length <= 10 ||
          phoneNumbers[i].value.length >= 13
        ) {
          eMessPhone.push("Make sure your number is correct");
        }
        if (eMessName.length > 0) {
          nameErrMessage[i].innerText = eMessName.join(", ");
          nameErrMessage[i].style.color = "red";
        }
        if (eMessPhone.length > 0) {
          numberErrMessage[i].innerText = eMessPhone.join(", ");
          numberErrMessage[i].style.color = "red";
        }
      } else {
        // Adding a document to firebase

        addDoc(colRef, {
          name: names[i].value,
          phoneNumber: phoneNumbers[i].value,
        });

        names[i].value = "";
        phoneNumbers[i].value = "";
        numberErrMessage[i].innerText = "";
        nameErrMessage[i].innerText = "";
        const closeModalBtn = document.querySelector(".modal");
        function closeModal() {
          if (closeModalBtn == null) return;
          closeModalBtn.classList.remove("active");
          overlay.classList.remove("active");
        }
        closeModal();

        setTimeout(() => alert("Your number is sent"), 1000);
      }
    });
  }
}
sendDataToFirebase();

// getDocs(colRef)
//   .then((snapshots) => {
//     let messages = [];
//     snapshots.docs.map((doc) => {
//       messages.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(messages);
//   })
//   .catch((e) => {
//     console.log(e.message);
//   });
