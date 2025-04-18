
import '../styles/HomePageHaveTour.css'
import { Tournament } from '../../../form/components/Interface'
import { ClickIconAddTour } from './ClickIconAddTour'
import { ViewListTours } from './ViewListTours'


export const HomePageHaveTour: React.FC<{ data: Tournament[] }> = ({ data }) => {






    console.log(data)
    const nowTours = data.filter(e => e.status === 1)
    const futureTours = data.filter(e => e.status === 0)
    return (<div className='wrapper_no_tour have_tour'>
        <ViewListTours data={nowTours} title={'Текущие турниры'} />
        <ClickIconAddTour />
        <ViewListTours data={futureTours} title={'Запланированные турниры'} />
    </div>)
}