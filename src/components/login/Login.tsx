import { useState } from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import imagemGIF from './../../assets/logogif.gif';
import logoGoogle from './../../assets/google-logo.svg';
import { login } from './../../bd/login.ts';
import { loginWithGoogle } from './../../bd/loginGoogle.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getLoggedUserUID } from './../../bd/getLoggedUserUID.ts';
import {recuperarDadosLocalStorage} from './../../bd/localStorage.ts';


function Login() {
  getLoggedUserUID().then(uid => {
    console.log("login: " + uid);
    console.log(recuperarDadosLocalStorage("matricula"));
    const matriculaLocal = recuperarDadosLocalStorage("matricula");
        if (matriculaLocal !== null && uid != null){
            window.location.href = "/carterinha";
        }
  });

  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleLogin = () => {
    setLoading(true); // Define o estado de carregamento como verdadeiro ao iniciar o processo de login
    if (matricula != "" && email != "" && password != "") {
      login(email, password, matricula)
        .then(() => {
          // Lógica após o login ser bem-sucedido
          setLoading(false); // Define o estado de carregamento como falso ao finalizar o processo de login
        })
        .catch((error: any) => {
          // Lógica para lidar com erros de login
          if (typeof error === 'string') {
            alert(error); // Se o erro for uma string, exibe o erro no alerta
          } else if (typeof error === 'object' && error.error) {
            alert(error.error); // Se o erro for um objeto com uma propriedade 'error', exibe o valor dessa propriedade no alerta
          } else {
            alert(error); // Se o tipo de erro não puder ser determinado, exibe uma mensagem genérica
          }
          setLoading(false); // Define o estado de carregamento como falso ao finalizar o processo de login
        })
        .finally(() => {
          setLoading(false); // Define o estado de carregamento como falso ao finalizar o processo de login
        });
    } else {
      alert("Insira todos os dados");
      setLoading(false); // Define o estado de carregamento como falso ao finalizar o processo de login
    }

  };

  const handleLoginWithGoogle = () => {
    if (matricula != "") {
      loginWithGoogle(matricula)
        .then((result:any) => {
          // Lógica após o login bem-sucedido com o Google
          console.log(result);
        })
        .catch((error:any) => {
          // Lógica para lidar com erros de login com o Google
          console.error('Erro ao fazer login com o Google:', error);
        });
    } else {
      alert("Insira uma matrícula");
    }

  };



  return (
    <div className="background-container">
      <div className="mx-5 p-0 px-0 rounded-2 col-sm-12 col-md-6">
        <div className="mb-4">
          <img id="gif" src={imagemGIF} alt="GIF" className="bg-gif" style={{ width: '50%', height: 'auto' }} />
          <h3>Entrar</h3>
          <p className="mb-4 text-dark">Realize o login para desfrutar dos recursos do MeuIF.</p>
        </div>

        <form action="#" method="post">

          <div className="form-group first">
            <label htmlFor="username">Matrícula</label>
            <input type="text" className="form-control transparent-input" placeholder="1234567890" id="matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
            <div id="avisoEmail" style={{ display: 'none', color: 'red' }}>matrícula inválida</div>
          </div>

          <div className="form-group first">
            <label htmlFor="username">Email</label>
            <input type="text" className="form-control transparent-input" placeholder="seu@email.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div id="avisoEmail" style={{ display: 'none', color: 'red' }}>Email inválido</div>
          </div>

          <div className="form-group last mb-3">
            <label htmlFor="password">Senha</label>
            <input type="password" className="form-control transparent-input" placeholder="senha" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div id="avisoPassword" style={{ display: 'none', color: 'red' }}>Senha inválida</div>
          </div>

          <div className="d-flex mb-5 align-items-center justify-content-between">
            <label className="control control--checkbox mb-0">
              <span className="caption">Lembre-me</span>
              <input type="checkbox" defaultChecked />
              <div className="control__indicator"></div>
            </label>
            <span><a href="#" className="forgot-pass">Esqueci minha senha</a></span>
          </div>


          <button type="button" className="btn btn-block btn-primary" onClick={handleLogin} disabled={loading}>
            {loading && <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />}
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          <span className="d-block text-center my-4 text-muted">&mdash; ou &mdash;</span>

          <div className="social-login">

            <a href="#" className="google btn d-flex justify-content-center align-items-center" onClick={handleLoginWithGoogle}>
              <img src={logoGoogle} alt="Google Icon" className="mr-3" /> Continuar com Google
            </a>

            <a href="/Cadastro" className="d-block text-center my-4 text-muted">Não possui conta? Cadastre-se</a>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;

