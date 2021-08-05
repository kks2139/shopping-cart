import React, { useContext } from 'react';
import { pageContext } from '../App';
import {categoryItemType} from '../utils/interfaces';

interface paramType {
    itemId: string;
    categoryId: string;
}

interface Props {
    itemInfo: categoryItemType;
    categoryId: string;
    onItemClick: (param: paramType)=>void;
}

function Item({itemInfo, categoryId, onItemClick}: Props){
    const ctx = useContext(pageContext);
    
    const onClick = ()=>{
        if(itemInfo.itemSoldOutFlag){
            ctx!.toggleMessage('품절된 상품입니다.');
        }else if(itemInfo.selected){
            ctx!.toggleMessage('이미 추가된 상품입니다.');
        }else{
            onItemClick({
                itemId : itemInfo.itemId!, 
                categoryId 
            });
        }
    }

    return (
        <div className='item-box' onClick={onClick}>
            <div className='imgbox'>
                <img className={`pic ${itemInfo.itemSoldOutFlag || itemInfo.selected ? 'dark' : ''}`} src={itemInfo.itemImageUrl}></img>
                {itemInfo.itemSoldOutFlag ? <div className='soldout'>품절</div> : null}
                {itemInfo.selected ? <div className='added'>추가완료</div> : null}
            </div>
            <div className='info'>
                <div>{itemInfo.itemName}</div>
                <div>{itemInfo.itemPrice.toLocaleString()}</div>
            </div>
        </div>
    );
}

export default Item;