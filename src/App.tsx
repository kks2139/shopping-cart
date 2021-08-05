import React, { createContext, useEffect, useState } from 'react';
import './Styles.css';
import MainPage from './pages/MainPage';
import OptionPage from './pages/OptionPage';
import MessageBox from './components/MessageBox';
import {setCategoryList} from './modules/topMenu';
import { useDispatch } from 'react-redux';
import UT from './utils/util';


interface contextType {
  togglePage: (page: 'main' | 'option')=>void;
  toggleMessage: (msg?: string)=>void;
}

export const pageContext = createContext<contextType | null>(null);

function App() {
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(true);
  const [msgInfo, setMsgInfo] = useState({show : false, msg : ''});

  const togglePage = (page: string)=>{
    setShowMain(page === 'main' ? true : false);
  }
  
  const toggleMessage = (msg?: string)=>{
    setMsgInfo({
      show : msg ? true : false,
      msg : msg || ''
    });
  }

  const getCategoryList = async ()=>{
    // 카테고리 목록 조회
    const result = await UT.request('mock.json');
    dispatch(setCategoryList(result.categories));
  }

  useEffect(()=>{
      getCategoryList();
  }, []);

  return (
    <pageContext.Provider value={{togglePage, toggleMessage}}>
      <div className="App">
        {showMain ? 
          <MainPage/> :
          <OptionPage/>
        }
        {msgInfo.show ? <MessageBox msg={msgInfo.msg}></MessageBox> : null}
      </div>
    </pageContext.Provider>
  );
}

export default App;
