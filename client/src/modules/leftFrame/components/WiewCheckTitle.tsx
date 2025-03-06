import { StringMappingType } from "typescript"


interface PropCheckbox {
    prop: string[] | undefined;
    propId: string[];
    state: Record<string, boolean>;
    func: (name: string) => void;
}



const WiewCheckTitle: React.FC<PropCheckbox> = ({ prop, propId, state, func }) => {
    if (!prop) {
        return <p>Загрузка...</p>;
    }

    const rows = prop.map((e, index) => <div key={index} className="checkbox_item rows_list object_list">
        <input className="object_checks" type="checkbox" id={propId.length !== 0 ? propId[index] + index : e + index}
            checked={propId.length !== 0 ? !!state[propId[index]] : !!state[e]} // используем состояние для управления checked
            onChange={() => func(propId.length !== 0 ? propId[index] : e)} />
        <label className="label_check" htmlFor={propId.length !== 0 ? propId[index] + index : e + index}>{e}</label>
    </div>)

    return <div className="wrap_options">{rows}</div>
}


export default WiewCheckTitle