import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, getDoc, collection, doc, setDoc, deleteDoc } from "firebase/firestore";

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

export async function logQuestion(student, timestamp) {
    const studentDoc = doc(db, 'class', student.value);
    const docSnap = await getDoc(studentDoc);
    const questions = docSnap.data().questions;
    questions.push(timestamp);
    setDoc(studentDoc, { questions });
}

export async function getStudentData() {
    const students = await getDocs(col);
    return students.docs
        .map(doc => ({ student: doc.id, questions: doc.data().questions }))
        .sort((a, b) => a.student.localeCompare(b.student));
}

async function deleteAllStudents() {
    const students = await getDocs(col);
    students.docs.forEach((student) => {
        deleteDoc(student.ref);
    });
}

export async function setStudentData(data) {
    await deleteAllStudents();
    data = data.replaceAll("\r", "\n");
    data = data.replaceAll("\n\n", "\n");
    const names = data.split("\n");
    for (let name of names) {
        if (name.trim()) {
            const studentDoc = doc(db, 'class', name);
            setDoc(studentDoc, { questions: [] });
        }
    }
}

export function dateToString(date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date.toISOString().split('T')[0];
}

export function timestampToDate(timestamp) {
    let date = new Date(timestamp);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() + (offset * 60 * 1000));
    return date.toLocaleDateString("en-us");
}