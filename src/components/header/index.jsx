import './style.css'
import Modal from 'react-modal';

import reducer from "../../redux/reducer"

import { logout } from '../../redux/user/slice';

import { FiShoppingCart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Login from '../login';
import Register from '../register';

import { customModalSignIn } from '../login';
import { customModalSignUp } from '../register';
import { customModalCart } from '../cart';

import { useDispatch, useSelector } from 'react-redux';
import Cart from '../cart';
import { Link, redirect } from 'react-router-dom';
import NavBar from '../navbar';
import SignIn from '../signin';
import SignUp from '../signup';
import { width } from '@mui/system';

import logo from '../../assets/logo.png'
import {FaUserCircle} from 'react-icons/fa'


Modal.setAppElement("#root");

const Header = () => {

    const {user} = useSelector(reducer => reducer.userReducer);

    const dispatch = useDispatch();

    // Estado que indica se o modal está aberto. Inicialmente está fechado (False)
    const [modalLoginIsOpen, setLoginIsOpen] = useState(false);
    const [modalRegisterIsOpen, setRegisterIsOpen] = useState(false);
    const [modalCartIsOpen, setCartIsOpen] = useState(false);


    const handleLogout = () => {
        dispatch(logout());
        localStorage.setItem("user", null);
    }

    const openModalLogin = () => {
        setLoginIsOpen(true);
    }

    const closeModalLogin = () => {
        setLoginIsOpen(false);
    }

    const openModalRegister = () => {
        setRegisterIsOpen(true);
    }

    const closeModalRegister = () => {
        setRegisterIsOpen(false);
    }

    const openModalCart = () => {
        if (!user || user === null){
            openModalLogin();
            return;
        }
        setCartIsOpen(true);
    }

    const closeModalCart = () => {
        setCartIsOpen(false);
    }


    return(
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>

            <NavBar />

            {
                
                !user ?
                (
                    <div className="user-menu">
                        <div className="shopping-cart-icon">
                            <FiShoppingCart onClick={openModalCart}/>
                        </div>
                        <div>
                            <button onClick={openModalLogin}>Login</button>
                        </div>

                        <div>
                            <button onClick={openModalRegister}>Register</button>
                        </div>

                        
                    </div>
                )
                :
                (
                    <div className="user-menu">
                        <div className='icon-and-name'>
                            <FaUserCircle />
                            <span>{user.name}</span>
                        </div>

                        <div className="shopping-cart-icon" onClick={openModalCart}>
                            <FiShoppingCart />
                        </div>
                        <div>
                            <button onClick={handleLogout}>Sair</button>
                        </div>
                    </div>
                )
            }
            
            <Modal isOpen={modalCartIsOpen} style={customModalCart} onRequestClose={closeModalCart}>
                <Cart isOpen={modalCartIsOpen} onClose={closeModalCart} />
            </Modal>

            <Modal isOpen={modalLoginIsOpen} style={customModalSignIn} onRequestClose={closeModalLogin}>
                <SignIn isOpen={modalLoginIsOpen} onClose={closeModalLogin} />
            </Modal>

            <Modal isOpen={modalRegisterIsOpen} style={customModalSignUp} onRequestClose={closeModalRegister}>
                <SignUp isOpen={modalRegisterIsOpen} onClose={closeModalRegister} />
            </Modal>

        </div>
    )
}

export default Header;

