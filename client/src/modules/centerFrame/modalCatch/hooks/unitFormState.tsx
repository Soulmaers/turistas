import { User } from "../../../../GlobalStor";
import { ExtendedBigFish } from '../../../../GlobalStor'

import { RootState, Property } from '../../../../GlobalStor'
import { useSelector } from "react-redux";

export const useInitFormState = (
    catchOne: ExtendedBigFish,
    idTour: number | null,
    user: User
) => {
    const tourEvent = useSelector((state: RootState) => state.slice.tourEvent);
    const storedData = localStorage.getItem('fishingData');
    const localData = storedData ? JSON.parse(storedData) : null;
    console.log(tourEvent)


    function check(localProp: number | string | boolean, termin: string): any {
        if (!tourEvent || !localProp) return 0;
        console.log(localProp)
        console.log(termin)
        let bool;
        switch (termin) {
            case 'fishs': bool = tourEvent[termin].find((e: any) => e.id === Number(localProp)) || tourEvent[termin].length === 0;
                break;
            case 'reservours': bool = tourEvent[termin].find((e: any) => e.id === Number(localProp)) || tourEvent[termin].length === 0;
                break;
            case 'typeCatch': bool = tourEvent[termin].find((e: any) => e.id === Number(localProp)) || tourEvent[termin].length === 0;
                break;
            case 'typeBaits': bool = tourEvent[termin].find((e: any) => e.id === Number(localProp)) || tourEvent[termin].length === 0;
                break;
        }
        console.log(bool)
        return !!bool ? localProp : 0
    }


    return {
        fishs: catchOne.id_fish > 0 ? catchOne.id_fish : check(localData?.fishs, 'fishs'),
        reservuors: catchOne.id_reservour > 0 ? catchOne.id_reservour : check(localData?.reservuors, 'reservours'),
        typeFishing: catchOne.id_type > 0 ? catchOne.id_type : check(localData?.typeFishing, 'typeCatch'),
        baits: catchOne.id_baits > 0 ? catchOne.id_baits : check(localData?.baits, 'typeBaits'),
        timeDay: catchOne.id_timeday ?? '1',
        weight: catchOne.weight ?? '',
        comment: catchOne.comment ?? '',
        idTour: catchOne.idTournament > 0 ? catchOne.idTournament : idTour || user.tournament.at(-1)?.id || null,
        idUser: catchOne.idUser && catchOne.idUser !== 0 ? catchOne.idUser : user?.user?.id,
        idCatch: catchOne.idCatch ?? null,
        urlFoto: catchOne.urlFoto ?? null,
        image: null
    };
};




