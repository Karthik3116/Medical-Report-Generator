import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import Guest from "./pages/Guest";
import Footer from "./components/Footer";
// import Test from "./components/Test";
// import FileUpload from "./components/FileUpload";
import ScanMri from "./pages/ScanMri";
import Report from "./pages/Report"
import Feedback from "./pages/Feedback";
import Notfound from "./components/Notfound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/guest" element={ <Guest /> } />
        <Route path="/mri" element={ <ScanMri /> } />
        <Route path="/feedback" element={ <Feedback /> } />   
        <Route path="/report" element={ <Report /> } /> 
        <Route path= "*" element={ <Notfound /> } />   
      </Routes>
      <Footer />
    </div>
  );
}

export default App