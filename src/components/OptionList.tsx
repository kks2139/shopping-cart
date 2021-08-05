import React from 'react';
import Option from './Option';
import {optionType, categoryItemType} from '../utils/interfaces';

interface paramType {
    itemId: string;
    check?: boolean;
    optId: string;
}

interface Props {
    optionList: optionType[];
    itemId: string;
    onClickOption: (param: paramType)=>void;
}

function OptionList({optionList, itemId, onClickOption}: Props){
    return (
        <div className='optionList-box'>
            <div className='desc'>*20개까지 선택할 수 있습니다.</div>
            <div className='wrapper'>
                {optionList.map(opt => <Option key={opt.optionId} itemId={itemId} option={opt} onClickOption={onClickOption}></Option>)}
            </div>
        </div>
    );
}

export default OptionList;