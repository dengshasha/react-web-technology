import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../css/header.css';

const logoIcon = require('../images/logo.png');

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to="/"><img src={logoIcon} alt="logo" className="header-logo"/> </NavLink>
                <nav>
                    <ul>
                        <li><NavLink to="/products" activeClassName="active"><p className="nav__text--English">Product</p><p className="nav__text--Chinese">产品</p></NavLink></li>
                        <li><NavLink to="/blog" activeClassName="active"><p className="nav__text--English">Blog</p><p className="nav__text--Chinese">博客</p></NavLink></li>
                        <li><NavLink to="/team" activeClassName="active"><p className="nav__text--English">Team</p><p className="nav__text--Chinese">团队</p></NavLink></li>
                        <li><NavLink to="/support" activeClassName="active"><p className="nav__text--English">Support</p><p className="nav__text--Chinese">支持</p></NavLink></li>
                        <li><NavLink to="/joinUs" activeClassName="active"><p className="nav__text--English">Join Us</p><p className="nav__text--Chinese">加入我们</p></NavLink></li>
                    </ul>
                </nav>
                {this.props.children}
            </header>
        )
    }
}

export default Header;
