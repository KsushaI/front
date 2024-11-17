import './index.css'
import Card from 'react-bootstrap/Card';
import { FC } from 'react'
import { ROUTES} from "../../../../Routes";

interface Visa {
    pk: number;
    type: string;
    price: number;
    url: string; 
}

interface Props {
    Visa: Visa[];
    navigate: (path: string) => void; // Add navigate to Props
}

const Container: FC<Props> = ({ Visa , navigate}) => {
    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу альбома
        navigate(`${ROUTES.VISAS}/${id}`);
        console.log(id);
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
                    <Card.Img variant="top" className="image" src={"/front/"+visa.url || "http://localhost:9000/test/default_.png" || "public/default_2.png"} onClick={() => handleCardClick(visa.pk)}/>
            
                    <Card.Body> <div className="visa"><p className="title">{visa.type}</p>
                        <p className="price">{visa.price}</p>
                    </div>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default Container