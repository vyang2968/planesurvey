import logo from './logo.svg';
import {Survey} from './pages'
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Submitted from './pages/submitted/Submitted';
import Search from './pages/search/Search'


function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Survey />} />
          <Route path='/submitted' element={<Submitted />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>

  );
}

export default App;
