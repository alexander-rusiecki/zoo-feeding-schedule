import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimalList from 'components/AnimalList';
import AnimalDetails from 'components/AnimalDetails';
import NotFound from 'components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/:id" element={<AnimalDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
