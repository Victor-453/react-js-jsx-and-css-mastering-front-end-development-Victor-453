import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import TvDetail from './pages/TvDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import './index.css';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-900 text-gray-100'>
      <Navbar />
      <main className='flex-1 max-w-7xl mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/tv/:id' element={<TvDetail />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
