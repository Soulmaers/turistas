import { FC } from 'react'

interface Props {
    admin: boolean
    handlerStart: () => void
    cancel: () => void
}

export const CatchModalFooter: FC<Props> = ({ admin, handlerStart, cancel }) => (
    <div className={`footer_modal_tour foot footer_create_tour ${!admin ? 'admin-width' : ''}`}>
        {admin && <><div className="title_tour start_tour" onClick={handlerStart}>СОЗДАТЬ</div>
            <span className="icon_question_tours"></span></>}
        <div className="title_tour start_tour" onClick={cancel}>ОТМЕНА</div>
    </div>
)