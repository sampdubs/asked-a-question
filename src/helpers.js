import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, getDoc, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "asked-a-question.firebaseapp.com",
    projectId: "asked-a-question",
    storageBucket: "asked-a-question.appspot.com",
    messagingSenderId: "862947256830",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-5NV7WJWTMV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, 'class');

export async function generateNameOptions() {
    const students = await getDocs(col);
    return students.docs.map(doc => ({ value: doc.id, label: doc.id }));
}

export async function logQuestion(student) {
    const studentDoc = doc(db, 'class', student.value);
    const docSnap = await getDoc(studentDoc);
    console.log(docSnap);
    setDoc(studentDoc, { questions: docSnap.data().questions + 1 })
}

export async function getStudentData() {
    const students = await getDocs(col);
    return students.docs
        .map(doc => ({ student: doc.id, questions: doc.data().questions }))
        .sort((a, b)=> a.student.localeCompare(b.student));
}