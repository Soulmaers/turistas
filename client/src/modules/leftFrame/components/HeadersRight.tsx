
import '../styles/HeadersRight.css'
import React, { useEffect, useState, useMemo } from 'react';
import { FaTrophy, FaStar } from "react-icons/fa";
import { FaFish } from "react-icons/fa6"
import iconCup from '../../../assets/icon_cup.webp'
import { AnchorButton } from './AnchorButton'
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, RootState, set_stateModalWindow } from '../../../GlobalStor';
import { useGetStatusUser } from '../../righFrame/hooks/getStatusUser'


const RenderHeaderRight = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent)
    const dispatch = useDispatch()

    const { getStatusUser } = useGetStatusUser()
    const { name_user = "", trophys = 0, fishs = 0, stars = 0 } = userStatus.user || {};

    useEffect(() => {
        const fetchData = async () => {
            const id = userStatus.user?.id
            if (id !== undefined) {
                const data = await getStatusUser(id)
                dispatch(updateStatusUser({ ...userStatus, user: data[0] }))
            }
        }
        if (userStatus.user) fetchData()

    }, [userStatus.user?.id, actionCatch, tourEvent])


    const onClickProfil = () => {
        dispatch(set_stateModalWindow({ type: 'profil', status: true }))
    }

    console.log('турэвент')
    return (
        <div className="header_admin_container">
            <div className="wrapper_account">
                <div className="wrap_icons">
                    <div className="trophy_count ic"> <div className="trophy_all"></div> <span className="numbers">{trophys}</span></div>
                    <div className="fish_count ic"><div className="fish_all"></div><span className="numbers">{fishs}</span></div>
                </div>
                <div className="wrap_icons">
                    <div className="login ic gumber" onClick={onClickProfil}><span className="icon icon_profil"></span></div>
                    <AnchorButton />
                </div>

            </div>
        </div >

    )
}
export default React.memo(RenderHeaderRight)
