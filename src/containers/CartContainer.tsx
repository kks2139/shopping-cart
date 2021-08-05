import React, { useContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../modules/index';
import { clearCartItems, deleteItem, addItemAmount, deleteItemAmount } from '../modules/cart';
import { clearSelectedItem } from '../modules/topMenu';
import { deleteSelectedItem } from '../modules/topMenu';
import Cart from '../components/Cart';
import { pageContext } from '../App';

interface paramType {
    id: string;
    type: string;
}

interface Props {
    onClose: ()=>void;
}

function CartContainer({onClose}: Props) {
    const ctx = useContext(pageContext);
    const {cartItemList} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const onOrder = ()=>{
        dispatch(clearSelectedItem());
        dispatch(clearCartItems());
        ctx!.toggleMessage('주문이 완료되었습니다.');
        onClose();
    }

    const onDeleteItem = (id: string)=>{
        dispatch(deleteSelectedItem(id));
        dispatch(deleteItem(id));
    }
    
    const onAddDelClick = ({id, type}: paramType)=>{
        if(type === 'add') dispatch(addItemAmount(id));
        else dispatch(deleteItemAmount(id));
    }

    return (
        <Cart 
            onClose={onClose} 
            cartItemList={cartItemList} 
            onOrder={onOrder}
            onDeleteItem={onDeleteItem}
            onAddDelClick={onAddDelClick}
        ></Cart>
    );
}

export default CartContainer;
