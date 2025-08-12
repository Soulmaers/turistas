

import { useSelector, useDispatch } from 'react-redux'
import { set_stateBody, click_tour, set_stateModalWindow, RootState } from '../../../../../../GlobalStor'
import { BsSliders } from "react-icons/bs";
import { Helpers } from '../../../servises.js'
import { Tournament } from '../../../../../../GlobalStor'
import { useEditTour } from '../../../../../leftFrame/hooks'

interface PropsTours {
    data: Tournament[]
}

export const TypeListTours: React.FC<PropsTours> = ({ data }) => {
    const { editFunc } = useEditTour()
    const dispatch = useDispatch()
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);


    const handler = async (event: React.MouseEvent, idClickTour: number) => {
        event.stopPropagation()
        await editFunc(idClickTour)
        dispatch(click_tour(idClickTour))
        dispatch(set_stateBody('tourCard'))
    }

    const handlerSetTour = async (event: React.MouseEvent, idClickTour: number) => {
        event.stopPropagation()
        await editFunc(idClickTour)
        console.log('тута!')
        dispatch(click_tour(idClickTour))
        dispatch(set_stateModalWindow({ type: 'stateModal', status: true }))

    }
    const handlerSetTourDis = (event: React.MouseEvent) => {
        event.stopPropagation()
        dispatch(set_stateModalWindow({ type: 'disInfo', status: true }))
    }
    const renderLastIcon = (createdBy: boolean, e: number) => {
        if (createdBy) {
            return <BsSliders className='set_tour_icon' onClick={(event) => handlerSetTour(event, e)} />
        }

        else {
            return <BsSliders className='set_tour_icon_dis' onClick={(event) => handlerSetTourDis(event)} />
        }
    }

    const rows = data.map((e, index) => {
        const createdBy = e.created_by === userStatus?.user?.id
        console.log(createdBy)
        if (index > 5) return null
        return <tr key={e.name} className="rows_table_tour_list" onClick={(event) => handler(event, e.id)}>
            <td className="count_tour">{index + 1}</td>
            <td className="name_cel" >{e.name}</td>
            <td>{Helpers.formatData(e.dateStart)}</td>
            <td>{Helpers.formatData(e.dateFinish)}</td>
            <td className="set_tour"> {renderLastIcon(createdBy, e.id)}</td>
        </tr>
    })


    return (<>{rows}
    </>)
}