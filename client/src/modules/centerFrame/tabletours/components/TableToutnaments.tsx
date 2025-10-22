import { useSelector, useDispatch } from 'react-redux'
import { RootState, set_catchs, FishCatch, set_bigfish } from '../../../../GlobalStor'
import React, { useEffect } from 'react'
import { useGetCatchs } from '../hooks/getCatchs'
import { useEditTour } from '../../../leftFrame/hooks'
import '../styles/TableTournaments.css'





interface TableTournamentProps {
    idTour: number; // Или другой подходящий тип, например, number
}

const TableTournament: React.FC<TableTournamentProps> = ({ idTour }) => {
    const { getCatchs } = useGetCatchs()
    const { editFunc } = useEditTour()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const catchs = useSelector((state: RootState) => state.slice.catchs)
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent)
    const dispatch = useDispatch()

    console.log(tourEvent)
    const fetchData = async () => {
        const [data] = await Promise.all([
            getCatchs(idTour),
            //  editFunc(idTour)
        ]);
        dispatch(set_catchs(data.data));
        dispatch(set_bigfish(data.bigFish));
    };

    useEffect(() => {
        fetchData();
    }, [idTour, actionCatch]);


    const usersWithTotals = tourEvent.fishers.map((e) => {
        const catchsFisher = catchs.find(el => el.idUser === e.userId);
        return {
            ...e,
            total: catchsFisher ? catchsFisher['Всего'] : 0, // Добавляем значение "Всего"
        };
    });

    // Затем сортируем участников по значению "Всего"
    const sortedUsers = usersWithTotals.sort((a, b) => b.total - a.total); // Сортировка по убыванию

    // Теперь отображаем отсортированные строки
    // console.log(sortedUsers)
    const rows = sortedUsers.map((e, index) => {
        const isCurrentUser = userStatus?.user?.id === e.userId;
        const rowStyle = isCurrentUser ? { backgroundColor: 'rgba(229, 209, 28, 1)' } : {};
        const rowStyleCel = isCurrentUser ? { backgroundColor: 'rgba(211, 211, 211, 0.7)' } : {};
        const rowStyleTwo = isCurrentUser ? { backgroundColor: 'rgba(77, 70, 70, 0.7)' } : {};


        const catchsFisher = catchs.find(el => el.idUser === e.userId);
        const uniqFish = [...new Set(tourEvent.fishs.map(e => e.name)), 'Всего'];

        const fishCount = uniqFish.map(fishType => {
            // Утверждаем, что fishType является ключом для catchsFisher
            const count = catchsFisher && catchsFisher[fishType as keyof FishCatch] ? catchsFisher[fishType as keyof FishCatch] : 0;

            return (
                <td className="cel" style={rowStyleCel} key={fishType}>
                    {count}
                </td>
            );
        });



        return (
            <tr key={e.name_user} style={rowStyle}>
                <td className="cel_two" style={rowStyleTwo}>{index + 1}</td>
                <td className="cel_two" style={rowStyleTwo}>{catchsFisher ? catchsFisher.name_user : e.name_user?.toUpperCase()}</td>
                {fishCount}
            </tr>
        );

    })

    const rowHeaders = tourEvent.fishs.map(e => <th>{e.name}</th>)
    return (<>
        <div className="container_table">
            <table className='styled_table'>
                <thead><tr>
                    <th>№</th>
                    <th>Участики</th>
                    {rowHeaders}
                    <th>Всего</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>

        </div>
        <div className="sub_function">
            <div className="find_i">НАЙТИ СЕБЯ</div>
            <div className="all_fishers">ПОКАЗАТЬ ВСЕХ УЧАСТНИКОВ</div>
        </div>
    </>
    )
}

export default React.memo(TableTournament)