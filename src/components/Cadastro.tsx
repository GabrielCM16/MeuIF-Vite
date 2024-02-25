import { useState } from 'react';
import imagemGIF from '../assets/logogif.gif';
import logoGoogle from '../assets/google-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { cadastrar } from '../bd/cadastro.ts';
import { CadastroWithGoogle } from '../bd/cadastroWithGoogle.ts';
import './Cadastro.css';

function Cadastro() {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleCadastro = () => {
    setLoading(true); // Define o estado de carregamento como verdadeiro ao iniciar o processo de login
    if (matricula != "" && email != "" && password != "" && ConfirmPassword != "") {
      cadastrar(matricula, email, password, ConfirmPassword)
        .then(() => {

          //console.log('uid ', user?.uid);
          setLoading(false); // Define o estado de carregamento como verdadeiro ao iniciar o processo de login

        })
        .catch((error) => {
          // Tratamento de erro
          console.error('Erro ao cadastrar usuário:', error);
          setLoading(false); // Define o estado de carregamento como verdadeiro ao iniciar o processo de login
        });
    } else {
      alert("Preencha todos os campos");
      setLoading(false);
    }

  }

  const handleCadastroWithGoogle = () => {
    setLoading(true); // Define o estado de carregamento como verdadeiro ao iniciar o processo de login
    if (matricula != "") {
      CadastroWithGoogle(matricula)
        .then((response) => {
          console.log("Login com Google realizado com sucesso:", response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao fazer login com Google:", error);
          setLoading(false);
        });
    } else {
      alert("Insira uma matrícula");
      setLoading(false);
    }
  }

  return (
    <div className="background-container">
      <div className="mx-5 p-0 px-0 rounded-2 col-sm-12 col-md-6">
        <div className="mb-4">
          <img id="gif" src={imagemGIF} alt="GIF" className="bg-gif" style={{ width: '50%', height: 'auto' }} />
          <h3>Cadastre-se</h3>
          <p className="mb-4 text-dark">Realize o cadastro para desfrutar dos recursos do MeuIF.</p>
        </div>

        <form action="#" method="post">

          <div className="form-group first">
            <label htmlFor="username">Matrícula</label>
            <input type="text" className="form-control transparent-input" placeholder="1234567890" id="matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />

          </div>

          <div className="form-group first">
            <label htmlFor="username">Email</label>
            <input type="text" className="form-control transparent-input" placeholder="seu@email.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group last mb-3">
            <label htmlFor="password">Senha</label>
            <input type="password" className="form-control transparent-input" placeholder="senha" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group last mb-3">
            <label htmlFor="password">Confirme sua senha</label>
            <input type="password" className="form-control transparent-input" placeholder="Confirme sua senha" id="Confirmpassword" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="d-flex mb-5 align-items-center justify-content-between">

          </div>


          <button type="button" className="btn btn-block btn-primary" onClick={handleCadastro} disabled={loading}>
            {loading && <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />}
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
          <span className="d-block text-center my-4 text-muted">&mdash; ou &mdash;</span>

          <div className="social-login">

            <a href="#" className="google btn d-flex justify-content-center align-items-center" onClick={handleCadastroWithGoogle}>
              <img src={logoGoogle} alt="Google Icon" className="mr-3" /> Continuar com Google
            </a>

          </div>

        </form>
      </div>
    </div>

  );
}

export default Cadastro;
