import '../styles/CardNaviCatchs.css'
import { User } from '../../../../../../GlobalStor'

interface ContentProps {
    data: User

}



export const CardNaviCatchs: React.FC<ContentProps> = ({ data }) => {


    return (<div className="card_catchs">
        <div className="title_card_count">УЛОВ<span className="icon_add_content_fish"></span></div>
        <div className="row_type_tour_low"> <div className="">ЖУРНАЛ УЛОВА</div><span className="">{data.user?.fishs}</span></div>
        <div className="row_type_tour_low stat"> <div className="">СТАТИСТИКА</div></div>
    </div>)
}