import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  fetchVisas  from '../../slices/actions/fetchvisas'; // импортируйте ваше асинхронное действие
import { RootState, AppDispatch } from '../../store'; // импортируйте корневой тип состояния
import Header from "../Page1/components/Header"
import Button from "react-bootstrap/Button"
const servicePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.service); // Получение данных из состояния

  useEffect(() => {
    dispatch(fetchVisas()); // Получение виз при загрузке компонента
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  const handleClick = () => {
    
  }
  return (
    <>
    <Header />

    <table>
      <thead>
        <tr>
          <th>Тип</th>
          <th>Цена</th>
          <th>Картинка</th>
          <th>Создатель</th>
          <th>Статус</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {services.map((visa) => (
          <tr key={visa.pk}>
            <td>{visa.type}</td>
            <td>{visa.price}</td>
            <td>
              <a href={visa.url} target="_blank" rel="noopener noreferrer" >
              <img className="serv_pic" src={visa.url || "http://127.0.0.1:9000/test/default_.png"} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px'}} />
              </a>
            </td>
            <td>{visa.creator || 'Нет описания'}</td>
            <td>{visa.status}</td>
       
           
            <td><Button variant="success" onClick={handleClick}>Редактировать</Button></td>
            <td><Button variant="danger">Удалить</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default servicePage;