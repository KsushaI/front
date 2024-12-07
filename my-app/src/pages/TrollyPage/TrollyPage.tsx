import Header from "../Page1/components/Header"
import Button from "react-bootstrap/Button"
import BreadCrumbs from "../components/BreadCrumbs"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes"
import { ROUTE_LABELS } from "../../Routes"
import "./TrollyPage.css"
import DeleteIcon from "../../assets/delete.svg"
import { useParams } from "react-router-dom"
import TrollyCards from "./components/TrollyCards"
import { api } from '../../api'
const TrollyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [app, setApp] = useState<any>()
    const [services, setServices] = useState<any>(0); // State for services
    useEffect(() => {
        if (!id) return;

        const fetchdata = async () => {
            try {
                //axios.defaults.withCredentials = true;
                //const { data } = await api.visasApi.visasApiList();
                //setVisasData(data);*/
                //const response = await api.visasApi.visasApiList(); // Ensure this returns the expected data
                //const data: VisasData = response.data; // Type the response data
                const { data } = await api.appsApi.appsApiRead(id.toString());
                console.log(data)
                setApp(data)

                // Log the data to check its structure
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchdata();

        //import { AppData } from './types'; // Define your AppData type

        /*export const fetchAppData = createAsyncThunk<AppData, string>(
            'apps/fetchAppData',
            (id: string) => {
                return api.appsApi.appsApiRead(id.toString())
                    .then(({ data }) => data); // Using .then to return the data from the response
            }*/
    }, [services]);

    const del_App = async (id: any) => {

        const { data } = await api.appsApi.appsApiDelete(id)
        console.log(data)
        console.log(id.toString());
        navigate(ROUTES.VISAS);
    };

    const form_App = async (id: any) => {
        console.log(id);
        const { data } = await api.appsApi.appsApiFormUpdate(id)
        console.log(data)
        console.log(id.toString());
        navigate(ROUTES.VISAS);

    };
    const deleteVisa = async (visaId: number) => {
        try {
            // Call the API to delete the visa
            await api.appsVisasApi.appsVisasApiDelete2(visaId.toString());
            // Update the state to remove the deleted visa
            setServices(services + 1);
        } catch (error) {
            console.error("Error deleting visa:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="trolly-space">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.TROLLY }]} />
                {app &&
                    <div className="app-fields"><p>C: {app.app_fields.start_date}____Срок действия: {app.app_fields.duration} дней</p></div>
                }
                <div className="dates"></div>

                {app &&
                    <TrollyCards onDelete={deleteVisa} TCard={app.services} />}


                <div className="button-space">
                    <Button variant="danger" onClick={() => del_App(id)}>Удалить</Button>
                    <Button variant="success" onClick={() => form_App(id)}>Сформировать</Button>
                </div>
            </div>
        </>
    )
}

export default TrollyPage;