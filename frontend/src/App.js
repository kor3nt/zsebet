import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages';
import SigninPage from './Pages/signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
