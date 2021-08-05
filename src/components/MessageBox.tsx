import React, { useContext, useEffect } from 'react';
import { pageContext } from '../App';

interface Props {
    msg: string;
}

function MessageBox({msg}: Props){
    const ctx = useContext(pageContext);

    useEffect(()=>{
        setTimeout(()=> ctx?.toggleMessage(), 3500);
    }, []);

    return (
        <div className='message-box'>
            {msg}
        </div>
    );
}

export default MessageBox;