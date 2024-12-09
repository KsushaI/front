import Header from "../Page1/components/Header";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApps } from '../../slices/appsSlice'; // Adjust the path as necessary
import { RootState, AppDispatch } from '../../store';
import { api } from '../../api'
const AppsListPage = () => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const { apps } = useSelector((state: RootState) => state.apps);
    const [reload, setReload] = useState(false);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '',
        creator: ''
    });

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
                start_date:  updatedFilters.startDate, 
                end_date: updatedFilters.endDate, 
                status: filters.status,
                
            }));
        }
    };

    const handleBackendFilterChange = () => {
        // Отправляем запрос на сервер с остальными фильтрами
        dispatch(fetchApps(filters));
    };

    // Фильтрация заявок на основе текущих фильтров
    const filteredApps = apps.filter(app => {
        const matchesCreator = filters.creator ? app.creator === filters.creator : true;
        return matchesCreator; // Фильтруем только по создателю
    });

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(fetchApps(filters));
           
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
                    value={filters.startDate}
                    onChange={e => setFilters({ ...filters, startDate: e.target.value })}
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={e => setFilters({ ...filters, endDate: e.target.value })}
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

            {apps && (
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


