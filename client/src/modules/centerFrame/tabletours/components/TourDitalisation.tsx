
import { set_catchs, set_bigfish, set_stateBody, RootState } from "../../../../GlobalStor"
import { useSelector, useDispatch } from 'react-redux'
import TableTournament from './TableToutnaments'
import { ClickIconAdd } from "./ClickIconAdd"
import { Pause } from './Pause'
import TimeDisplay from "./TimeDisplay"
import { BannerToBigfish } from './BannerToBigfish'
import { useGetCatchs } from '../hooks/getCatchs'
import { useState, useEffect } from 'react'
import { Helpers } from '../servises'
import { SmartPullToRefresh } from '../../../servises/components/SmartPullToRefresh'

export const TourDetalisation = () => {
    const { getCatchs } = useGetCatchs()
    const dispatch = useDispatch()

    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent)


    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now()) // обновляем текущее время каждую секунду
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const renderComponents = () => {
        switch (tourEvent.status) {
            case 1: const add = Helpers.razbor(tourEvent.timeTour, now)
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tourEvent.status)} dateStart={tourEvent.dateStart} dateFinish={tourEvent.dateFinish} name={tourEvent.name} />
                        {tourEvent.id && <TableTournament idTour={tourEvent.id} />}
                    </div>
                    {add ? <><ClickIconAdd pref={1} />
                        <ClickIconAdd pref={2} /></> : <Pause />}
                    <BannerToBigfish />
                </>
            case 0:
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tourEvent.status)} dateStart={tourEvent.dateStart} dateFinish={tourEvent.dateFinish} name={tourEvent.name} />
                        {tourEvent.id && <TableTournament idTour={tourEvent.id} />}
                    </div>
                    <BannerToBigfish />
                </>

            case 2:
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tourEvent.status)} dateStart={tourEvent.dateStart} dateFinish={tourEvent.dateFinish} name={tourEvent.name} />
                        {tourEvent.id && <TableTournament idTour={tourEvent.id} />}
                    </div>
                    <BannerToBigfish />
                </>
            default: return null
        }
    }

    const handleRefresh = async () => {
        if (!tourEvent.id) return
        const data = await getCatchs(tourEvent.id)
        dispatch(set_catchs(data.data));
        dispatch(set_bigfish(data.bigFish));

    }


    return (<SmartPullToRefresh
        onRefresh={handleRefresh}>{renderComponents()}</SmartPullToRefresh>)
}