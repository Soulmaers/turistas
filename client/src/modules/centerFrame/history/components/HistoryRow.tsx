

import React, { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { useGetImages } from '../../tabletours/hooks/getImages';
import { formatUnixTime } from '../servises';
import { ExtendedBigFish } from '../../../../GlobalStor';

type RowProps = {
    item: ExtendedBigFish;
    canManage: boolean;
    onEdit: (item: ExtendedBigFish) => void;
    onDelete: (item: ExtendedBigFish) => void;
};

export const HistoryRow: React.FC<RowProps> = React.memo(({ item, canManage, onEdit, onDelete }) => {
    const { getImage } = useGetImages();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            if (!item.urlFoto) {
                setImageUrl(null);
                return;
            }
            try {
                const url = await getImage(item.urlFoto);
                if (alive) setImageUrl(url);
            } catch {
                if (alive) setImageUrl(null);
            }
        })();
        return () => { alive = false; };
    }, [item.urlFoto, getImage]);

    const time = formatUnixTime(Number(item.data));

    return (
        <tr className='rows_list_catch' key={item.idCatch}>
            <td className="row_history_catch">{item.name_user}</td>
            <td className="row_history_catch">{item.name_fish}</td>
            <td className="row_history_catch">{item.name_type}</td>
            <td className="row_history_catch">{item.weight}</td>
            <td className='row_history_catch edit' onClick={() => onEdit(item)}>{time}</td>
            <td
                className='row_history_catch icon_fish_foto'
                style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
            />
            <td className='row_history_catch delete_catch' onClick={() => canManage && onDelete(item)}>
                {canManage && <FaTimes className='icon_del' />}
            </td>
        </tr>
    );
}, (prev, next) => {
    // Ререндер строки только если значимые поля изменились
    return (
        prev.canManage === next.canManage &&
        prev.item.idCatch === next.item.idCatch &&
        prev.item.urlFoto === next.item.urlFoto &&
        prev.item.weight === next.item.weight && // добавь поля, которые реально меняются
        prev.item.name_fish === next.item.name_fish &&
        prev.item.name_type === next.item.name_type &&
        prev.item.name_user === next.item.name_user &&
        prev.item.data === next.item.data
    );
});

