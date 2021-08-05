import React, { useEffect, useState } from 'react';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import {cartItemType} from '../utils/interfaces';

interface paramType {
    id: string;
    type: string;
}

interface Props {
    item: cartItemType;
    onDeleteItem: (id: string)=>void;
    onAddDelClick: (param: paramType)=>void;
}

function CartItem({item, onDeleteItem, onAddDelClick}: Props){
    const [totalPrice, setTotalPrice] = useState(0);

    const onClickDel = ()=>{
        onDeleteItem(item.itemId);
    }
    
    const onImgeClick = (e: React.MouseEvent<SVGAElement>)=>{
        const type = e.currentTarget.dataset.name!
        if(type === 'del' && item.amount === 1) return;

        onAddDelClick({
            id : item.itemId,
            type
        });
    } 

    const sumPrice = ()=>{
        let sum = (item.itemPrice + item.optionList.reduce((acc, now) => acc + now.optionPrice, 0)) * item.amount;  
        setTotalPrice(sum);
    }

    useEffect(()=>{
        // 기본값 + 옵션값 계산
        sumPrice();
    }, [item]);

    return (
        <div className='cartItem-box'>
            <div className='header'>
                <div className='name'>{item.itemName}</div>
                <div className='del' onClick={onClickDel}>삭제</div>
            </div>
            <div className='opts'>
                <div className='txt-box'>
                    <div className='txt'>기본</div>
                    <div className='txt'>1개</div>
                    <div className='txt'>{item.itemPrice.toLocaleString()}원</div>
                </div>
                {item.optionList.map(opt => 
                    (<div key={opt.optionId} className='added txt-box'>
                        <div className='txt'>{opt.optionName}</div>
                        <div className='txt'>1개</div>
                        <div className='txt'>{opt.optionPrice.toLocaleString()}원</div>
                    </div>)
                )}
            </div>
            <div className='amount'>
                <div className='amt'>
                    <FaPlusSquare size='25' data-name='add' onClick={onImgeClick}></FaPlusSquare>
                    <div>{item.amount}개</div>
                    <FaMinusSquare size='25' data-name='del' onClick={onImgeClick}></FaMinusSquare>
                </div>
                <div className='price'>{totalPrice.toLocaleString()}원</div>
            </div>
        </div>
    );
}

export default CartItem;