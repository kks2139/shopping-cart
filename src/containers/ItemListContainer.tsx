import React , {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../modules/index';
import { setSelectedItem as selectItem } from '../modules/itemList';
import { setSelectedItem } from '../modules/topMenu';
import ItemList from '../components/ItemList';
import { addItem } from '../modules/cart';
import {pageContext} from '../App';

interface paramType {
    itemId: string;
    categoryId: string;
}

function ItemListContainer() {
    const ctx = useContext(pageContext);
    const {cateList} = useSelector((state: RootState) => state.topMenu);
    const dispatch = useDispatch();

    const onItemClick = (param: paramType)=>{
        // 상품탐색
        const item = getSelectedItem(param);

        if(item.itemOptions.length > 0){
            dispatch(selectItem(item));
            // 옵션리스트 화면 show 
            ctx!.togglePage('option');
        }else{
            const cartItem = {
                itemId : item.itemId,
                itemName : item.itemName,
                itemPrice : item.itemPrice,
                optionList : [],
                amount : 1
            }
            dispatch(setSelectedItem(item.itemId));
            dispatch(addItem(cartItem));
            ctx?.toggleMessage('상품이 장바구니에 추가되었습니다.');
        }

    }

    const getSelectedItem = ({itemId, categoryId}: paramType)=>{
        const cate = cateList.filter(c => Number(c.categoryId) === Number(categoryId));
        const item = cate[0].categoryItems.filter(c => Number(c.itemId) === Number(itemId))[0];

        return  {
            ...item,
            itemOptions : item.itemOptions.map((opt, i) => {
                opt.check = i === 0;
                return opt;
            })
        }

    }

    return (
        <ItemList cateList={cateList} onItemClick={onItemClick}></ItemList>
    );
}

export default ItemListContainer;
