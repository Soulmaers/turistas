
import { BannerToBigfish } from './BannerToBigfish'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetImages } from '../hooks/getImages'
import '../styles/CardBigFish.css'
import { RootState, set_stateBody, set_catchs, set_bigfish } from '../../../../GlobalStor'
export const CardBigFish = () => {
    const bigFish = useSelector((state: RootState) => state.slice.bigFish)
    const [imageRes, setImageRes] = useState<string | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [loader, setLoader] = useState<boolean>(true)

    const loadImage = async (name: string) => {
        switch (name) {
            case 'Финский залив (Соколинское)':
                return (await import('../assets/sokol.webp')).default;
            case 'река Волхов (Ленинградская область)':
                return (await import('../assets/volhov.webp')).default;
            case 'Ладожское озеро (Креницы)':
                return (await import('../assets/krenicy.webp')).default;
            case 'Ладожское озеро (Шхеры)':
                return (await import('../assets/shhery.webp')).default;
            case 'река Ловать (Новгородская область)':
                return (await import('../assets/lovat.webp')).default;
            case 'река Луга (Ленинградская область)':
                return (await import('../assets/luga.webp')).default;
            case 'Дамба (Кронштадт)':
                return (await import('../assets/damba.webp')).default;
            case 'Лепсари':
                return (await import('../assets/lepsary.webp')).default;
            default:
                return null;
        }
    };
    const { getImage } = useGetImages()
    useEffect(() => {
        const fetchImage = async () => {
            setLoader(true);
            if (bigFish?.urlFoto) {
                console.log(bigFish);
                try {
                    setImage(await getImage(bigFish.urlFoto));

                    // Здесь вы можете использовать результат, который вернули getImage
                } catch (error) {
                    console.error('Ошибка при получении изображения:', error);
                }
            }

            if (bigFish?.name_reservour) {
                console.log(bigFish);
                try {
                    setImageRes(await loadImage(bigFish.name_reservour));


                    // Здесь вы можете использовать результат, который вернули getImage
                } catch (error) {
                    console.error('Ошибка при получении изображения:', error);
                }
            }
            setLoader(false);
        };
        fetchImage();

    }, [bigFish])


    console.log(bigFish)
    if (!bigFish) return null


    console.log(imageRes)
    const faceFish = bigFish ? { backgroundImage: `url(${image})` } : {};
    const reservour = bigFish ? { backgroundImage: `url(${imageRes})` } : {};
    console.log(reservour)
    return (
        <div className="wrapper_card_bigfish">
            <BannerToBigfish />
            <div className='imgs'>
                <div className={`img_foto_bigfish fisher_foto_catch ${!loader ? 'animate' : ''}`} style={loader ? {} : faceFish}></div>
                <div className={`img_foto_bigfish reservours_catch ${!loader ? 'animate2' : ''}`} style={loader ? {} : reservour}></div>
            </div>
            <div className="content_bigfish">
                <span className='text_bigfish value_text'>{`Участник: ${bigFish.name_user}`}</span>
                <span className='text_bigfish value_text'>{`Вид рыбы: ${bigFish.name_fish}`}</span>
                <span className='text_bigfish value_text'>{`Вес: ${bigFish.weight} грамм`}</span>
                <span className='text_bigfish value_text'>{`Водоём: ${bigFish.name_reservour}`}</span>
                <span className='text_bigfish value_text'>{`Дата улова: ${bigFish.data}`}</span>
                <span className='text_bigfish value_text'>{`Тип ловли: ${bigFish.name_type}`}</span>
                <span className='text_bigfish value_text'>{`Приманка: ${bigFish.name_bait}`}</span>
            </div>
        </div>
    )
}