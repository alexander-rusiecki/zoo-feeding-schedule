import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimalList from 'components/AnimalList';
import AnimalDetails from 'components/AnimalDetails';
import NotFound from 'components/NotFound';

function App() {
  return (
    <section className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="animals/:id" element={<AnimalDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
