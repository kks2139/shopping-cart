import { CallTracker } from 'assert';
import React, { useEffect, useRef } from 'react';
import {categoryType} from '../utils/interfaces';

interface Props {
    cateList: categoryType[];
    selectedId: string;
    onSelect: (s: string)=> void;
}

function TopMenu({cateList, selectedId, onSelect}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.stopPropagation();
        onSelect(e.currentTarget.dataset.id!);
    }

    return (
        <div className="topmenu-box">
            <div className='topmenu-cate-list' ref={divRef}> 
                {cateList!.map((cate, i) => 
                    (<a 
                        key={cate.categoryId} 
                        className={i === 0 ? 'active' : ''}
                        data-id={`cate_${cate.categoryId}`} 
                        onClick={onClick}
                        href={`#cate_${cate.categoryId}`}>
                        {cate.categoryName}
                    </a>)
                )}
            </div>
            <div className='topmenu-table-info'>
                <div className='table'>
                    <div>주문전화 02-123-4567</div>
                    <div>냠냠피자</div>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;
