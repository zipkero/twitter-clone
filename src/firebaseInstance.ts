import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.TWITTER_APIKEY,
  authDomain: process.env.TWITTER_AUTHDOMAIN,
  projectId: process.env.TWITTER_PROJECTID,
  storageBucket: process.env.TWITTER_STORAGEBUCKET,
  messagingSenderId: process.env.TWITTER_MESSAGINGSENDERID,
  appId: process.env.TWITTER_APPID,
};

const firebaseApp = initializeApp(firebaseOptions);
export const firebaseAuth = getAuth(firebaseApp);

export interface UserInfo extends User {}

const getProvider = (type: string) => {
  switch (type) {
    case "google":
      return new GoogleAuthProvider();
  }
};

export const authService = {
  createUser: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  },
  signIn: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  },
  signInWithPopup: async (providerName: string) => {
    const provider = getProvider(providerName);
    return await signInWithPopup(firebaseAuth, provider as AuthProvider);
  },
  logout: () => {
    firebaseAuth.signOut();
  },
};

export const firebaseStore = getFirestore(firebaseApp);

export const dbService = {
  add: async (text: string, createAt: Date, createId: string) => {
    const newRef = doc(collection(firebaseStore, "tweets"));

    await setDoc(newRef, {
      text: text,
      createAt: createAt,
      createId: createId,
    });
  },
  update: async (id: string, text: string) => {
    const ref = doc(firebaseStore, `tweets`, id);
    console.log(ref);
    await updateDoc(ref, {
      text: text,
    });
  },
  get: async (): Promise<any[]> => {
    const q = query(collection(firebaseStore, "tweets"));
    const querySnapshot = await getDocs(q);
    const result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  },
  delete: async (id: string): Promise<void> => {
    await deleteDoc(doc(firebaseStore, "tweets", id));
  },
  onSnapshot: (callback: Function) => {
    const q = query(collection(firebaseStore, "tweets"));
    onSnapshot(q, (querySnapshot) => {
      callback(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  },
};
