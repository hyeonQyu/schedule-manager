// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import env from './env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_ID,
    appId: env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseService = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export default firebaseService;

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * DB 관련 샘플 코드
 */
const sampleCode = async () => {
    // 'users' collection 에 데이터 추가
    const docRef = await dbService.collection('users').add({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
    });

    // 'users' collection의 데이터 가져오기
    const { docs } = await dbService.collection('users').get();
    console.log(
        docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })),
    );

    // 'users' collection의 특정 데이터 가져오기, where문은 중첩 사용 가능
    (async () => {
        const { docs } = await dbService.collection('users').where('id', '==', 'me').get();
    })()

    // 'users' collection 의 데이터 변경 실시간 감지
    dbService.collection('users').onSnapshot((snapshot) => {
        console.log(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })),
        );
    });

    const doc = { id: 'document id' };
    // 'users' collection 의 특정 id 값을 가진 document 삭제
    await dbService.doc(`users/${doc.id}`).delete();

    // 'users' collection 의 특정 id 값을 가진 document 수정
    await dbService.doc(`users/${doc.id}`).update({
        first: 'First',
        last: 'Last',
        born: 1800,
    });
};
