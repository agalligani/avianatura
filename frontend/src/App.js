import './styles/App.scss';
import { 
    Routes,
    Route
 } from 'react-router-dom';
 import Layout from './components/Layout/Layout';
 import Prefetch from './features/auth/Prefetch'
 import Home from './components/Home/Home';
 import Tours from './features/tours/Tours';
 import Tour from './features/tours/Tour';
 import NewTour from './features/tours/NewTour';
 import ToursByCountry from './features/tours/ToursByCountry';
 import ToursUSList from './features/tours/ToursUSList';
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route element={<Prefetch />}>
            <Route path="tours" >
              <Route index element={<Tours />} />
              <Route path="country" >
                <Route path=":id" element={<ToursByCountry />} />
              </Route>
            </Route>
            <Route path="tour" >
              <Route index element={<Tours />} />
              <Route path=":id" element={<Tour />} />
              <Route path="new" element={<NewTour />} />
            </Route>
            <Route path="toursUS" >
              <Route index element={<ToursUSList countryid={"AD"} />} />
            {/* <Route path=":id" element={<ToursByCountry />} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
