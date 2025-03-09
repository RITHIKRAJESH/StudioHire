import { Route,Routes } from "react-router-dom"
import HomePage from "./components/homepage"
import Register from "./components/register"
import Login from "./components/login"
import UserDashboard from "./components/user/userDashboard"
import AdminDashboard from "./components/admin/adminDashboard"
// import ClientDashBoard from "./components/client/clientDashBoard"
import 'bootstrap/dist/css/bootstrap.min.css';
import IntruderPage from "./components/admin/IntruderPage"

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/user/*" element={<UserDashboard/>}/>
      <Route path="/adminhome/*" element={<AdminDashboard/>}/>
      <Route path="/intruder" element={<IntruderPage/>}/>
      {/* <Route path="/client/*" element={<ClientDashBoard/>}/> */}
      </Routes>
    </>
  )
}

export default App
