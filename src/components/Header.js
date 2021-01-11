import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <div className="container">
            <h2 className="header__title">{props.title}</h2>
            {props.subtitle && <p className="header__subtitle">{props.subtitle}</p>}
            </div>
       </div>
    );
}

Header.defaultProps = {
    title: "Indecision App"
};

export default Header;