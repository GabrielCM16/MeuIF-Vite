// Salvar um dado no localStorage
export function salvarDadosLocalStorage(chave: string, valor: string): void {
    localStorage.setItem(chave, valor);
}

// Recuperar um dado do localStorage
export function recuperarDadosLocalStorage(chave: string): string | null {
    return localStorage.getItem(chave);
}

// Remover um dado do localStorage
//function removerDadosLocalStorage(chave: string): void {
//    localStorage.removeItem(chave);
//}

// Limpar todos os dados do localStorage
export function limparLocalStorage(): void {
    localStorage.clear();
}
