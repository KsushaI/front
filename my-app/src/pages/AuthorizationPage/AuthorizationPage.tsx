
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../RegistrationPage/RegistrationPage.css'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../slices/authSlice';
import {ROUTES} from "../../Routes" // Adjust the path as necessary
import {api} from '../../api'
import { useEffect } from 'react'
import Header from "../Page1/components/Header"

const Registration = () => {
        const [formData, setFormData] = useState({
          username: '',
          password: '',
        });
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const handleChange = (e: any) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleSubmit = async (e: any) => {
          e.preventDefault();
          try {
            console.error('helooo');
            const response = await axios.post('http://localhost:8000/login/', formData);
            if (response.data.status === 'ok') {
                // Store the token in localStorage
                localStorage.setItem('session_id', response.data.session_id);
                
                document.cookie = "session_id="+ response.data.session_id +"; path=/; max-age=3600";
                console.log('Login successful, token stored:', response.data.session_id);
                console.log(response.data.is_staff)
                // Redirect or update UI as needed
                dispatch(login({ user_id: response.data.id, username: formData.username, is_staff: response.data.is_staff })); 
                console.log('Login action dispatched with:', { username: formData.username});
                navigate(ROUTES.VISAS)
            } else {
              console.log('fufuf');
            }
        } catch (error) {
            console.error('Login failed:');
        }
        console.log('Form submitted:', formData);
    };
         
       
      

    return (
        <>
        <Header/>
        <Container className="small-container">
        <h2>Войти</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Логин / Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин / имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

  
          <Form.Group controlId="formPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Button variant="primary" type="submit" className="submit-btn mt-2">
            Войти
          </Button>
        </Form>
      </Container>
        </>
    )
}

export default Registration;
