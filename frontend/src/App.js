import './styles/App.scss';
import { 
    BrowserRouter as Router,
    Routes,
    Route
 } from 'react-router-dom';
 import Layout from './components/Layout/Layout';
 import Home from './components/Home/Home';
 import Tours from './features/Tours/Tours';
 import ToursByCountry from './features/Tours/ToursByCountry';
 
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="tours" >
            <Route index element={<Tours />} />
            <Route path=":id" element={<ToursByCountry />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
