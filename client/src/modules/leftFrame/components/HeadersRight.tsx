
import '../styles/HeadersRight.css'
import { useEffect, useState } from 'react';
import { FaTrophy, FaStar } from "react-icons/fa";
import { FaFish } from "react-icons/fa6"
import iconCup from '../../../assets/icon_cup.webp'
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusUser, RootState, set_profil } from '../../../GlobalStor';
import { useGetStatusUser } from '../../righFrame/hooks/getStatusUser'


const RenderHeaderRight = () => {

    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const actionCatch = useSelector((state: RootState) => state.slice.actionCatch)
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

    }, [userStatus.user?.id, actionCatch])



    const onClickProfil = () => {
        dispatch(set_profil(true))
    }
    return (
        <div className="header_admin_container">
            <div className="wrapper_account">
                <div className="trophy_count"> <div className="trophy_all"></div> <span className="numbers">{trophys}</span></div>
                <div className="fish_count"><div className="fish_all"></div><span className="numbers">{fishs}</span></div>
                <div className="login" onClick={onClickProfil}>{name_user.toUpperCase()}</div>

            </div>
        </div >

    )
}
export default RenderHeaderRight
