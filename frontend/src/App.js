import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/SignUp';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';

function App(){
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className='pages'>
            <Routes>
              <Route path = '/' element={token ? <Navigate to="/home" /> : <Navigate to="/signup" />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/home' element={<Home />} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
