import { useEffect, useState } from 'react';
import imagemIF from '../../assets/institutofederalparana.png';
import './carteirinha.css';
import { recuperarDadosLocalStorage, salvarDadosLocalStorage } from './../../bd/localStorage.ts';
import { deslogar } from './../../bd/logout.ts';
import { getDados } from './../../bd/getDados.ts';

async function logout() {
    try {
        await deslogar();
    } catch (error) {
        // Lidar com o erro, se necessário
        alert(error);
    }
}


function Carteirinha() {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [turma, setTurma] = useState('');

    const gif_loader_src:string = "https://i.gifer.com/ZKZg.gif"; 


    // Função para gerar o QR Code
    async function GerarQRCode() {
        const matriculaLocal = recuperarDadosLocalStorage("matricula");
        if (matriculaLocal != null) {
            setMatricula(matriculaLocal);
            mostrarDados();
                        
            // Coerção de tipo para indicar que o elemento é um HTMLImageElement
            const qrCodeImage = document.querySelector('#QRCodeImage') as HTMLImageElement;
            qrCodeImage.src = gif_loader_src;
            qrCodeImage.width = 70;

            const GoogleChartAPI = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=';
            const conteudoQRCode = GoogleChartAPI + matriculaLocal;

            if (qrCodeImage) {
                qrCodeImage.src = conteudoQRCode;
                qrCodeImage.width = 300;

            } else {
                console.error('Elemento #QRCodeImage não encontrado.');
            }


        } else {
            console.error('Matrícula não encontrada no localStorage.');
            () => logout();
        }
    }

    async function mostrarDados() {
        const nomeLocal = recuperarDadosLocalStorage("nome");
        const turmaLocal = recuperarDadosLocalStorage("turma");
        if (nomeLocal != null && turmaLocal != null && matricula != null) {
            setNome(nomeLocal);
            setTurma(turmaLocal);
        } else {
            try {
                const matriculaLocal = recuperarDadosLocalStorage("matricula");
                if (matriculaLocal != null) {
                    const dados = await getDados(matriculaLocal);
                    salvarDadosLocalStorage("nome", dados.nome);
                    salvarDadosLocalStorage("turma", dados.turma);
                    setTurma(dados.turma);
                    setNome(dados.nome);
                    //console.log("Dados obtidos com sucesso:", dados);
                    // Faça o que desejar com os dados obtidos
                } else {
                    () => logout();
                }

            } catch (error) {
                //console.error("Erro ao obter dados:", error);
                () => logout();
                alert(error)
                // Lide com o erro conforme necessário
            }
        }
    }

    // Chamada da função quando o componente é montado
    useEffect(() => {
        GerarQRCode();
    }, []); // Array vazio indica que a função é chamada apenas uma vez, quando o componente é montado

    return (
        <div className="background-container">
            <div className="m-0 p-0 px-0 rounded-2">
                <div className="mb-4">
                    <img id="gif" src={imagemIF} alt="GIF" className="bg-gif" style={{ width: '100%', height: 'auto' }} />
                    
                    {/* <img id="gif" src={gif_loader_src} alt="GIF" className="bg-gif" style={{ width: '30%', height: 'auto' }} /> */}

                    <div className="d-flex mb-5 flex-column align-items-start justify-content-between">
                        <p></p>
                        <div>
                            <p className='mb-4 text-dark'>Nome: {nome}</p>
                        </div>
                        <div>
                            <p className='mb-4 text-dark'>Matrícula: {matricula}</p>
                        </div>
                        <div>
                            <p className='mb-4 text-dark'>Curso: {turma}</p>
                        </div>
                    </div>
                    <div>
                        <img id="QRCodeImage" src="" alt="carteirinha qr code" style={{ height: 'auto' }} />
                    </div>
                    <div className='mt-5 '>
                        <button type="button" className="btn btn-block p-2 px-5" style={{ backgroundColor: '#5DC1B9' }} onClick={() => logout()}>Sair</button>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Carteirinha;
