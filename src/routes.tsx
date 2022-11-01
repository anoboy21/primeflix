import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home/Home";
import Filme from './pages/Filme/Filme';
import Error from './pages/Error/Error'
import Favoritos from './pages/Favoritos/Favoritos';
import Header from './components/Header';


function RoutesApp() {
    return (
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Filme />} />
                <Route path='/favoritos' element={<Favoritos />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;