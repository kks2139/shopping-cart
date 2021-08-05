import React, {useEffect, useRef} from 'react';
import {categoryType} from '../utils/interfaces';
import Item from './Item';

interface paramType {
    itemId: string;
    categoryId: string;
}

interface Props {
    cateList: categoryType[];
    onItemClick: (param: paramType)=>void;
}

function ItemList({cateList, onItemClick}: Props){
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        // Scrollspy 처리
        divRef.current!.onscroll = ()=>{
            const titles: NodeListOf<HTMLDivElement> = divRef.current!.querySelectorAll('div.title[id]');
            const top = divRef.current!.scrollTop;
            const scrollH = divRef.current!.scrollHeight;
            const divH = divRef.current!.offsetHeight;

            if(top + divH + 30 >= scrollH){
                document.querySelector('.topmenu-cate-list a.active')?.classList.remove('active');
                const a = document.querySelector(`.topmenu-cate-list a[data-id]:last-child`);
                a?.classList.add('active');
            }else{
                for (let i = 0; i < titles.length; i++) {
                    const tit = titles[i];
    
                    if(tit.offsetTop - 200 <= top) {
                        document.querySelector('.topmenu-cate-list a.active')?.classList.remove('active');
                        const a = document.querySelector(`.topmenu-cate-list a[data-id=${tit.id}]`);
                        a?.classList.add('active');
                    }
                }
            }
        }
    }, []);

    return (
        <div id='itemListBox' className='itemList-box' ref={divRef}>
            <div className='wrapper'>
            {cateList.map(cate => 
                <div key={cate.categoryId}>
                    <div className='title' id={`cate_${cate.categoryId}`}>
                        {cate.categoryName}
                    </div>
                    <section>
                        {cate.categoryItems.map(item => 
                            (<Item key={item.itemId} itemInfo={item} categoryId={cate.categoryId} onItemClick={onItemClick}></Item>)
                        )}
                    </section>
                </div>
            )}
            </div>
        </div>
    );
}

export default ItemList;