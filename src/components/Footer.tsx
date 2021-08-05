import React from 'react';
import {FiShoppingBag} from 'react-icons/fi';

interface Props {
    onClickCart: ()=> void;
}

function Footer({onClickCart}: Props){
    const onClick = ()=>{
        onClickCart();
    }

    return (
        <div className='footer-box'>
            <div className='wrapper' onClick={onClick}>
                <FiShoppingBag size='25' color='white'></FiShoppingBag>
                <div>장바구니</div>
            </div>
        </div>
    );
}

export default Footer;