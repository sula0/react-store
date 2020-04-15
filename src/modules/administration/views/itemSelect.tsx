import React, { useState, useEffect } from 'react';

import { ShopItem, Category } from 'models';

interface ItemSelectProps {
    items: ShopItem[];
    categories: Category[];
    onClickItem: (item: ShopItem) => void;
}

export const ItemSelect: React.FC<ItemSelectProps> = ({ items, categories, onClickItem }) => {
    const [selectedItem, setSelectedItem] = useState();
    const [openCategories, setOpenCategories] = useState([] as Array<string>);

    useEffect(() => {
        setOpenCategories(categories.map(c => c.id));
    }, [items, categories]);

    const onSelectItem = (e: React.MouseEvent<HTMLDivElement>, item: ShopItem) => {
        e.preventDefault();

        setSelectedItem(item);

        onClickItem(item);
    };

    const onClickCategory = (id: string) => {
        if (openCategories.includes(id)) {
            setOpenCategories(openCategories.filter(categoryId => categoryId !== id))
        } else {
            setOpenCategories([...openCategories, id]);
        }
    }

    const renderItem = (item: ShopItem, contentStyle: string) => {
        const isSelectedItem: boolean = selectedItem && selectedItem.id === item.id;
        const buttonStyle = `ui basic ${isSelectedItem ? 'active red' : ''} button fluid borderless`;

        return (
            <div className={contentStyle} key={item.id} onClick={(e) => onSelectItem(e, item)}>
                <button className={buttonStyle}>
                    <div className="ui tiny left aligned text container">
                        {item.name}
                    </div>
                </button>
            </div>
        );
    };

    return (
        <div>
            {categories && categories.map(c => {
                const categoryItems = items.filter(i => i.category === c.name);

                if (!categoryItems) {
                    return null;
                }

                const isCategoryActive: boolean = openCategories.includes(c.id);
                const contentStyle = `${isCategoryActive ? 'active' : ''} content`;

                return (
                    <div className="column ui accordion" key={c.id}>
                        <div className="title" onClick={() => onClickCategory(c.id)}>
                            {c.name}
                        </div>
                        {categoryItems.map(i => {
                            return renderItem(i, contentStyle);
                        })}
                    </div>
                );
            })}
        </div>
    );
};