import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimalList from 'components/AnimalList';
import AnimalDetails from 'components/AnimalDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/:id" element={<AnimalDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
