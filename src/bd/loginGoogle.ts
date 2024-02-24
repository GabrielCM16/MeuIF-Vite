import { getAuth, GoogleAuthProvider, signInWithPopup, AuthError, UserCredential } from "firebase/auth";
import initialize from '../../firebase.ts';

initialize();

export function loginWithGoogle(): Promise<{ token: string, user: UserCredential['user'] }> {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken!;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        resolve({ token, user });
      })
      .catch((error: AuthError) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error)!;
        // ...
        reject(error);
      });
  });
}
