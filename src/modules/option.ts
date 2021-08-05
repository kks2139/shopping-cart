import {optionType} from '../utils/interfaces';

// 액션 종류
const CLEAR_ADDED_OPTIONS = 'option/CLEAR_ADDED_OPTIONS' as const;
const ADD_OPTION = 'option/ADD_OPTION' as const;
const DEL_OPTION = 'option/DEL_OPTION' as const;


// 액션 생성함수
export const clearAddedOptions = ()=> ({ 
    type : CLEAR_ADDED_OPTIONS
});
export const addOption = (opt: optionType)=> ({ 
    type : ADD_OPTION,
    payload : opt
});
export const deleteOption = (optId: string)=> ({ 
    type : DEL_OPTION,
    payload : optId
});


// 액션 타입
type actionType = 
    | ReturnType<typeof clearAddedOptions>
    | ReturnType<typeof addOption>
    | ReturnType<typeof deleteOption>;


// 초기상태 타입
type stateType = {
    addedOptionList: optionType[];
}

// 초기상태
const initialState: stateType = {
    addedOptionList : []
};

// 리듀서
function option(state: stateType = initialState, action: actionType) {
    switch (action.type) {
        case CLEAR_ADDED_OPTIONS:
            return {
                addedOptionList : []
            };
        case ADD_OPTION:
            return {
                addedOptionList : state.addedOptionList.concat({...action.payload})
            };
        case DEL_OPTION:
            return {
                addedOptionList : state.addedOptionList.filter(opt => opt.optionId !== action.payload)
            };
        default:
            return state;
  }
}

export default option;