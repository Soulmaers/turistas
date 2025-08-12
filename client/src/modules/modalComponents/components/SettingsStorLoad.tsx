
import { useRef, useEffect, useState } from "react"
import { SwapeComponent } from '../../centerFrame/modalCarTour/configurator/components/SwapeComponent'
import { set_stateModalWindowTwo } from '../../../GlobalStor'
import { useDispatch } from "react-redux"
import '../styles/SettingsStorLoad.css'

export const SettingsStorLoad = () => {
    const dispatch = useDispatch()
    const [selectedBaitsTypes, setSelectedBaitsTypes] = useState<number[]>([1, 2, 3, 4]);
    const [radio, setRadio] = useState({ id: 2, name: 'Искать по любой части фразы' })

    const set = [{ title: 'fishs', label: 'Вид рыбы', id: 1 }, { title: 'reservuors', label: 'Водоём', id: 2 }, { title: 'typeFishing', label: 'Вид ловли', id: 3 }, { title: 'baits', label: 'Приманка', id: 4 }]
    const options = [
        { id: 1, name: 'Искать по первым буквам фразы' },
        { id: 2, name: 'Искать по любой части фразы' }
    ];


    useEffect(() => {
        const setCatch = localStorage.getItem('setCatch')
        const arraySet = setCatch ? JSON.parse(setCatch) : []
        const indexses = set.filter(e => arraySet.includes(e.title)).map(el => el.id)
        setSelectedBaitsTypes(indexses)
        // set_sel()
    }, [])
    const toggleCatch = (id: number) => {
        setSelectedBaitsTypes(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const over = () => {
        console.log(selectedBaitsTypes)
        console.log(radio)
        const indexses = set.filter(e => selectedBaitsTypes.includes(e.id)).map(el => el.title)
        console.log(indexses)
        localStorage.setItem('setCatch', JSON.stringify(indexses))
        dispatch(set_stateModalWindowTwo({ type: 'setLoad', status: false }))
    }

    const rows = set.map(e => <SwapeComponent text={e.label} active={selectedBaitsTypes.includes(e.id)} onToggle={() => toggleCatch(e.id)} />)
    const optio = options.map(option => (
        <div className="row_radio" key={option.name} onClick={() => setRadio({ id: option.id, name: option.name })}>
            <div className={`rad ${radio.id === option.id ? 'active_on' : ''}`}></div>
            <div className="rad_text_set">{option.name}</div>
        </div>
    ))

    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">НАСТРОЙКИ</div>
        <div className="body_card_modal">
            <div className="wrapper_set_abs"><div className="discription_time_set_load">Использовать введенные данные при следующем добавлении улова</div>
                {rows}</div>
            <div className="wrapper_set_abs">
                <div className="discription_time_set_load">Настройка поиска по спискам</div>
                <SwapeComponent text={'Полное соответствие'} active={selectedBaitsTypes.includes(5)} onToggle={() => toggleCatch(5)} />
                {optio}
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)
}