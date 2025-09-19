import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import { clearCredentials } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';

import data from './data';
import './navbar.css';
import { RiFacebookBoxFill, RiInstagramFill, RiTwitterFill, RiLinkedinFill, RiGraduationCapFill } from 'react-icons/ri';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  return (
    <nav>
      <div className="container tn__container">
        <a href="/" className="nav__logo">
          <span><RiGraduationCapFill size={32}/></span> B-EDUCAR
        </a>
        <div className="tn__social">
          <a href=""> <RiFacebookBoxFill /> </a>
          <a href=""> <RiInstagramFill /> </a>
          <a href=""> <RiTwitterFill /> </a>
          <a href=""> <RiLinkedinFill /> </a>
        </div>
      </div>
      <div className="container nav__container">
        <ul className="nav__menu">
          {user && user.id && (
            <li key="prof-1"><a href="/welcome">Mi Perfil</a></li>
          )}
          {
            data.map(item => <li key={item.id}><a href={item.link}>{item.title}</a></li>)
          }
        </ul>
        {user && user.id ? (
          <div className="flex">
            <div className="nav__profile">
              <div className="tn__social">
                <a id="account" className="mr-3" href="/account">
                  <FaUser />
                </a>
              </div>
              <span><b className="font-bold">{user.name}</b> <br /> {user.email}</span>
            </div>
            <button onClick={handleLogout} className="nav__btn">Salir</button>
          </div>
        ) : (
          <a href="/login" className="nav__btn">Login</a>
        )}
      </div>
    </nav>
  )
}

export default NavBar;