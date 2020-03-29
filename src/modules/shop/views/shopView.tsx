import React from 'react';
import { useDispatch } from 'react-redux';

import { ShopItem, Category, Filter } from 'models';
import {
    ShopFilter,
    ShopItemList,
    useShop,
    useShopFilter,
    updateShopFilter
} from 'modules/shop';

export const ShopView: React.FC = () => {
    const [filter] = useShopFilter();
    const [categories, items] = useShop(filter);

    const categoriesArr: Category[] = Object.values(categories);
    const itemsArr: ShopItem[] = Object.values(items);

    const dispatch = useDispatch();

    const onFilterSubmit = (filter: Filter) => {
        dispatch(updateShopFilter(filter));
    };

    return (
        <div className="ui container">
            <div className="ui two row grid center aligned">
                <div className="row">
                    <ShopFilter
                        categories={categoriesArr}
                        initialFilter={filter}
                        onSubmit={onFilterSubmit} />
                </div>
                <div className="row">
                    <ShopItemList items={itemsArr} />
                </div>
            </div>
        </div>
    );
};