import {categoryItemType} from '../utils/interfaces';

// 액션 종류
const SET_SELECTED_ITEM = 'itemList/SET_SELECTED_ITEM' as const;
const CHECK_OPTION = 'itemList/CHECK_OPTION' as const;
const UNCHECK_OPTION = 'itemList/UNCHECK_OPTION' as const;
const UNCHECK_OPTION_ALL = 'itemList/CHECK_OPTION_ALL' as const;


// 액션 생성함수
export const setSelectedItem = (item: categoryItemType)=> ({ 
    type : SET_SELECTED_ITEM,
    payload : item
});
export const checkOption = (optId: string)=> ({ 
    type : CHECK_OPTION,
    payload: optId
});
export const uncheckOption = (optId: string)=> ({ 
    type : UNCHECK_OPTION,
    payload: optId
});
export const uncheckOptionAll = ()=> ({ 
    type : UNCHECK_OPTION_ALL
});


// 액션의 타입
type actionType = 
    | ReturnType<typeof setSelectedItem>
    | ReturnType<typeof checkOption>
    | ReturnType<typeof uncheckOption>
    | ReturnType<typeof uncheckOptionAll>;

    

// 초기상태 타입
type stateType = {
    selectedItem: categoryItemType | null;
}

// 초기상태
const initialState: stateType = {
    selectedItem : null
};

// 리듀서
function itemList(state: stateType = initialState, action: actionType) {
    switch (action.type) {
        case SET_SELECTED_ITEM:
            return {
                selectedItem : action.payload ? {...action.payload} : null
            };
        case CHECK_OPTION:
            return {
                selectedItem : state.selectedItem ? {
                    ...state.selectedItem,
                    itemOptions : state.selectedItem.itemOptions.map((opt, i) => {
                        if(opt.optionId === action.payload){
                            opt.check = true;
                        }else if(Number(opt.optionId) === 0){
                            opt.check = false;
                        }
                        
                        return opt;
                    })
                } : null
            };
        case UNCHECK_OPTION:
            return {
                selectedItem : state.selectedItem ? {
                    ...state.selectedItem,
                    itemOptions : state.selectedItem.itemOptions.map(opt => {
                        if(opt.optionId === action.payload){
                            opt.check = false;
                        }
                        return opt;
                    })
                } : null
            }
        case UNCHECK_OPTION_ALL:
            return {
                selectedItem : state.selectedItem ? {
                    ...state.selectedItem,
                    itemOptions : state.selectedItem.itemOptions.map((opt, i) => {
                        opt.check = i === 0 ? true : false;
                        return opt;
                    })
                } : null
            }
        default:
            return state;
    }
    
}

export default itemList;