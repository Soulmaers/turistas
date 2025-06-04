import '../styles/Preform.css'


interface PreForm {
    onDone: (index: number) => void;
}



export const Preform: React.FC<PreForm> = ({ onDone }) => {

    const handler = (index: number) => {
        onDone(index)
    }

    return (<div className="wrap_pre_form">
        <div className="btn_pre_form" onClick={() => handler(1)}>ВХОД</div>
        <div className="btn_pre_form" onClick={() => handler(2)}>РЕГИСТРАЦИЯ</div>
    </div>)
}