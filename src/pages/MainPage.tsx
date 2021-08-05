import React, {useEffect, useRef, useState} from 'react';
import TopMenuContainer from '../containers/TopMenuContainer';
import ItemListContainer from '../containers/ItemListContainer';
import Footer from '../components/Footer';
import CartContainer from '../containers/CartContainer';

function MainPage() {
    const [showCart, setShowCart] = useState(false);

    const onClickCart = ()=>{
        pageShrink(true);
    }
    const onCloseCart = ()=>{
        pageShrink(false);
    }

    const pageShrink = (shrink: boolean)=>{
        const itemListBox = document.querySelector('#itemListBox');
        itemListBox?.classList.toggle('shrink');
        setShowCart(shrink);
    }

    return (
        <div className="main-page">
            <TopMenuContainer></TopMenuContainer>
            <ItemListContainer></ItemListContainer>
            <Footer onClickCart={onClickCart}></Footer>
            {showCart ? <CartContainer onClose={onCloseCart}></CartContainer> : null}
        </div>
    );
}

export default MainPage;
