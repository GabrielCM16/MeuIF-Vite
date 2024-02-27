import { getAuth, GoogleAuthProvider, signInWithPopup, AuthError, UserCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import initialize from '../../firebase.ts';
import {salvarDadosLocalStorage} from './../bd/localStorage.ts';

initialize();

export async function CadastroWithGoogle(matricula: string): Promise<{ token: string, user: UserCredential['user'] } | null> {
    const auth = getAuth();

    try {
        const userData = await getMatricula(matricula);

        if (userData != null) {
            if (userData.email == "" && userData.idUser == "") {
                return new Promise((resolve, reject) => {
                    signInWithPopup(auth, new GoogleAuthProvider())
                        .then(async (result) => {
                            const credential = GoogleAuthProvider.credentialFromResult(result)!;
                            const token = credential.accessToken!;
                            const user = result.user;

                            if (user.email && user.uid) {
                                await setID(matricula, user.email, user.uid);
                            } else {
                                throw new Error("Dados de email ou id do usuário ausentes.");
                            }

                            resolve({ token, user });
                        })
                        .catch((error: AuthError) => {
                            reject(error);
                        });
                });
            } else {
                alert("Conta já cadastrada");
                return null; // Adicionando retorno para conta já cadastrada
            }
        } else {
            alert("Matrícula não encontrada");
            throw new Error("Matrícula não encontrada");
        }
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        throw error;
    }
}


async function setID(matricula: string, novoEmail: string, newidUser: string) {
    try {
        // Obtenha uma referência para o Firestore
        const db = getFirestore();

        // Construa a referência para o documento desejado
        const documentRef = doc(db, "Usuarios", "Alunos", matricula, "id");

        // Atualize o campo "email" no documento
        await setDoc(documentRef, { email: novoEmail }, { merge: true });
        await setDoc(documentRef, { idUser: newidUser }, { merge: true });
        salvarDadosLocalStorage("matricula", matricula);
        window.location.href = "/carterinha";

        //console.log("Matrícula definida com sucesso:", matricula);
    } catch (error) {
        // Lide com qualquer erro
        console.error("Erro ao definir dados no Firestore:", error);
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
