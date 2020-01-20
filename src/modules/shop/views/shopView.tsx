import React, { useState, FormEvent } from 'react';

import { ShopItem } from 'models';
import { ShopFilter, ShopItemList, useShop, SortOrder } from 'modules/shop';

export const ShopView: React.FC = () => {
    const [sortOrder, setSortOrder] = useState(SortOrder.PriceLowest);
    const [categories, items] = useShop();

    const itemsArr: ShopItem[] = Object.values(items);

    // const onSortOrderChanged = (e: FormEvent<HTMLSelectElement>) => {
    //     e.preventDefault();
    //
    //     const selectedSortOrder: SortOrder = SortOrder[Number(e.currentTarget.value)];
    //     setSortOrder(selectedSortOrder);
    // };

    return (
        <div className="ui container">
            <label>Sort By:</label>
            <select
                className="ui dropdown"
                value={sortOrder}>
                <option value={SortOrder.PriceLowest}>Price: Lowest</option>
                <option value={SortOrder.PriceHighest}>Price: Highest</option>
            </select>
            {/*<ShopFilter />*/}
            <ShopItemList items={itemsArr} />
        </div>
    );
};