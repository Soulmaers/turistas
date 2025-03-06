import React, { useEffect, useState } from 'react'
import WiewCheckTitle from './WiewCheckTitle'
import '../styles/Statistics.css'
import { useSelector, useDispatch } from 'react-redux';
import { useProcessList } from '../hooks/ProcessListCatch'
import { set_historyWiew, click_tour, RootState } from '../../../GlobalStor';


const Statistics = () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [content, setContent] = useState<null | { users: string[]; reservours: string[]; timeDay: string[]; typeCatch: string[] }>(null);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const allCatchs = useSelector((state: RootState) => state.slice.allCatchs);
    const userID = userStatus?.user?.id
    const { sortProcessStatistics, uniqCollectionTitle } = useProcessList(userID)

    const handleCheckboxChange = (name: string) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: !prevState[name] // Переключаем значение для конкретного чекбокса
        }));
    };

    useEffect(() => {

        if (allCatchs.length !== 0) {
            console.log(allCatchs)
            setContent(uniqCollectionTitle())
            const initialCheckedItems: Record<string, boolean> = {};
            const allItems = [
                ...userStatus.tournament.map(e => e.id.toString()),
                ...(content?.reservours || []),
                ...(content?.timeDay || []),
                ...(content?.typeCatch || [])
            ];
            allItems.forEach(item => {
                initialCheckedItems[item] = true;
            });
        }

    }, [allCatchs])

    useEffect(() => {
        if (content && userStatus.tournament) {
            const initialCheckedItems: Record<string, boolean> = {};
            const allItems = [
                ...userStatus.tournament.map(e => e.id.toString()),
                ...(content.reservours || []),
                ...(content.timeDay || []),
                ...(content.typeCatch || [])
            ];

            allItems.forEach(item => {
                initialCheckedItems[item] = true;
            });
            console.log(allItems)
            setCheckedItems(initialCheckedItems);
        }

    }, [content, userStatus.tournament])


    useEffect(() => {
        sortProcessStatistics(checkedItems)

    }, [checkedItems])



    return (<div className="container_statistics">
        <div className="stat_name">Турниры</div>
        <WiewCheckTitle prop={userStatus.tournament.map(e => e.name)} propId={userStatus.tournament.map(e => e.id.toString())} state={checkedItems} func={handleCheckboxChange} />
        <div className="stat_name">Водоёмы</div>
        <WiewCheckTitle prop={content?.reservours} propId={[]} state={checkedItems} func={handleCheckboxChange} />
        <div className="stat_name">Время суток</div>
        <WiewCheckTitle prop={content?.timeDay} propId={[]} state={checkedItems} func={handleCheckboxChange} />
        <div className="stat_name">Тип ловли</div>
        <WiewCheckTitle prop={content?.typeCatch} propId={[]} state={checkedItems} func={handleCheckboxChange} />
    </div>)

}


export default Statistics