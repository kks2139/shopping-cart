export interface optionType {
    optionId: string;
    optionName: string;
    optionPrice: number;
    check?: boolean;  
}

export interface categoryItemType {
    itemId: string;
    itemName: string;
    itemPrice: number;
    itemSoldOutFlag: boolean;
    itemImageUrl: string;
    itemOptions: optionType[];
    selected?: boolean;
}

export interface categoryType {
    categoryId: string;
    categoryName: string;
    categoryItems: categoryItemType[]
}

export interface optionListType { // 
    itemId: string;
    itemName: string;
    itemPrice: number;
    optionList: optionType[];
}

export interface cartItemType extends optionListType {
    amount: number;
}


// export interface optionType {
//     optionId: string;
//     optionName: string;
//     optionPrice: number;
// }

// export interface categoryItemType {
//     itemId: string,
//     itemName: string,
//     itemPrice: number,
//     itemSoldOutFlag: boolean,
//     itemImageUrl: string,
//     itemOptions: optionType[]
//     selected?: boolean 
// }

// export interface categoryType {
//     categoryId: string,
//     categoryName: string,
//     categoryItems: categoryItemType[]
// }


// export interface optionListType {
//     itemId: string;
//     itemName: string;
//     itemPrice: number;
//     optionList: optionType[];
// }

// export interface cartItemType extends optionListType {
//     amount: number;
// }