import './index.css';
import { useEffect, useState} from 'react';
import Header from './components/Header'
import { useParams } from "react-router-dom"
import {Visa, getVisaById} from '../modules/Api';
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import BreadCrumbs2 from "../components/BreadCrumbs2";

function Page2() {
  const [visa, setVisa] = useState<Visa | null>(null);
  const { id } = useParams(); // ид страницы, пример: "/albums/12"
  
  useEffect(() => {
    if (!id) return;
    document.body.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
    getVisaById(id)
      .then((response) => setVisa(response))
      .catch((error) => {
        console.error("Error fetching visa data:", error);
        // Optionally handle the error state here
      });
    // Set the body background color when this component mounts
    // Reset the body background color when this component unmounts
    return () => {
      document.body.style.background = ''; // Reset to default
    };
  }, [id]);
  
  if (!visa) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <>
      <Header />
      <BreadCrumbs2 crumbs={[
          { label: ROUTE_LABELS.VISAS, path: ROUTES.VISAS },
          { label: visa?.type|| "Виза" },
        ]} />
      <div className="custom-container2">
        <div className="upper-part">
          <div className="visa_name">
            <p className="visa_type">{visa.type}</p>
            <p className="visa-word">виза</p>
          </div>
          <div className="documents-box"><h1>Список документов</h1>
            <ul>
              <li>Бронь авиабилета</li>
              <li>Справка с работы</li>
              <li>Заполненная анкета</li>
              <li>Паспорт</li>
              <li>Фотографии</li>
              <li>Ксерокс загранпаспорта</li>
              <li>Заполненная анкета</li>
              <li>Паспорт</li>
              <li>Фотографии</li>
              <li>Ксерокс загранпаспорта</li>
            </ul>
            <h1>Стоимость оформления</h1>
            <div className="price_line">
              <p>от</p><p className="price2">{visa.price} р</p><p>по запросу</p>
            </div>

          </div>
        </div>
        <img src={ visa.url || "http://localhost:9000/test/default_.png" } alt="картинка к визе" className="image2"/>
      </div>
    </>
  );
}

export default Page2