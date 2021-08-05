import React, { useContext, useEffect, useRef, useState } from 'react';
import { pageContext } from '../App';
import {cartItemType} from '../utils/interfaces';
import CartItem from './CartItem';

interface paramType {
    id: string;
    type: string;
}

interface Props {
    onClose: ()=>void;
    cartItemList: cartItemType[];
    onOrder: ()=>void;
    onDeleteItem: (id: string)=>void;
    onAddDelClick: (param: paramType)=>void;
}

function Cart({onClose, cartItemList, onOrder, onDeleteItem, onAddDelClick}: Props){
    const ctx = useContext(pageContext);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [totalSum, setTotalSum] = useState(0);

    const onClickOrder = ()=>{
        if(cartItemList.length === 0) ctx?.toggleMessage('주문할 상품이 없습니다.'); 
        else onOrder();
    }

    const sumTotalPrice = ()=>{
        let totSum = 0;
        const itemPriceArr: number[] = [];
        cartItemList.forEach(item => {
            let sum = (item.itemPrice + item.optionList.reduce((acc, now) => acc + now.optionPrice, 0)) * item.amount;  
            itemPriceArr.push(sum);
        });
        totSum = itemPriceArr.reduce((acc, now) => acc + now, 0);
        setTotalSum(totSum);
    }

    useEffect(()=>{
        // 총 합계 계산
        sumTotalPrice();
    }, [cartItemList]);

    useEffect(()=>{
        divRef.current!.classList.add('show');
    }, []);

    return (
        <div className='cart-box' ref={divRef}>
            <div className='title'>장바구니</div>
            <div className='item-wrapper'>
                {cartItemList.map(item => 
                    <CartItem key={item.itemId} item={item} onDeleteItem={onDeleteItem} onAddDelClick={onAddDelClick}></CartItem>
                )}
            </div>
            <div className='cart-footer'>
                <div className='total-box'>
                    <div>총 {cartItemList.length}가지</div>
                    <div className='price'>합계 <span>{totalSum.toLocaleString()}원</span></div>
                </div>
                <div className='button-box'>
                    <div onClick={()=>{onClose()}}>닫기</div>
                    <div onClick={onClickOrder}>주문하기</div>
                </div>
            </div>
        </div>
    );
}

export default Cart;