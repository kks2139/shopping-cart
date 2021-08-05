import { combineReducers } from 'redux';
import topMenu from './topMenu';
import itemList from './itemList';
import cart from './cart';
import option from './option';

// 쪼개진 리듀서들을 하나로 합친다
const rootReducer = combineReducers({
    topMenu,
    itemList,
    cart,
    option
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;