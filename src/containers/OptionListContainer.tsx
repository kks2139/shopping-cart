import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../modules/index';
import { categoryItemType, optionType } from '../utils/interfaces';
import { addOption, deleteOption, clearAddedOptions } from '../modules/option';
import { checkOption, uncheckOption, uncheckOptionAll } from '../modules/itemList';
import OptionList from '../components/OptionList';

interface paramType {
    itemId: string;
    check?: boolean;
    optId: string;
}

interface Props {
    item: categoryItemType;
}


function OptionListContainer({item}: Props) {
    const cateList = useSelector((state: RootState) => state.topMenu.cateList);
    const dispatch = useDispatch();

    const onClickOption = ({itemId, check, optId}: paramType)=>{
        if(optId + '' === '0'){
            dispatch(clearAddedOptions());
            dispatch(uncheckOptionAll());

        }else{
            if(check){
                dispatch(uncheckOption(optId));
                dispatch(deleteOption(optId));
            }else{
                let option: optionType | null = null; 
                for(var i=0; i< cateList.length; i++){
                    const cate = cateList[i];
                    const item = cate.categoryItems.filter(item => item.itemId === itemId);
                    if(item.length > 0){
                        const tmpOpt = item[0].itemOptions.filter(opt => opt.optionId === optId);
                        if(tmpOpt.length > 0){
                            option = tmpOpt[0];
                        }
                    }
                } 
                dispatch(addOption(option!));
                dispatch(checkOption(optId));
            } 
        }
    }
    

    return (
        <OptionList optionList={item.itemOptions} itemId={item.itemId} onClickOption={onClickOption}></OptionList>
    );
}

export default OptionListContainer;
