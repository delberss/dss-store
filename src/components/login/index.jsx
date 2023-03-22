import { useEffect, useState } from "react";
import { login } from "../../redux/user/slice";

import './style.css'

import axios from "axios";
import { useDispatch } from "react-redux";

export const customModalSignIn = {
    content : {
      width: '30%',
      height: '70%',
      margin: 'auto',
    }

  };

const Login = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data =  { email, password };
    const LOGIN_URL = 'http://localhost:8080/login';


    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {email, password};

        try {
            if( !email || !password){
                throw new Error("Preencha todos os campos!");
            }

            const response = await axios.post(LOGIN_URL, data); 
            if(response.status === 200){
                const user = response.data.user;
                dispatch(login(user));
                localStorage.setItem("user", JSON.stringify(user))
                onClose();
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            alert(message);
        }
        
    }

    if(isOpen) {
        return (
            <div className="modal-login">
                <button className="closeModal" onClick={onClose}>X</button>
                <form className="form" onSubmit={handleLogin}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        placeholder="Digite seu e-mail" 
                        type="text"
                        id="email"
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                    
                    <label htmlFor="password">Senha</label>
                    <input 
                        placeholder="Digite sua senha" 
                        type="password"
                        id="password"
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
    return null;
};

export default Login;

