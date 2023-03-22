import { useState } from "react";
import axios from "axios";
import './style.css'

export const customModalSignUp = {
    content : {
      width: '30%',
      height: '70%',
      margin: 'auto',
    }

  };

const Register = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const REGISTER_URL = 'http://localhost:8080/register';

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {name, email, password};

        try {
            if( !name || !email || !password){
                throw new Error("Preencha todos os campos!");
            }

            const response = await axios.post(REGISTER_URL, data); 
            if(response.status === 201){
                onClose();
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            alert(message);
        }
        
    }
    

    if(isOpen) {
        return (
            <div className="modal-register">
                <button className="closeModal" onClick={onClose}>X</button>
                <form className="form" onSubmit={handleRegister}>

                    <label htmlFor="name">Nome</label>
                    <input 
                        placeholder="Digite seu nome" 
                        type="text"
                        id="name"
                        name="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>


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
                    
                    

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
    return null;
};

export default Register;

