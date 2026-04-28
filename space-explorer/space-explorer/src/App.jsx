import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import APODGallery from './pages/APODGallery';
import APODDetail from './pages/APODDetail';
import Mars from './pages/Mars';
import NEO from './pages/NEO';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<APODGallery />} />
          <Route path="/apod/:date" element={<APODDetail />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/neo" element={<NEO />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
