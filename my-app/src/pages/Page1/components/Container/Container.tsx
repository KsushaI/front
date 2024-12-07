import './index.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FC } from 'react'
import { ROUTES} from "../../../../Routes";
import {api} from '../../../../api'


interface Visa {
    pk: number;
    type: string;
    price: number;
    url: string; 
}

interface Props {
    Visa: Visa[];
    navigate: (path: string) => void; // Add navigate to Props
    addToTrolley: () => void;
}

const Container: FC<Props> = ({ Visa , navigate, addToTrolley}) => {
    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу альбома
        
      };
    const handleClick = async (id: number) => {
        console.log(id);
        const { data } = await api.visasApi.visasApiRead(id.toString())

        navigate(`${ROUTES.VISAS}/${id}`);
        console.log(id.toString());
        console.log(data)
    };

    const addVisa = async (id: number) => {
        console.log(id);
        const { data } = await api.visasApi.visasApiAddToTrollyCreate(id.toString())
        addToTrolley()
        console.log(data)
        console.log(id.toString());
    };
    
    return (
        <>
            {/*<Card className="custom-card">
                <Link to="/details">
                    <Card.Img variant="top" className="image" src="http://127.0.0.1:9000/test/1.jpg" />
                </Link>

                <Card.Body> <div className="visa"><p className="title">Рабочая</p>
                    <p className="price">от 21000 р</p>
                </div>
                </Card.Body>
            </Card>*/}
            {Visa.map((visa, index) => (

                <Card key={index} className="custom-card">
                    
                        {/*{`/details/${visa.id}`}*/}
                    <Card.Img variant="top" className="image" src={visa.url || "http://localhost:9000/test/default_.png" || "public/default_2.png"} onClick={() => handleClick(visa.pk)}/>
            
                    <Card.Body> <div className="visa"><p className="title">{visa.type}</p>
                        <p className="price">{visa.price}</p>
                        <Button variant="primary" type="submit" className="card-button" onClick={() => addVisa(visa.pk)}>
            +
          </Button>
                    </div>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default Container