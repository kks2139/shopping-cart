import React, { useEffect, useState } from 'react';
import {optionType, categoryItemType} from '../utils/interfaces';

interface paramType {
    item: categoryItemType;
    addedOptionList: optionType[];
}

interface Props {
    item: categoryItemType;
    addedOptionList: optionType[];
    onPutItem: (param: paramType)=>void;
}

function AddedList({item, addedOptionList, onPutItem}: Props){
    const [price, setPrice] =  useState(0);

    const onClickPutCart = ()=>{
        onPutItem({item, addedOptionList});
    }

    useEffect(()=>{
        // 추가된 옵션 합계
        const sum = addedOptionList.reduce((acc, now)=> acc + now.optionPrice, 0);
        setPrice(sum + item.itemPrice);
    }, [addedOptionList]);

    return (
        <div className='addedList-box'>
            <div className='list-wrapper'>
                <div className='title'>{item.itemName}</div>
                <div className='item' style={{color : 'black'}}>
                    <div>기본가격</div>
                    <div>{item.itemPrice.toLocaleString()}원</div>
                </div>
                <div className='opt-box'>
                    {addedOptionList.map(opt => 
                        (<div key={opt.optionId} className='item'>
                            <div>+{opt.optionName}</div>
                            <div>{opt.optionPrice.toLocaleString()}원</div>
                        </div>)
                    )}
                </div>
            </div>
            <div className='footer'>
                <div className='info'>
                    <div className='txt'>합계</div>
                    <div className='total'>{price.toLocaleString()}원</div>
                </div>
                <div className='cart-btn' onClick={onClickPutCart}>장바구니 담기</div>
            </div>
        </div>
    );
}

export default AddedList;