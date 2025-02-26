import { RootState, set_catchsList, set_historyWiew, ExtendedBigFish } from "../../../GlobalStor"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from 'react'


export const useProcessList = (userId: number | undefined) => {
    const [allCatchs, setAllCatchs] = useState<ExtendedBigFish[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllCatchs = async () => {
            const param = {
                method: 'GET'
            };
            try {
                const res = await fetch('http://localhost:3333/api/getCatchsList', param);
                const data = await res.json();
                console.log(data)
                setAllCatchs(data)
            } catch (error) {
                setAllCatchs([])
            }
        };

        fetchAllCatchs();
    }, []);

    const sortList = useCallback((id: number, creater: number) => {
        if (userId === creater) {
            //   console.log(allCatchs)
            const filterCatchs = allCatchs.filter(e => e.idTournament === id)
            //   console.log(filterCatchs)
            dispatch(set_catchsList(filterCatchs))
        }
        else {
            console.log(userId, id)
            console.log(allCatchs)
            const filterCatchs = allCatchs.filter(e => e.idUser === userId && e.idTournament === id)
            dispatch(set_catchsList(filterCatchs))
        }


    }, [allCatchs])
    return { sortList }
}