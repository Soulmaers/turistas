

import '../styles/HomePageNoTour.css'
import { ClickIconAddTour } from './ClickIconAddTour'
export const HomePageNoTour = () => {



    return (
        <div className="wrapper_no_tour">
            <div className="discription_no_tur">Здравствуйте! Пришло время создать Ваш первый турнир или открыть сезон. Для этого нажмите на эту кнопку.</div>
            <ClickIconAddTour />
        </div>

    )
}