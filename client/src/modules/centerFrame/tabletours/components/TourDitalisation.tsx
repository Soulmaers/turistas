
import { set_catchs, set_bigfish, set_stateBody, RootState } from "../../../../GlobalStor"
import { useSelector, useDispatch } from 'react-redux'
import TableTournament from './TableToutnaments'
import { ClickIconAdd } from "./ClickIconAdd"
import TimeDisplay from "./TimeDisplay"
import { Tournament } from '../../../../GlobalStor'
import { BannerToBigfish } from './BannerToBigfish'
import { useGetCatchs } from '../hooks/getCatchs'
import PullToRefresh from 'react-pull-to-refresh';
import { SmartPullToRefresh } from '../../../servises/components/SmartPullToRefresh'

export const TourDetalisation: React.FC<{ data: Tournament[] }> = ({ data }) => {
    const { getCatchs } = useGetCatchs()
    const dispatch = useDispatch()
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour)


    if (!idClickTour) {
        return null
    }
    const tour = data.find(e => e.id === idClickTour)
    if (!tour) {
        return null;
    }

    const renderComponents = () => {
        switch (tour.status) {
            case 1:
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tour.status)} dateStart={tour.dateStart} dateFinish={tour.dateFinish} name={tour.name} />
                        <TableTournament idTour={idClickTour} />
                    </div>
                    <ClickIconAdd pref={1} />
                    <ClickIconAdd pref={2} />
                    <BannerToBigfish />
                </>
            case 0:
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tour.status)} dateStart={tour.dateStart} dateFinish={tour.dateFinish} name={tour.name} />
                        <TableTournament idTour={idClickTour} />
                    </div>
                    <BannerToBigfish />
                </>

            case 2:
                return <>
                    <div className="tour_data_table_title">
                        <TimeDisplay status={Number(tour.status)} dateStart={tour.dateStart} dateFinish={tour.dateFinish} name={tour.name} />
                        <TableTournament idTour={idClickTour} />
                    </div>
                    <BannerToBigfish />
                </>
            default: return null
        }
    }

    const handleRefresh = async () => {
        const data = await getCatchs(idClickTour)
        dispatch(set_catchs(data.data));
        dispatch(set_bigfish(data.bigFish));

    }


    return (<SmartPullToRefresh
        onRefresh={handleRefresh}>{renderComponents()}</SmartPullToRefresh>)
}