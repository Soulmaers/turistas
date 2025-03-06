import { RootState, setAllCatchs, set_catchsList, set_static, ExtendedBigFish, UserData } from "../../../GlobalStor"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from 'react'




export const useProcessList = (userId: number | undefined) => {
    const allCatchs = useSelector((state: RootState) => state.slice.allCatchs);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllCatchs = async () => {
            const param = {
                method: 'GET'
            };
            try {
                const res = await fetch('http://localhost:3333/api/getCatchsList', param);
                const data: ExtendedBigFish[] = await res.json();
                console.log(data)
                const idTournamments = userStatus.tournament.map(e => e.id)
                const actualtionCatch = data.filter(e => idTournamments.includes(e.idTournament))
                dispatch(setAllCatchs(actualtionCatch))
            } catch (error) {
                dispatch(setAllCatchs([]))
            }
        };

        fetchAllCatchs();
    }, []);

    const uniqCollectionTitle = useCallback(() => {
        const users = allCatchs.map(e => e.name_user).filter((name, index, self) => self.indexOf(name) === index);
        const reservours = allCatchs.map(e => e.name_reservour).filter((name, index, self) => self.indexOf(name) === index);
        const timeDay = allCatchs.map(e => e.name_day).filter((name, index, self) => self.indexOf(name) === index);
        const typeCatch = allCatchs.map(e => e.name_type).filter((name, index, self) => self.indexOf(name) === index);

        return { users, reservours, timeDay, typeCatch }
    }, [allCatchs])


    const sortList = useCallback((id: number, creater: number) => {
        if (userId === creater) {
            const filterCatchs = allCatchs.filter(e => e.idTournament === id)
            dispatch(set_catchsList(filterCatchs))
        }
        else {
            const filterCatchs = allCatchs.filter(e => e.idUser === userId && e.idTournament === id)
            dispatch(set_catchsList(filterCatchs))
        }


    }, [allCatchs])


    const sortProcessStatistics = useCallback((checkedItems: Record<string, boolean>) => {
        const filteredTitle = Object.entries(checkedItems).filter(e => e[1] === true).map(el => el[0])
        // console.log(filteredTitle)
        const filteredData = allCatchs.filter(el => {
            if (filteredTitle.includes(el.name_day) &&
                filteredTitle.includes(el.name_type) &&
                filteredTitle.includes(el.name_reservour) &&
                filteredTitle.includes(el.idTournament.toString())) {
                return el
            };
        })
        const fishCategories = ["Лещ", "Щука", "Судак", "Окунь", "Форель", "Другое", "Всего"];
        const users = allCatchs.map(e => e.name_user).filter((name, index, self) => self.indexOf(name) === index);

        const data: UserData[] = users.map(e => ({ // Инициализация data
            name_user: e,
            "Лещ": 0,
            "Щука": 0,
            "Судак": 0,
            "Окунь": 0,
            "Форель": 0,
            "Другое": 0,
            "Всего": 0,
        }));

        filteredData.forEach((item: ExtendedBigFish) => {
            const { name_user, name_fish } = item;
            const fishType = fishCategories.includes(name_fish) ? name_fish : "Другое";

            // Ищем userEntry в массиве data
            const userEntry = data.find(entry => entry.name_user === name_user);
            if (userEntry) {
                const key: keyof UserData = fishType as keyof UserData; // Явное приведение типа
                userEntry[key]++;
                userEntry["Всего"]++;
            }
        });
        data.sort((a, b) => b['Всего'] - a['Всего'])
        dispatch(set_static(data))
    }, [allCatchs])
    return { sortProcessStatistics, uniqCollectionTitle, sortList }
}