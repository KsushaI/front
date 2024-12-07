
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './RegistrationPage.css'
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
          first_name: '',
          last_name: '',
          email: '',
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
           
            api.users.usersCreate(formData);
            navigate(ROUTES.AUTH)
           
        } catch (error) {
            console.error('Login failed:');
            // Handle error (e.g., show a message to the user)
        }
        console.log('Form submitted:', formData);
    };
         
       
      

    return (
        <>
        <Header />
        <Container className="small-container">
        <h2>Заполните форму регистрации</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLastname">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите фамилию"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Адрес электронной почты</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
            Зарегистрироваться
          </Button>
        </Form>
      </Container>
        </>
    )
}

export default Registration;
