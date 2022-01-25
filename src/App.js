
import './App.css';
import { Routes, Route, NavLink ,Navigate} from 'react-router-dom'
import Adduser from './components/Adduser'
import Userlist from './components/Userslist'

function App() {


  return (
    <div className="App my-3">
      <nav className="nav justify-content-around">
        <NavLink className="nav-link text-info" to="adduser">Add user</NavLink>
        <NavLink className="nav-link text-info" to="userlist">Userlist</NavLink>
      </nav>

      <Routes>
        <Route path="adduser" element={<Adduser />} />
        <Route path="userlist" element={<Userlist />} />
        <Route path="" element={<Navigate replace to={'adduser'}  />} />
      </Routes>
    </div>
  );
}

export default App;
