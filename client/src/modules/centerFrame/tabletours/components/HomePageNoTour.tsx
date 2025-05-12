

import '../styles/HomePageNoTour.css'
import { ClickIconAdd } from './ClickIconAdd'
export const HomePageNoTour = () => {


    return (<div className="wrapper_start_window"><div className='container_tour_table_now'>
        <div className='title_tour_table_now'>ТЕКУЩИЕ СОБЫТИЯ</div>
        <div className='body_tour_table start_now_events textarea_start_window'>Здесь будут отображаться активные события.
            <span className="icon_question"></span></div>
    </div>
        <ClickIconAdd pref={3} />
        <div className='container_tour_table_future'>
            <div className='title_tour_table_future'>ЗАПЛАНИРОВАННЫЕ СОБЫТИЯ</div>
            <div className='body_tour_table start_future_events textarea_start_window'>Здесь будут отображаться запланированные события.
                <span className="icon_question"></span>
            </div>
        </div>

    </div>)

}