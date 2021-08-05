import {categoryType} from '../utils/interfaces';

// 액션 종류
const SET_CATEGORY_LIST = 'topMenu/SET_CATEGORY_LIST' as const;
const SELECT_CATEGORY = 'topMenu/SELECT_CATEGORY' as const;
const SET_SELECTED_ITEM = 'topMenu/SET_SELECTED_ITEM' as const;
const DEL_SELECTED_ITEM = 'topMenu/DEL_SELECTED_ITEM' as const;
const CLEAR_SELECTED_ITEM = 'topMenu/CLEAR_SELECTED_ITEM' as const;


// 액션 생성함수
export const setCategoryList = (list: categoryType[])=> ({ 
    type : SET_CATEGORY_LIST,
    payload : list
});
export const selectCategory = (id: string)=> ({ 
    type : SELECT_CATEGORY,
    payload : id
});
export const setSelectedItem = (id: string)=> ({ 
    type : SET_SELECTED_ITEM,
    payload : id
});
export const deleteSelectedItem = (id: string)=> ({ 
    type : DEL_SELECTED_ITEM,
    payload : id
});
export const clearSelectedItem = ()=> ({ 
    type : CLEAR_SELECTED_ITEM
});



// 액션의 타입
type actionType = 
    | ReturnType<typeof setCategoryList>
    | ReturnType<typeof selectCategory>
    | ReturnType<typeof setSelectedItem>
    | ReturnType<typeof deleteSelectedItem>
    | ReturnType<typeof clearSelectedItem>;


// 초기상태 타입
type stateType = {
    cateList: categoryType[];
    selectedId : string;
}

// 초기상태 선언
const initialState: stateType = {
    cateList : [],
    selectedId : ''
};

// 리듀서
function topMenu(state: stateType = initialState, action: actionType) {
    switch (action.type) {
        case SET_CATEGORY_LIST:
            return {
                ...state,
                cateList : action.payload.slice()
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedId : action.payload
            };
        case SET_SELECTED_ITEM:
            var id = action.payload;
            var newList = state.cateList.filter(cate => cate.categoryItems.map(item => {
                if(item.itemId === id) return item.selected = true;
                else return item;
            }));
            return {
                ...state,
                cateList : newList
            };
        case DEL_SELECTED_ITEM:
            var id = action.payload;
            var newList = state.cateList.filter(cate => cate.categoryItems.filter(item => {
                if(item.itemId === id) return item.selected = false;
                else return item;
            }));
            return {
                ...state,
                cateList : newList
            };
        case CLEAR_SELECTED_ITEM:
            return {
                ...state,
                caetList : state.cateList.filter(cate => cate.categoryItems.map(item => {
                    item.selected = false;
                    return item;
                }))
            };
        default:
            return state;
  }
}

export default topMenu;