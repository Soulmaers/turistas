import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { set_stateModalWindow, RootState } from '../../../GlobalStor';
import { useSaveAnchor } from '../hooks/SaveAnchor';

export const AnchorButton = () => {
    const dispatch = useDispatch();
    const { save } = useSaveAnchor();
    const stateBody = useSelector((state: RootState) => state.slice.stateBody);
    const idClickTour = useSelector((state: RootState) => state.slice.idClickTour);
    const userStatus = useSelector((state: RootState) => state.slice.userStatus);
    const [stateAnchor, setStateAnchor] =
        useState<{ anchorStateBody: null | string, anchorIdClickTour: null | number }>({
            anchorStateBody: null,
            anchorIdClickTour: null,
        })

    useEffect(() => {
        if (userStatus.user) {
            setStateAnchor({
                anchorStateBody: userStatus.user.state_card,
                anchorIdClickTour: userStatus.user.idClick_tour
            });
        }
    }, [userStatus.user]);

    const isAnchored = stateBody === stateAnchor.anchorStateBody && idClickTour === stateAnchor.anchorIdClickTour;
    //  console.log(isAnchored, stateBody, stateAnchor.anchorStateBody, idClickTour, stateAnchor.anchorIdClickTour)

    const handleAnchor = async () => {
        if (!userStatus.user) return;
        if (!isAnchored) {
            setStateAnchor({ anchorStateBody: stateBody, anchorIdClickTour: idClickTour })
            dispatch(set_stateModalWindow({ type: 'anchor', status: true }))
            await save(userStatus.user.id, stateBody, idClickTour);
        }
        else {
            setStateAnchor({ anchorStateBody: null, anchorIdClickTour: null })
            await save(userStatus.user.id, null, null);
        }


    };
    const classFon = isAnchored ? 'icon icon_anchor groundAnchor' : 'icon icon_anchor nogroundAnchor'
    return (
        <div className="anchor ic" onClick={handleAnchor}>
            <span
                className={classFon}
            />
        </div>
    );
};