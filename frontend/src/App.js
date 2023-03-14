import './styles/App.scss';
import { 
    Routes,
    Route
 } from 'react-router-dom';
 import Layout from './components/Layout/Layout';
 import Home from './components/Home/Home';
 import Tours from './features/Tours/Tours';
 import ToursByCountry from './features/Tours/ToursByCountry';
 import ToursUSList from './features/Tours/ToursUSList';
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="tours" >
            <Route index element={<Tours />} />
            <Route path=":id" element={<ToursByCountry />} />
          </Route>
          <Route path="toursUS" >
            <Route index element={<ToursUSList />} />
            {/* <Route path=":id" element={<ToursByCountry />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
