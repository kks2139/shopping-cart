import {cartItemType} from '../utils/interfaces';

// 액션 종류
const SET_SHOW_CART = 'cart/SET_SHOW_CART' as const;
const ADD_ITEM = 'cart/ADD_ITEM' as const;
const DEL_ITEM = 'cart/DEL_ITEM' as const;
const ADD_ITEM_AMOUNT = 'cart/ADD_ITEM_AMOUNT' as const;
const DEL_ITEM_AMOUNT = 'cart/DEL_ITEM_AMOUNT' as const;
const CLEAR_CART_ITEMS = 'cart/CLEAR_CART_ITEMS' as const;


// 액션 생성함수
export const setShowCart = (show: boolean)=> ({ 
    type : SET_SHOW_CART,
    payload : show
});
export const addItem = (item: cartItemType)=> ({ 
    type : ADD_ITEM,
    payload : item
});
export const deleteItem = (id: string)=> ({ 
    type : DEL_ITEM,
    payload : id
});
export const addItemAmount = (id: string)=> ({ 
    type : ADD_ITEM_AMOUNT,
    payload : id
});
export const deleteItemAmount = (id: string)=> ({ 
    type : DEL_ITEM_AMOUNT,
    payload : id
});
export const clearCartItems = ()=> ({ 
    type : CLEAR_CART_ITEMS
});


// 액션함수 타입
type actionType = 
    | ReturnType<typeof setShowCart>
    | ReturnType<typeof addItem>
    | ReturnType<typeof deleteItem>
    | ReturnType<typeof addItemAmount>
    | ReturnType<typeof deleteItemAmount>
    | ReturnType<typeof clearCartItems>;


// 초기상태 타입
type stateType = {
    show: boolean;
    cartItemList: cartItemType[]
}


// 초기상태
const initialState: stateType = {
    show : false,
    cartItemList : []
};


// 리듀서
function cart(state: stateType = initialState, action: actionType) {
    switch (action.type) {
        case SET_SHOW_CART:
            return {
                ...state,
                show : action.payload
            };
        case ADD_ITEM:
            return {
                ...state,
                cartItemList : state.cartItemList.concat(action.payload)
            };
        case DEL_ITEM:
            return {
                ...state,
                cartItemList : state.cartItemList.filter(c => c.itemId !== action.payload)
            };
        case ADD_ITEM_AMOUNT:
            return {
                ...state,
                cartItemList : state.cartItemList.map(c => {
                    if(c.itemId === action.payload) c.amount++;
                    return {...c};
                })
            };
        case DEL_ITEM_AMOUNT:
            return {
                ...state,
                cartItemList : state.cartItemList.map(c => {
                    if(c.itemId === action.payload) c.amount--;
                    return {...c};
                })
            };
        case CLEAR_CART_ITEMS:
            return {
                ...state,
                cartItemList : []
            };
        default:
            return state;
  }
}

export default cart;