import { useEffect, useState } from 'react';
import imagemIF from '../../assets/institutofederalparana.png';
import './carteirinha.css';

function Carteirinha() {
    const [matricula, setMatricula] = useState('');

    // Função para gerar o QR Code
    function GerarQRCode() {
        setMatricula("20241CAS0030036");
        const GoogleChartAPI = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=';
        const conteudoQRCode = GoogleChartAPI + matricula;

        // Coerção de tipo para indicar que o elemento é um HTMLImageElement
        const qrCodeImage = document.querySelector('#QRCodeImage') as HTMLImageElement;
        if (qrCodeImage) {
            qrCodeImage.src = conteudoQRCode;
        } else {
            console.error('Elemento #QRCodeImage não encontrado.');
        }
    }




    // Chamada da função quando o componente é montado
    useEffect(() => {
        GerarQRCode();
    }, []); // Array vazio indica que a função é chamada apenas uma vez, quando o componente é montado

    return (
        <div className="background-container">
            <div className="mx-5 p-0 px-0 rounded-2 col-sm-12 col-md-6">
                <div className="mb-4">
                    <img id="gif" src={imagemIF} alt="GIF" className="bg-gif" style={{ width: '100%', height: 'auto' }} />

                    <div className="d-flex mb-5 flex-column align-items-start justify-content-between">
                        <p></p>
                        <div>
                            <p className='mb-4 text-dark'>Nome: GABRIEL COSTA DE MORAES</p>
                        </div>
                        <div>
                            <p className='mb-4 text-dark'>Matrícula: {matricula}</p>
                        </div>
                        <div>
                            <p className='mb-4 text-dark'>Curso</p>
                        </div>
                    </div>
                    <div>
                        <img id="QRCodeImage" src="" alt="carteirinha qr code" style={{ width: '80%', height: 'auto' }} />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Carteirinha;
