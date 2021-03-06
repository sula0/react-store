import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectAuthInfo, selectIsAdmin, attemptSignOut } from 'modules/authentication';
import { expandCart, collapseCart, selectCartItemCount, selectCartVisible } from 'modules/cart';
import { updateShopFilter, shopFilterSelector } from 'modules/shop';

export const Header: React.FC = () => {
    const { isSignedIn, user } = useSelector(selectAuthInfo);
    const { username } = user || {};
    const isAdmin = useSelector(selectIsAdmin);

    const cartVisible = useSelector(selectCartVisible);
    const cartItemCount = useSelector(selectCartItemCount);

    const filter = useSelector(shopFilterSelector);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const renderAuth = () => {
        if (user) {
            return <div className="ui center aligned">{username}</div>;
        }

        return (
            <span>
                <Link to="/login">Sign in</Link>
                {' '}or{' '}
                <Link to="/register">register</Link>
                !
            </span>
        );
    };

    const { pathname } = useLocation();
    const getTabStyle = (linkPath: string) => {
        return linkPath === pathname
            ? 'active item'
            : 'item';
    };

    const setActiveTab = (linkPath: string) => linkPath === pathname ? 'active' : '';

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm);
    };

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(updateShopFilter({ ...filter, searchString: searchTerm }));
    };

    const onClickCart = () => {
        if (cartVisible) {
            dispatch(collapseCart());
        } else {
            dispatch(expandCart());
        }
    };

    return (
        <div className="ui tabular menu">
            <span className="item">Hi!&nbsp;{renderAuth()}</span>
            <Link className={`${setActiveTab('/home') || setActiveTab('/')} item`} to="/home">Home</Link>
            <Link className={`${setActiveTab('/listing')} item`} to="/listing">Listing</Link>
            <Link className={`${setActiveTab('/cart')} item`} to="/cart">Cart</Link>
            <Link className={`${setActiveTab('/faq')} item`} to="/faq">FAQ</Link>
            {isAdmin && <Link to="/admin" className={getTabStyle('/admin')}>Administration</Link>}
            <div className="item">
                <div className="ui icon input">
                    <form className="ui form" onSubmit={onSearchSubmit}>
                        <input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={onSearchChange} />
                    </form>
                    <i className="circular search link icon" />
                </div>
            </div>
            <div className="right item">
                <button className="ui icon button" onClick={onClickCart}>
                    <i className="shopping cart icon" />
                    {cartItemCount > 0 &&
                        <div className="ui teal right pointing label">{cartItemCount}</div>}
                </button>
            </div>
            {isSignedIn
                ? <button className="item" onClick={() => dispatch(attemptSignOut())}>Sign Out</button>
                : null}
        </div>
    );
};