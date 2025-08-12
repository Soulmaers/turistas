

import { FC, RefObject } from 'react'

interface Props {
    timeFile: string | null
    fileInputRef: RefObject<HTMLInputElement>
    urlFoto: string | null
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleButtonClick: () => void
    onZoom: () => void
}

export const CatchFileUploader: FC<Props> = ({
    fileInputRef,
    handleImageChange,
    handleButtonClick,
    timeFile,
    urlFoto,
    onZoom
}) => {
    const cacheKey = `img_${urlFoto}`
    const cachedData = localStorage.getItem(cacheKey)

    return (
        <div className="rows_card_tour_foto">
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
            <div className="button_load" onClick={handleButtonClick}></div>
            <div className="wrap_img">
                <div
                    className='foto_load'
                    style={urlFoto ? { backgroundImage: `url(${cachedData || timeFile})` } : {}}
                    onClick={onZoom}
                ></div>
            </div>
        </div>
    )
}