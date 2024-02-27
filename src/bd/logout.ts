import { getAuth, signOut } from 'firebase/auth';
import { limparLocalStorage } from './../bd/localStorage.ts';

// Função para fazer logout do usuário
export async function deslogar(): Promise<void> {
    const auth = getAuth();

    try {
        await signOut(auth);
        //console.log('Usuário desconectado com sucesso.');
        limparLocalStorage();
        window.location.href = "/";
    } catch (error) {
        //console.error('Erro ao fazer logout:', error);
        alert(error);
        throw error;
    }
}
