import firebase from "firebase/app";
import { auth, fsdb } from "./firebase";

import { initiateAnon } from "./apiHelpers";
import type { ISettings } from "../redux/reducers/settings";
import type {
  ISignUpCreds,
  ISignInCreds,
  IUpdate,
  IData,
} from "../types/types";

export const authApi = {
  signUpAnon(): Promise<string> {
    return auth
      .signInAnonymously()
      .then((anon) => {
        if (!anon.user) {
          throw "Failed";
        }

        const initial = initiateAnon(anon.user.uid);

        fsdb.collection("users").doc(anon.user.uid).set(initial);

        return anon.user.uid;
      })
      .catch((e) => `Code: ${e.code}, message ${e.message}`);
  },

  signUp(creds: ISignUpCreds): Promise<firebase.User | string | null> {
    const { email, password, displayName } = creds;

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    if (!auth.currentUser) {
      return new Promise((resolve) =>
        resolve("Something went wrong, try reload page")
      );
    }

    return auth.currentUser
      .linkWithCredential(credential)
      .then((linked) => {
        fsdb
          .collection("users")
          .doc(linked.user?.uid)
          .update({ displayName, email });

        auth.currentUser?.updateProfile({ displayName });
        return auth.signInWithCredential(linked.credential!);
      })
      .then((signed) => signed.user)
      .catch((e) => `Code: ${e.code}, message ${e.message}`);
  },

  signIn(creds: ISignInCreds): Promise<firebase.User | string | null> {
    return auth
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((responce) => responce.user)
      .catch((e) => `Code: ${e.code}, message ${e.message}`);
  },

  logoOut(): Promise<string> {
    return auth
      .signOut()
      .then(() => "Signout successful")
      .catch((e) => `Code: ${e.code}, message ${e.message}`);
  },

  passwordReset(email: string): Promise<string> {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => `Password Reset Email sent to ${email}`)
      .catch(() => "Something went wrong, try reload page");
  },

  // deleteAnonymousUser() {
  //   auth.currentUser?.delete();
  // },
};

export const pagesApi = {
  getData(
    userID: string
  ): Promise<firebase.firestore.DocumentData | string | undefined> {
    return fsdb
      .collection("users")
      .doc(userID)
      .get()
      .then((doc) => doc.data())
      .catch(() => "Something went wrong, try reload page");
  },

  updateData(data: IUpdate): Promise<string> {
    return fsdb
      .collection("users")
      .doc(data.uid)
      .update({ pages: data.tabs })
      .then(() => "Update successful!")
      .catch(() => "Something went wrong, try reload page");
  },
};

export const settingsApi = {
  updateSettings(userID: string, settings: ISettings): Promise<string> {
    return fsdb
      .collection("users")
      .doc(userID)
      .update({ settings: settings })
      .then(() => "Update successful!")
      .catch(() => "Something went wrong, try reload page");
  },
};

interface LocalStorageAPI {
  setSettings: (object: ISettings) => void;
  getSettings: () => ISettings | null;
  setBookmarks: (object: IData[]) => void;
  getBookmarks: () => IData[] | null;
  clear: () => void;
}

export const localStorageApi: LocalStorageAPI = {
  setSettings: (object) =>
    localStorage.setItem("settings", JSON.stringify(object)),

  getSettings: () => {
    const localSettings = localStorage.getItem("settings");
    if (!!localSettings) return JSON.parse(localSettings);
    return null;
  },

  setBookmarks: (object) =>
    localStorage.setItem("bookmarks", JSON.stringify(object)),

  getBookmarks: () => {
    const localBookmarks = localStorage.getItem("bookmarks");
    if (!!localBookmarks) return JSON.parse(localBookmarks);
    return null;
  },

  clear: () => localStorage.clear(),
};
