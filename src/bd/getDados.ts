import { getFirestore, doc, getDoc } from "firebase/firestore";


export async function getDados(matricula: string) {
    try {
      // Obtenha uma referência para o Firestore
      const db = getFirestore();
  
      // Construa a referência para o documento desejado
      const documentRef = doc(db, "Usuarios", "Alunos", matricula, "dados");

  
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
  