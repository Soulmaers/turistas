
import '../styles/HomePageHaveTour.css'
import { set_statusTour, User } from '../../../../GlobalStor'
import { ViewListTours } from './ViewListTours'
import { StartContentCount } from './startPage/components/StartConentCount'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { set_stateBody, click_tour, goBackState, RootState } from '../../../../GlobalStor'
import { TourDetalisation } from './TourDitalisation'
import { ClickIconAdd } from './ClickIconAdd'
import { CardBigFish } from '../../tabletours/components/CardBigfish'
import { SwipeWrapper } from '../../../servises/components/SwipeWrapper'
import WiewCardReservours from '../../reservours/components/WiewCardReservours'
import { HistoryList } from '../../history/components/HistoryList'
import { StatisticCard } from '../../tabletours/components/StatisticCard'
import { useEditTour } from '../../../leftFrame/hooks'

export const HomePageHaveTour: React.FC<{ data: User }> = ({ data }) => {
    const { editFunc } = useEditTour()
    const dispatch = useDispatch()
    const statebody = useSelector((state: RootState) => state.slice.stateBody)
    const history = useSelector((state: RootState) => state.slice.historyStateBody);
    const prevBody = history.length > 0 ? history[history.length - 1] : null;

    const statusTour = useSelector((state: RootState) => state.slice.statusTour)
    const updateReservourss = useSelector((state: RootState) => state.slice.updateReservours);
    const tournaments = useSelector((state: RootState) => state.slice.userStatus?.tournament || []);
    const idUser = data.user?.id
    const nowTours = data.tournament.filter(e => e.status === 1)
    const futureTours = data.tournament.filter(e => e.status === 0)
    const oldTours = data.tournament.filter(e => e.status === 2)


    const getS = async (id: number) => {
        await editFunc(id);
    };


    useEffect(() => {
        console.log(data?.user)
        if (data?.user?.state_card) {
            dispatch(set_stateBody(data.user.state_card))
            dispatch(click_tour(data.user.idClick_tour))
            if (data.user.idClick_tour) getS(data.user.idClick_tour)

            if (!statusTour) {
                const tour = data.tournament.find(e => e.id === data?.user?.idClick_tour)
                // console.log(tour)
                dispatch(set_statusTour(Number(tour?.status)))
            }
        }


    }, [])
    //  console.log(statusTour)
    const renderScreen = (screen: string | null) => {
        switch (screen) {
            case 'startwindow': return <StartContentCount content={data} />;
            case 'haveTours': return <>
                <ViewListTours user={idUser} btn={true} data={nowTours} title={'ТЕКУЩИЕ ТУРНИРЫ'} flag={true} tableStyles={{ top: '1%' }} titleStyles={{ color: 'black' }} />
                <ClickIconAdd pref={3} />
                <ViewListTours user={idUser} btn={true} data={futureTours} title={'ЗАПЛАНИРОВАННЫЕ ТУРНИРЫ'} flag={false} tableStyles={{ bottom: '23%' }} titleStyles={{ color: '#fff' }} />
            </>;
            case 'tourCard': return <TourDetalisation />;
            case 'bigFish': return <CardBigFish />;
            case 'typeToursList': {
                if (statusTour !== null) {
                    const title: { [key: number]: string } = { 2: 'ЗАВЕРШЕННЫЕ ТУРНИРЫ', 1: 'ТЕКУЩИЕ ТУРНИРЫ', 0: 'ЗАПЛАНИРОВАННЫЕ ТУРНИРЫ' }
                    const toursList = data.tournament.filter(e => e.status === statusTour)
                    return <>
                        {statusTour !== 2 && <ClickIconAdd pref={4} />}
                        <ViewListTours user={idUser} btn={false} data={toursList} title={title[statusTour]} flag={true} tableStyles={{ top: '1%' }} titleStyles={{ alignItems: 'flex-start', width: 'auto', color: '#000' }} />
                    </>
                }
                return null;
            }
            case 'reservoors': return <WiewCardReservours index={updateReservourss?.index} text={updateReservourss?.text} />;
            case 'history': return <HistoryList data={tournaments} />;
            case 'stata': return <StatisticCard />;
            default: return null;
        }
    };

    return (
        <SwipeWrapper
            renderScreen={renderScreen}
            prevBody={prevBody}
            statebody={statebody}
        />
    );
}