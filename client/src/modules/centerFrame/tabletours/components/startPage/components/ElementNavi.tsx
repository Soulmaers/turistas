

import '../styles/ElementNavi.css'
import { useState } from 'react'
import { Tournament } from '../../../../../../GlobalStor'
import { useSelector, useDispatch } from 'react-redux'
import { set_stateBody, set_tour, set_statusTour, RootState } from '../../../../../../GlobalStor'
import { TypeListTours } from './TypeListTours'

interface PropsTours {
    tours: Tournament[];
    nameType: string;
    status: number
    isActive: boolean;
    onActivate: () => void;
}

export const ElementNavi: React.FC<PropsTours> = ({ tours, nameType, isActive, status, onActivate }) => {
    const dispatch = useDispatch()
    const classes = status === 2 ? 'row_type_tour_start last_row'
        : (status === 0 ? 'row_type_tour_start medium_row' : 'row_type_tour_start')



    const render = () => {
        if (tours.length === 0) {
            return <div className="no_tours">Турниров нет</div>
        }
        else {
            return <table className="table_tour_list"><tbody><TypeListTours data={tours.slice(0, 3)} /></tbody></table>
        }

    }

    const handler = () => {
        if (tours.length === 0) return
        dispatch(set_stateBody('typeToursList'))
        dispatch(set_statusTour(status))
    }
    return (
        <>
            <div className={classes} onClick={onActivate} style={{
                borderBottom: isActive ? 'none' : (status !== 2 ? '2px solid #e8e8e8' : 'none'),
                paddingBottom: isActive && status === 2 ? '20px' : '0' // Изменено на '0'
            }}>
                <div className="element_type_tour">
                    <div className='left_name_type'>
                        <div className="arrow_sub_menu" style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(-90deg)' }}></div>
                        <div>{nameType}</div>
                    </div>
                    <div className='right_name_type'>
                        <span>{tours.length}</span>
                        <span className="list_sub_all_tour" onClick={handler}></span>
                    </div>
                </div>

                {isActive && render()}
            </div >

        </>
    );
};