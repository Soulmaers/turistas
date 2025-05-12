
import { RootState } from "../../../../GlobalStor"
import { useSelector } from 'react-redux'
import TableTournament from './TableToutnaments'
import { ClickIconAdd } from "./ClickIconAdd"
import TimeDisplay from "./TimeDisplay"
import { Tournament } from '../../../form/components/Interface'
import { BannerToBigfish } from './BannerToBigfish'

export const TourDetalisation: React.FC<{ data: Tournament[] }> = ({ data }) => {
    console.log(data)
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

    return (<>{renderComponents()}</>)
}