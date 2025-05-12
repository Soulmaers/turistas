
import { Tournament } from '../../../form/components/Interface'
import '../styles/ViewListTour.css'
import { Helpers } from '../servises.js'
import Modal from '../../../servises/components/Modal';
import { ClickIconAdd } from './ClickIconAdd'
import { BsSliders } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { set_stateBody, click_tour, update_modal, set_statusTour, RootState } from '../../../../GlobalStor'
import { useDeleteTour, useEditTour } from '../../../leftFrame/hooks'

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

    const { editFunc } = useEditTour()
    const subClass = flag ? 'title_tour_table title_left' : 'title_tour_table title_right'
    if (data === undefined || !data || data.length === 0) {
        console.log(titleStyles)
        return (<div className='container_tour_table' style={tableStyles}>
            <div className={subClass} style={titleStyles}>{title}</div>
            <div>Турниров нет</div>
        </div>)
    }
    const creater = data.some(e => e.created_by === user)
    console.log(data.length)
    const maxCount = data.length > 5
    console.log(maxCount)

    const handler = (idClickTour: number) => {
        dispatch(click_tour(idClickTour))
        dispatch(set_stateBody('tourCard'))
    }

    const handlerSetTour = async (idClickTour: number) => {
        await editFunc(idClickTour)
        console.log('тута!')
        dispatch(click_tour(idClickTour))
        dispatch(update_modal(true))

    }

    const handlerViewList = () => {
        const st = Number(data[0].status)
        if (st) dispatch(set_statusTour(st))
        dispatch(set_stateBody('typeToursList'))
    }

    const rows = data.map((e, index) => {
        const createdBy = e.created_by === user
        if (btn && index > 4) return null
        return <tr key={e.name} className="rows_table_tour_list">
            <td>{index + 1}</td>
            <td className="name_cel" onClick={() => handler(e.id)}>{e.name}</td>
            <td>{Helpers.formatData(e.dateStart)}</td>
            <td>{Helpers.formatData(e.dateFinish)}</td>
            {creater && <td className="set_tour" > {createdBy && <BsSliders className='set_tour_icon' onClick={() => handlerSetTour(e.id)} />}</td>}
        </tr>
    })


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
                <tbody>{rows}</tbody>
            </table>
        </div>

        {btn && maxCount && <span className={subClassSpan} onClick={handlerViewList}>посмотреть все</span>}
    </div>


    )
}

/*   {createdBy && <td className="set_tour"></td>}
 {admin && <th className="set_tour"></th>}*/