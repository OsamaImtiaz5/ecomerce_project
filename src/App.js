import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Products from "./Components/Products";
import AddProducts from "./Components/AddProducts";
import UpdateProducts from "./Components/UpdateProducts";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";
import SignUP from "./Components/SignUP";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import EmailOtp from "./Components/EmailOtp";
import GetOtp from "./Components/GetOtp";
import ChangePassword from "./Components/ChangePassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav /> {/*placed outside so it dosent depend on Routes  */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Products />}></Route>
            <Route path="/add" element={<AddProducts />}></Route>
            <Route path="/update/:id" element={<UpdateProducts />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            
          </Route>
          {/* 
      Signup route is placed outside the PrivateComponent route, 
      so it is accessible without authentication.
    */}
          <Route path="/signup" element={<SignUP />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/emailotp" element={<EmailOtp/>}></Route>
          <Route path="/getotp" element={<GetOtp/>}></Route>
          <Route path="/changepassword" element={<ChangePassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
