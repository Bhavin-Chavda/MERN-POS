// import logo from './logo.svg';
import React from 'react';
import 'antd/dist/antd.min.css';
// import { Button } from 'antd';
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Customers from './pages/Customers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path='/items' element={<ProtectedRoute><Items/></ProtectedRoute>}/>
          <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
          <Route path='/bills' element={<ProtectedRoute><Bills/></ProtectedRoute>}/>
          <Route path='/customers' element={<ProtectedRoute><Customers/></ProtectedRoute>}/>
          <Route path='/register' element={<Register></Register>}/>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/' element={<Login></Login>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;


export function ProtectedRoute({children}){
  if(localStorage.getItem('Pos-User'))
  {
    return children
  }
  else{
    return <Navigate to ="/login"/>
  }


}