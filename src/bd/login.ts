import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import initialize from '../../firebase.ts'

const app = initialize();

export async function login(email: string, password: string, matricula: string): Promise<UserCredential | { error: string }> {
  const auth = getAuth();

  try {
    const userData = await getMatricula(matricula);
    // usuário existe
    //console.log("Dados do usuário:", userData);

    if (userData.email === email) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            const user = userCredential.user;
            //console.log(user);
            resolve(userCredential); // Resolve a promise com o objeto do usuário após o login bem-sucedido
          })
          .catch((error: any) => {
            reject(error); // Rejeita a promise com o erro em caso de falha no login
          });
      });
    } else {
      // E-mail incorreto do login da matrícula
      alert("O e-mail fornecido não corresponde ao e-mail associado à matrícula.");
      return { error: 'O e-mail fornecido não corresponde ao e-mail associado à matrícula.' };
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
      throw new Error("Matrícula não encontrada.");
    }
  } catch (error) {
    // Lide com qualquer erro
    console.error("Erro ao obter dados do Firestore:", error);
    throw error;
  }
}


export function getErrorMessage(error: any): string {
  switch (error.code) {
    case "auth/user-not-found":
      return "Usuário não encontrado";
    case "auth/wrong-password":
      return "Senha incorreta";
    case "auth/invalid-email":
      return "Endereço de e-mail inválido";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde";
    case "auth/network-request-failed":
      return "Falha na conexão de rede. Verifique sua conexão com a Internet";
    default:
      return error.message;
  }
}
