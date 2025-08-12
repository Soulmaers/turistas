import { FC, useEffect, memo, useState } from 'react'
import Modal from '../../../servises/components/Modal'

interface Props {
    timeFile: string | null
    onClose: () => void
}

export const ZoomModal: FC<Props> = memo(({ timeFile, onClose }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    console.log(timeFile)
    useEffect(() => {
        if (!timeFile) return;

        setIsImageLoaded(true)
    }, [timeFile])

    return (
        <Modal style={{ top: '20%' }} onClose={onClose}>
            {!isImageLoaded ? (
                <div className='zoom_foto'><div className="container_load">
                    <div className="loader_global"></div>
                    <span className="span_dicription">ЗАГРУЗКА ...</span>
                </div></div>
            ) : (
                <div className='zoom_foto' style={{ backgroundImage: `url(${timeFile})` }} />
            )}
        </Modal>
    )
})