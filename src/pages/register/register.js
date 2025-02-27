import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import logoRegister from '../../assets/burger.png';
import { createUser, setTokenRole } from '../../api/api';
import { Button } from '../../components/Buttons/Button.jsx';
import InputForm from '../../components/InputForm/InputForm.jsx';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleUser, setRoleUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangeRole = (e) => {
    setRoleUser(e.target.value);
  };
  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser(name, email, password, roleUser)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.code) {
          throw (obj.message);
        } else {
          return obj;
        }
      })
      .then((data) => {
        if (!data) return;
        setTokenRole(data.token, data.role);
        navigate('/');
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <section className="container">
        <figure id="logo-register">
          <img src={logoRegister} alt="logo-hamburger" id="logo-img-register"/>
        </figure>
        <form id="form-register">
          <InputForm
            type="text"
            placeholder="NOME"
            onChange={(e) => setName(e.target.value)}
          />
          <InputForm
            type="email"
            placeholder="E-MAIL"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            type="password"
            placeholder="SENHA"
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            id="roleOption"
            name="roleOption"
            onChange={handleChangeRole}
          >
            <option value="admin">Administração</option>
            <option value="service">Atendimento</option>
            <option value="kitchen">Cozinha</option>
          </select>
          <select
            id="restaurant"
            name="restaurant"
          >
            <option value="chapaBurger">Chapa Burger</option>
          </select>
          <Button onClick={handleCreateUser} className="signin" text="CADASTRAR" />
        </form>
        <footer>
          <p className="errorMsg">{error}</p>
          <p className="text-home">Já possui conta? <Link to="/" className="link-home"> Entrar </Link></p>
        </footer>
      </section>
    </>
  );
};
