import { FirebaseOptions, initializeApp } from "firebase/app";
import {
    AuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    User,
} from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    StorageReference,
    uploadBytesResumable,
} from "firebase/storage";

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
        return await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
    },
    signIn: async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        return userCredential?.user;
    },
    signInWithPopup: async (providerName: string) => {
        const provider = getProvider(providerName);
        return await signInWithPopup(firebaseAuth, provider as AuthProvider);
    },
    logout: async () => {
        await firebaseAuth.signOut();
    },
    getCurrentUser: (): User | null => {
        return firebaseAuth.currentUser;
    },
    updateProfile: async (newDisplayName: string) => {
        if (!firebaseAuth?.currentUser) {
            return;
        }
        try {
            return await updateProfile(firebaseAuth.currentUser, {
                displayName: newDisplayName,
            });
        } catch (e) {
            console.log(e);
        }
    },
};

export const firebaseStore = getFirestore(firebaseApp);

export const dbService = {
    add: async (
        text: string,
        createAt: Date,
        createId: string,
        url: string | null
    ) => {
        const newRef = doc(collection(firebaseStore, "tweets"));

        await setDoc(newRef, {
            text: text,
            createAt: createAt,
            createId: createId,
            url: url,
        });
    },
    update: async (id: string, text: string) => {
        const ref = doc(firebaseStore, `tweets`, id);
        await updateDoc(ref, {
            text: text,
        });
    },
    set: async (id: string): Promise<any[]> => {
        let q;
        if (id) {
            q = query(
                collection(firebaseStore, "tweets"),
                where("createId", "==", id)
            );
        } else {
            q = query(collection(firebaseStore, "tweets"));
        }

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
        return onSnapshot(q, (querySnapshot) => {
            callback(
                querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                })
            );
        });
    },
};

export const firebaseStorage = getStorage(
    firebaseApp,
    firebaseOptions.storageBucket
);

export const storageService = {
    ref: (path: string): StorageReference => {
        return ref(firebaseStorage, path);
    },
    delete: async (path: string) => {
        const deleteRef = ref(firebaseStorage, path);
        try {
            await deleteObject(deleteRef);
        } catch (e) {
            console.log(e);
        }
    },
    upload: (ref: StorageReference, file: File, callback: Function) => {
        const uploadTask = uploadBytesResumable(ref, file, {
            contentType: "image/jpeg",
        });

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    callback(url);
                });
            }
        );
    },
};
