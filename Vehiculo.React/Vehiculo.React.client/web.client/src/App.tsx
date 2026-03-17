import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VehiculosPage } from './presentation/pages/VehiculosPage';
import { CreateVehiculoPage } from './presentation/pages/CreateVehiculoPage';
import { DetailVehiculoPage } from './presentation/pages/DetailVehiculoPage';
import { EditVehiculoPage } from './presentation/pages/EditVehiculoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehiculosPage />} />
        <Route path="/crear" element={<CreateVehiculoPage />} />
        <Route path="/detalle/:id" element={<DetailVehiculoPage />} />
        <Route path="/editar/:id" element={<EditVehiculoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;