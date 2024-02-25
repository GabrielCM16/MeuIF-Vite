import { getAuth, GoogleAuthProvider, signInWithPopup, AuthError, UserCredential } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import initialize from '../../firebase.ts';

initialize();

export async function loginWithGoogle(matricula: string): Promise<{ token: string, user: UserCredential['user'] }> {
  const auth = getAuth();

  try {
    const userData = await getMatricula(matricula);
    // usuário existe
    //console.log("Dados do usuário:", userData);

    if (userData != null) {
      return new Promise((resolve, reject) => {
        signInWithPopup(auth, new GoogleAuthProvider())
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)!;
            const token = credential.accessToken!;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            //console.log("mail " + user.email);
            if (user.email == userData.email) {
              resolve({ token, user });
            } else {
              alert("O e-mail fornecido não corresponde ao e-mail associado à matrícula.");
              throw new Error("O e-mail fornecido não corresponde ao e-mail associado à matrícula.");
            }

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
    } else {
      throw new Error("Matrícula não encontrada.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function getMatricula(matricula: string) {
  try {
    // Obtenha uma referência para o Firestore
    const db = getFirestore();

    // Construa a referência para o documento desejado
    const documentRef = doc(db, "Usuarios", "Alunos", matricula, "id");

    // Obtenha o documento
    const documentSnapshot = await getDoc(documentRef);

    // Verifique se o documento existe
    if (documentSnapshot.exists()) {
      // Retorne os dados do documento
      return documentSnapshot.data();
    } else {
      alert("Matrícula não encontrada.");
      throw new Error("Matrícula não encontrada.");
    }
  } catch (error) {
    // Lide com qualquer erro
    console.error("Erro ao obter dados do Firestore:", error);
    throw error;
  }
}
