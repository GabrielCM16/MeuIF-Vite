import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
//import Cadastro from './components/Cadastro.tsx'
import Carteirinha from './components/carteirinha/carteirinha.tsx'

//<Cadastro/>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Carteirinha/>
  </React.StrictMode>,
)
