import { FC } from 'react'
import Button from "react-bootstrap/Button"
import DeleteIcon from "../../../assets/delete.svg"
import {api} from '../../../api'

interface TCard {
    id: number;
    type: string; // Type of the service (e.g., "Частная", "Транзитная")
    price: number; // Price of the service
    url: string; // URL for the service image
    fio: string | null; // Full name or null if not provided
    app_visa_id: number;
}

interface Props {
    TCard: TCard[];
    onDelete: (id: number) => void;
}


//<Card key={index} className="custom-card">

const TrollyCards: FC<Props> = ({TCard, onDelete}) => {
    const del_Visa = async (id: number) => {
        //const { data } = await api.appsVisasApi.appsVisasApiDelete2(id.toString())
        //console.log(data)
        //console.log(id.toString());
        onDelete(id);
    };

    return(
    <>
    {TCard.map((tcard, index) => (

        
        <div key={tcard.id} className="trolly-card">
        <img src={tcard.url} className='trolly-pic'/>
        <div className="table1">
            <div>
            <p>Тип визы</p>
            <p>{tcard.type}</p></div>
            <div>
            <p>Цена</p>
            <p>от {tcard.price} р</p></div>
            <div>
            <p>ФИО</p>
            <input  type="text" placeholder="Впишите ФИО"></input></div>
        </div>
        <Button variant="" type="submit" className="del-button" onClick={() => del_Visa(tcard.app_visa_id)}><img src={DeleteIcon}></img></Button>
    </div>
    ))}
    </>
    )
}

export default TrollyCards;