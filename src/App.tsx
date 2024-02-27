
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaLogin from './components/login/Login';
import TelaCadastro from './components/Cadastro';
import TelaCarteirinha from './components/carteirinha/carteirinha';



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<TelaLogin />}/>
        <Route path='/Cadastro' element={<TelaCadastro />}/>
        <Route path='/carterinha' element={<TelaCarteirinha />}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;

