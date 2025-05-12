
import '../styles/HomePageHaveTour.css'
import { User } from '../../../form/components/Interface'
import { ViewListTours } from './ViewListTours'
import { useSelector, useDispatch } from 'react-redux'
import { set_stateBody, RootState } from '../../../../GlobalStor'
import { TourDetalisation } from './TourDitalisation'
import { ClickIconAdd } from './ClickIconAdd'
import { CardBigFish } from '../../tabletours/components/CardBigfish'
export const HomePageHaveTour: React.FC<{ data: User }> = ({ data }) => {

    const statebody = useSelector((state: RootState) => state.slice.stateBody)
    const statusTour = useSelector((state: RootState) => state.slice.statusTour)

    const idUser = data.user?.id
    const nowTours = data.tournament.filter(e => e.status === 1)
    const futureTours = data.tournament.filter(e => e.status === 0)
    const oldTours = data.tournament.filter(e => e.status === 2)



    const renderComponents = () => {
        switch (statebody) {
            case 'haveTours'://загрузка основной странички с турнирами
                return <><ViewListTours user={idUser} btn={true} data={nowTours} title={'ТЕКУЩИЕ СОБЫТИЯ'} flag={true} tableStyles={{ top: '1%' }} titleStyles={{ color: 'black', }} />

                    <ClickIconAdd pref={3} />
                    <ViewListTours user={idUser} btn={true} data={futureTours} title={'ЗАПЛАНИРОВАННЫЕ СОБЫТИЯ'} flag={false} tableStyles={{ bottom: '23%' }} titleStyles={{ color: '#fff' }} />

                </>
            case 'tourCard': //карточка детализации турнира
                return <TourDetalisation data={data.tournament} />

            case 'bigFish':
                return <CardBigFish />

            case 'typeToursList': //картачка списка зарпошенных турниров
                if (statusTour !== null) {
                    const title: { [key: number]: string } = { 2: 'ЗАВЕРШЕННЫЕ СОБЫТИЯ', 1: 'ТЕКУЩИЕ СОБЫТИЯ', 0: 'ЗАПЛАНИРОВАННЫЕ СОБЫТИЯ' }
                    const toursList = data.tournament.filter(e => e.status === statusTour)

                    return <>{statusTour !== 2 && <ClickIconAdd pref={4} />}
                        <ViewListTours user={idUser} btn={false} data={toursList} title={title[statusTour]} flag={true} tableStyles={{ top: '1%' }} titleStyles={{ alignItems: 'flex-start', width: 'auto', color: '#000' }} />
                    </>

                }





        }

    }

    return (<div className={statebody}>
        {renderComponents()}
    </div>)
}