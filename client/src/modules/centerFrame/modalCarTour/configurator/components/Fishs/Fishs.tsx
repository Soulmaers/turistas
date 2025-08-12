import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { RootState, set_tourEvent, set_stateCardTour, set_stateModalWindowThree } from '../../../../../../GlobalStor';
import './Fishs.css'
import { SwapeComponent } from '../SwapeComponent'
import { FindFilter } from '../FindFilter'




export const Fishs = () => {
    const dispatch = useDispatch()
    const dataContent = useSelector((state: RootState) => state.slice.dataContent)
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const stateModalWindowThree = useSelector((state: RootState) => state.slice.stateModalWindowThree);
    const [arrayFishs, setArrayFishs] = useState<{ id: number; name: string }[]>(dataContent?.fishs || [])
    const [selectedFishs, setSelectedFishs] = useState<{ id: number; name: string }[]>([])
    const state = useSelector((state: RootState) => state.slice.stateCardTour);
    const [anyFish, setAnyFish] = useState(false);
    const [other, setOther] = useState(false)



    useEffect(() => {
        console.log(tourEvent.fishs)
        console.log(state.fish)
        setSelectedFishs(tourEvent.fishs);
        if (state.fish) setAnyFish(tourEvent.fishs.length === 0); // если массив пуст — значит "Любая приманка"

    }, [tourEvent.fishs]);



    const over = () => {
        if (anyFish || selectedFishs.length !== 0) dispatch(set_stateCardTour({ ...state, fish: true }))
        dispatch(set_tourEvent({ ...tourEvent, fishs: anyFish ? [] : selectedFishs }))
        dispatch(set_stateModalWindowThree({ ...stateModalWindowThree, status: false }))
    }

    const handlerDiscriotion = () => {
        console.log('ок')
    }

    const deleteFish = (id: number) => {
        setSelectedFishs(selectedFishs.filter(e => e.id !== id))
    }


    const svoyBlockStyle = anyFish
        ? { opacity: 0.5, pointerEvents: 'none' as const }
        : undefined;


    const displayValue = anyFish ? 'none' : undefined;


    return (<div className="modal_subif">
        <div className="title_tour header_modal_add_tour">ВИД РЫБЫ<span className="icon_question time_question" onClick={handlerDiscriotion}></span></div>
        <div className="body_card_modal">
            <div className="discription_time">Здесь Вы можете задать вид рыбы принимающей участие в турнире</div>
            <div className="criter_block" style={svoyBlockStyle}>
                {selectedFishs.length !== 0 && selectedFishs.map(e => (<div className="row_wrap_interval_fish" key={e.name}>
                    <div className="body_interval"  >{e.name}</div>
                    <span className="del_interval" onClick={() => deleteFish(e.id)}></span>
                </div>))}
            </div>
            <div className="container_sort_fishs">
                <span className="span_text_info">* начните вводить название</span>
                <FindFilter disArray={setSelectedFishs} disabled={anyFish} display={displayValue} objs={arrayFishs} selected={selectedFishs} />
                <SwapeComponent text={'Любая рыба'} active={anyFish} onToggle={() => setAnyFish((prev) => !prev)} />
                <SwapeComponent text={'Добавить колонку ДРУГОЕ'} active={other} onToggle={() => setOther((prev) => !prev)} />
            </div>
        </div>
        <div className="footer_ok" onClick={over}>OK</div>
    </div >)


}
