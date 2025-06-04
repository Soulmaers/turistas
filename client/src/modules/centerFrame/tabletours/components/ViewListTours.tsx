
import { Tournament } from '../../../../GlobalStor'
import '../styles/ViewListTour.css'

import { useDispatch } from 'react-redux'
import { TypeListTours } from './startPage/components/TypeListTours'
import { set_stateBody, set_statusTour, RootState } from '../../../../GlobalStor'


interface ViewListToursProps {
    data: Tournament[];
    user: number | undefined
    title: string;
    flag: boolean;
    btn: boolean
    titleStyles?: React.CSSProperties; // Стили для заголовка
    tableStyles?: React.CSSProperties;// Изменен тип на React.CSSProperties для стилей
}

export const ViewListTours: React.FC<ViewListToursProps> = ({ data, user, title, flag, titleStyles, tableStyles, btn }) => {
    const dispatch = useDispatch()

    const subClass = flag ? 'title_tour_table title_left' : 'title_tour_table title_right'

    const zaglushka = flag ? (
        <div className='body_tour_table start_now_events textarea_start_window'>Здесь будут отображаться активные события.
            <span className="icon_question"></span></div>
    ) : (<div className='body_tour_table start_future_events textarea_start_window'>Здесь будут отображаться запланированные события.
        <span className="icon_question"></span></div>)

    if (data === undefined || !data || data.length === 0) {

        return (<div className='container_tour_table' style={tableStyles}>
            <div className={subClass} style={titleStyles}>{title}</div>
            {zaglushka}
        </div>)
    }
    const creater = data.some(e => e.created_by === user)

    const maxCount = data.length > 5




    const handlerViewList = () => {
        const st = Number(data[0].status)
        if (st) dispatch(set_statusTour(st))
        dispatch(set_stateBody('typeToursList'))
    }


    const subClassSpan = flag ? 'all_tours_list now_tour_all_list' : 'all_tours_list future_tour_all_list'



    return (<div className='container_tour_table' style={tableStyles}>
        <div className={subClass} style={titleStyles}>{title}
        </div>
        <div className='body_tour_table'>
            <table className='styled_table_tour'>
                <thead><tr className="row_title_table_tour" style={{ backgroundColor: data[0].status === 1 ? '#e5951c' : '#515752' }}>
                    <th>№</th>
                    <th className="name_cel">НАЗВАНИЕ</th>
                    <th>НАЧАЛО</th>
                    <th>КОНЕЦ</th>
                    {creater && <th className="set_tour"></th>}
                </tr>
                </thead>
                <TypeListTours data={data} />
            </table>
        </div>

        {btn && maxCount && <span className={subClassSpan} onClick={handlerViewList}>посмотреть все</span>}
    </div>


    )
}


