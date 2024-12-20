import Header from "../Page1/components/Header";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApps } from '../../slices/appsSlice'; // Adjust the path as necessary
import { RootState, AppDispatch } from '../../store';
import { api } from '../../api'
import { useNavigate } from "react-router-dom";
import { ROUTES} from "../../Routes";
const AppsListPage = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    
    const dispatch = useDispatch<AppDispatch>();
    const { apps } = useSelector((state: RootState) => state.apps);
    const [reload, setReload] = useState(false);
    const [filters, setFilters] = useState({
        start_date: '',
        end_date: '',
        status: '',
        creator: ''
    });

    const navigate = useNavigate()

    const creators = ['ksu', 'first', 'second', 'fifth', 'sixth', 'seventh', 'ninth'];
    
    const finish = async (app_id: string, action_: string) => {
        //const {data} =  await api.appsApi.appsApiRead(id.toString());
        api.appsApi.appsApiUpdate2(app_id, action_)
        }
    

    const handleCompleteRequest = (app_id: string, action_: string) => {
        console.log(app_id)
        finish(app_id, action_)
        setReload(prev => !prev);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedFilters = {
            ...filters,
            [name]: value,
        };
        setFilters(updatedFilters);

        // Если изменился фильтр создателя, обновляем список заявок
        if (name === 'creator') {
            dispatch(fetchApps({
                start_date:  updatedFilters.start_date, 
                end_date: updatedFilters.end_date, 
                status: filters.status,      
            }));
            
        }
    };

    const handleBackendFilterChange =  () => {
        // Отправляем запрос на сервер с остальными фильтрами
        dispatch(fetchApps(filters));
        
    };

    // Фильтрация заявок на основе текущих фильтров
    const filteredApps = apps.filter(app => {
        const matchesCreator = filters.creator ? app.creator === filters.creator : true;
        return matchesCreator; // Фильтруем только по создателю
    });

    useEffect(() => {
        const id = setTimeout(async () => {
            const resultAction = await dispatch(fetchApps(filters));

           
            if (fetchApps.rejected.match(resultAction) && resultAction.payload === 'FORBIDDEN') {
                navigate(ROUTES.PAGE403); 
            }
        }, 2000);

        return () => clearTimeout(id);
    }, [filters, dispatch, apps, reload]);

    return (
        <>
            <Header />
            <div>
                <input
                    type="date"
                    name="startDate"
                    value={filters.start_date}
                    onChange={e => setFilters({ ...filters, start_date: e.target.value })}
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.end_date}
                    onChange={e => setFilters({ ...filters, end_date: e.target.value })}
                />
                <select name="status" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                    <option value="">Все статусы</option>
                    <option value="Сформирована">Сформирована</option>
                    <option value="Завершена">Завершена</option>
                    <option value="Отклонена">Отклонена</option>
                </select>
                <select name="creator" value={filters.creator} onChange={handleFilterChange}>
                    <option value="">Все создатели</option>
                    {creators.map(creator => (
                        <option key={creator} value={creator}>{creator}</option>
                    ))}
                </select>
                {/*<button onClick={handleBackendFilterChange}>Применить фильтры</button>*/}
            </div>
            <div>
            <Form.Select aria-label="Default select example">
      <option>Все статусы</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select></div>
  
            {apps && isAuthenticated && (
                <Table striped bordered hover className="mt-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            {user.is_staff && <th>Создатель</th>}
                            <th>Модератор</th>
                            <th>Итог</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.map((app, index) => (
                            <tr key={app.id}>
                                <td>{index + 1}</td>
                                <td>{app.id}</td>
                                <td>{app.status}</td>
                                <td>{new Date(app.creation_date).toLocaleString()}</td>
                                <td>{new Date(app.formation_date).toLocaleString()}</td>
                                <td>{app.completion_date ? new Date(app.completion_date).toLocaleString() : 'N/A'}</td>
                                {user.is_staff && <td>{app.creator}</td>}
                                <td>{app.moderator}</td>
                                <td>{app.total}</td>
                                {user.is_staff && app.status === "Сформирована" && (
                                    <>
                                        <td><Button variant="success" onClick={() => handleCompleteRequest(app.id?.toString(), "complete")}>Завершить</Button></td>
                                        <td><Button variant="danger" onClick={() => handleCompleteRequest(app.id?.toString(), "decline")}>Отклонить</Button></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AppsListPage;


