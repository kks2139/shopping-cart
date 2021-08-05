import React, {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../modules/index';
import {setSelectedItem} from '../modules/itemList';
import {clearAddedOptions} from '../modules/option';
import {uncheckOptionAll} from '../modules/itemList';
import {pageContext} from '../App';
import OptionListContainer from '../containers/OptionListContainer';
import AddedListContainer from '../containers/AddedListContainer';

function OptionPage() {
  const ctx = useContext(pageContext);
  const item = useSelector((state: RootState) => state.itemList!.selectedItem);
  const dispatch = useDispatch();

  const onClosePage = ()=>{
    dispatch(clearAddedOptions());
    ctx!.togglePage('main');
  }

  return (
    <div className="option-page">
      <div className='wrapper'>
        <div className='header'>
          <div className='title'>{item?.itemName}</div>
          <div className='close' onClick={onClosePage}>X 닫기</div>
        </div>
        <div className='content-wrapper'>
          <OptionListContainer item={item!}></OptionListContainer>  
          <AddedListContainer></AddedListContainer>
        </div>
      </div>
    </div>
  );
}

export default OptionPage;
