import { User } from "../../../../GlobalStor";
import { ExtendedBigFish } from '../../../../GlobalStor'



export const useInitFormState = (
    catchOne: ExtendedBigFish,
    idTour: number | null,
    user: User
) => {
    const storedData = localStorage.getItem('fishingData');
    const localData = storedData ? JSON.parse(storedData) : null;
    return {
        fishs: catchOne.id_fish > 0 ? catchOne.id_fish : (localData?.fishs ?? 0),
        reservuors: catchOne.id_reservour > 0 ? catchOne.id_reservour : (localData?.reservuors ?? 0),
        typeFishing: catchOne.id_type > 0 ? catchOne.id_type : (localData?.typeFishing ?? 0),
        baits: catchOne.id_baits > 0 ? catchOne.id_baits : (localData?.baits ?? 0),
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