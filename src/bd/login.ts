import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import initialize from '../../firebase.ts'

initialize();

export function login(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
          const user = userCredential.user;
          console.log(user);
          resolve(userCredential); // Resolve a promise com o objeto do usuário após o login bem-sucedido
        })
        .catch((error: any) => {
          reject(error); // Rejeita a promise com o erro em caso de falha no login
        });
    });
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
