import { ShopItem, ShopItems, Category, Categories, Filter } from 'models';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_ITEM = 'GET_ITEM';
export const GET_ITEMS = 'GET_ITEMS';
export const UPDATE_SHOP_FILTER = 'UPDATE_SHOP_FILTER';

export interface GetCategoryAction {
    type: typeof GET_CATEGORY;
    payload: Category;
}

export interface GetCategoriesAction {
    type: typeof GET_CATEGORIES;
    payload: Categories;
}

export interface GetItemAction {
    type: typeof GET_ITEM;
    payload: ShopItem;
}

export interface GetItemsAction {
    type: typeof GET_ITEMS;
    payload: ShopItems;
}

export interface UpdateShopFilterAction {
    type: typeof UPDATE_SHOP_FILTER;
    payload: Filter;
}

export type ShopAction =
    GetCategoryAction
    | GetCategoriesAction
    | GetItemAction
    | GetItemsAction
    | UpdateShopFilterAction;
