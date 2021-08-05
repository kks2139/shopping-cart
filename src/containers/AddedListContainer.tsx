import React, { useContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../modules/index';
import { addItem } from '../modules/cart';
import { setSelectedItem } from '../modules/topMenu';
import AddedList from '../components/AddedList';
import { categoryItemType, optionType } from '../utils/interfaces';
import { pageContext } from '../App';
import { clearAddedOptions } from '../modules/option';

interface paramType {
    item: categoryItemType;
    addedOptionList: optionType[];
}

function AddedListContainer() {
    const ctx = useContext(pageContext);
    const state = useSelector((state: RootState) => state);
    const [addedOptionList, item] = [state.option.addedOptionList, state.itemList!.selectedItem];
    const dispatch = useDispatch();

    const onPutItem = ({item, addedOptionList : options}: paramType)=>{
        const cartItem = {
            itemId : item.itemId,
            itemName : item.itemName,
            itemPrice : item.itemPrice,
            optionList : options,
            amount : 1
        }
        dispatch(setSelectedItem(item.itemId));
        dispatch(addItem(cartItem));
        dispatch(clearAddedOptions());
        ctx?.toggleMessage('상품이 장바구니에 추가되었습니다.');
        ctx?.togglePage('main'); // 메인화면 show
    }

    return (
        <AddedList item={item!} addedOptionList={addedOptionList} onPutItem={onPutItem}></AddedList>
    );
}

export default AddedListContainer;
