import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import initialize from '../../firebase.ts'
import {salvarDadosLocalStorage} from './../bd/localStorage.ts';


initialize();

export async function cadastrar(matricula: string, email: string, password: string, confirmPassword: string) {
    const auth = getAuth();
    const userData = await getMatricula(matricula);

    if (userData != null) {
        if (userData.email == "" && userData.idUser == "") {
            if (confirmPassword == password) {
                try {
                    // Chamar a função de criação de usuário do Firebase Authentication
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    //console.log('Novo usuário cadastrado:', userCredential.user?.uid);
                    await setID(matricula, email, userCredential.user.uid);
                    return userCredential.user;
                } catch (error) {
                   alert('Erro ao cadastrar novo usuário:' + error);
                    throw error;
                }
            } else {
                alert("As senhas devem ser iguais");
            }
        } else {
            alert("Conta já cadastrada");
        }

    } else {
        alert("Erro ao buscar dados do usuário:");
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
            throw new Error("Matrícula não encontrada.");
        }
    } catch (error) {
        // Lide com qualquer erro
        console.error("Erro ao obter dados do Firestore:", error);
        throw error;
    }
}

