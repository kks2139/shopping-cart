import React from 'react';
import {FaCheck} from 'react-icons/fa';
import {optionType} from '../utils/interfaces';

interface paramType {
    itemId: string;
    check?: boolean;
    optId: string;
}

interface Props {
    option: optionType;
    itemId: string;
    onClickOption: (param: paramType)=>void;
}

function Option({option, itemId, onClickOption}: Props){
    const onClick = ()=>{
        onClickOption({
            optId: option.optionId,
            check: option.check,
            itemId
        });
    }

    return (
        <div className={`option-box ${option.check ? 'active' : ''}`} onClick={onClick}>
            <div className='head'>
                {option.check ?
                    <FaCheck size='25' color='#00a800'></FaCheck> :
                    <FaCheck size='25' color='#bcbcbc'></FaCheck>
                }
                <div className='name'>{option.optionName}</div>
            </div>
            {option.optionId + '' === '0' ? null : <div>+{option.optionPrice.toLocaleString()}원</div>}
        </div>
    );
}

export default Option;