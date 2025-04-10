import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'


import Menu from './componentes/menu'
import Lista from './componentes/lista'
import Comparador from './componentes/comparador'
import Comprado from './componentes/comprado'
import Usuarios from './componentes/usuarios'
import Productos from './componentes/productos'
import Aleatorio from './componentes/aleatorio'
import Favorito from './componentes/favorito'






function App() {


  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element ={<Lista/>}/>
        <Route path="/usuarios" element ={<Usuarios/>}/>
        <Route path="/favorito" element ={<Favorito/>}/>
        <Route path="/aleatorio" element ={<Aleatorio/>}/>
        <Route path="/comparador" element ={<Comparador/>}/>
        <Route path="/comprados" element ={<Comprado/>}/>
        <Route path="/productos" element ={<Productos/>}/>

      </Routes>
    </Router>
  );
}

export default App
