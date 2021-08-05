import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../modules/index';
import { selectCategory } from '../modules/topMenu';
import TopMenu from '../components/TopMenu';


function TopMenuContainer() {
    const {cateList, selectedId} = useSelector((state: RootState) => state.topMenu);
    const dispatch = useDispatch();

    const onSelect = (id: string)=>{
        dispatch(selectCategory(id));
    }

    return (
        <TopMenu cateList={cateList} selectedId={selectedId} onSelect={onSelect}></TopMenu>
    );
}

export default TopMenuContainer;
