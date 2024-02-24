import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import imagemGIF from './assets/logogif.gif';


function App() {
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
            <label htmlFor="username">Email</label>
            <input type="text" className="form-control transparent-input" placeholder="seu@email.com" id="email" />
            <div id="avisoEmail" style={{ display: 'none', color: 'red' }}>Email inválido</div>
          </div>

          <div className="form-group last mb-3">
            <label htmlFor="password">Senha</label>
            <input type="password" className="form-control transparent-input" placeholder="senha" id="password" />
            <div id="avisoPassword" style={{ display: 'none', color: 'red' }}>Senha inválida</div>
          </div>

          <div className="d-flex mb-5 align-items-center">
            <label className="control control--checkbox mb-0"><span className="caption">Lembre-me</span>
              <input type="checkbox" defaultChecked />
              <div className="control__indicator"></div>
            </label>
            <span className="ml-auto"><a href="#" className="forgot-pass">Esqueci minha senha</a></span>
          </div>

          <input type="button" value="Entrar" className="btn btn-block btn-primary" />

          <span className="d-block text-center my-4 text-muted">&mdash; ou &mdash;</span>

          <div className="social-login">

          <a href="#" className="google btn d-flex justify-content-center align-items-center">
            <i className="material-icons mr-3">account_circle</i> Continuar com Google
          </a>

            <a href="./components/Cadastro.tsx" className="d-block text-center my-4 text-muted">Não possui conta? Cadastre-se</a>

          </div>

        </form>
      </div>
    </div>
  );
}

export default App;
