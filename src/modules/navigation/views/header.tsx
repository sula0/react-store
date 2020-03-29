import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectAuthInfo, selectIsAdmin, attemptSignOut } from 'modules/authentication';
import { selectCartItemCount } from 'modules/cart';
import { useShopFilter, updateShopFilter } from 'modules/shop';

export const Header: React.FC = () => {
    const { isSignedIn, user } = useSelector(selectAuthInfo);
    const { username } = user || {};
    const isAdmin = useSelector(selectIsAdmin);
    const cartItemCount = useSelector(selectCartItemCount);

    const [filter] = useShopFilter();
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

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm);
        dispatch(updateShopFilter({ ...filter, searchString: searchTerm }));
    };

    return (
        <div className="ui tabular menu">
            <span>Hi!{' '}{renderAuth()}</span>
            <Link className={getTabStyle('/home')} to="/home">Home</Link>
            <Link className={getTabStyle('/listing')} to="/listing">Listing</Link>
            <Link className={getTabStyle('/faq')} to="/faq">FAQ</Link>
            {isAdmin && <Link to="/admin" className={getTabStyle('/admin')}>Administration</Link>}
            <div className="ui tabular right menu">
                <div className="ui icon input">
                    <input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={onSearchChange} />
                    <i className="circular search link icon" />
                </div>
                <div>
                    <Link to="/cart" className={getTabStyle('/cart')}>
                        {cartItemCount > 0 &&
                        <div className="ui teal right pointing label">{cartItemCount}</div>}
                        Cart
                    </Link>
                </div>
                {isSignedIn
                    ? <button className="item" onClick={() => dispatch(attemptSignOut())}>Sign Out</button>
                    : null}
            </div>
        </div>
    );
};