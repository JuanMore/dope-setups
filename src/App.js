
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/UI/Navbar';
import Header from './Components/UI/Header';
import Footer from './Components/UI/Footer';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Categorize from './Pages/Categorize'
import ExploreSetups from './Pages/ExploreSetups';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import './App.css';



function App() {
  // const [isLoading, setIsLoading] = useState(true)
  


  return (
    <>
    <Router>
      <div className="container">
        <Navbar />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/explore-setups' element={<ExploreSetups />} />
            <Route path='/category/:categoryName' element={<Categorize />} />
          <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* private route */}
         <Route path="/profile" element={<PrivateRoute />}>
              {/* Render that private route */}
              <Route path='/profile' element={<Profile />} />
           </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </div>
      </Router>
      {/* Toast container */}
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </>
  );
}

export default App;
