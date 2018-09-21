import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';

import { menuList } from './data';

class SidenavContent extends Component {

  componentDidUpdate() {
    const that = this;

    const menuLi = document.getElementsByClassName('menu');
    for (let j = 0; j < menuLi.length; j++) {
      menuLi[j].classList.remove('open');
    }

    const sidebarMenu = document.querySelector('ul#sidebarMenu');
    const activeLi = sidebarMenu.querySelector('a.selected'); // select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {}
  }

  componentDidMount() {
    const that = this;

    const subMenuLi = document.querySelectorAll('.sub-menu > li');
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function(event) {
        event.stopPropagation();
      };
    }

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open');
          }
        }
        this.classList.toggle('open');
        event.stopPropagation();
      };
    }

    const sidebarMenu = document.querySelector('ul#sidebarMenu');
    const activeLi = sidebarMenu.querySelector('a.selected'); // select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul id="sidebarMenu" className="nav-menu">
          <li className="nav-header">
            <IntlMessages id="sidebar.main" />
          </li>

          {menuList.map(
            (items, index) =>
              items.submenu ? (
                <li key={index} className="menu collapse-box">
                  <Button href="javascript:void(0)">
                    {items.text ? (
                      <i className={`zmdi zmdi-hc-fw`}>{items.text}</i>
                    ) : (
                      <i className={`zmdi ${items.icon} zmdi-hc-fw`} />
                    )}
                    <span className="nav-text">
                      <IntlMessages id={items.menu} />
                    </span>
                  </Button>
                  <ul className="sub-menu">
                    {items.submenu.map((subitems, idx) => (
                      <li key={idx}>
                        <NavLink activeClassName="selected" className="prepend-icon" to={subitems.link}>
                          <span className="nav-text">
                            <IntlMessages id={subitems.name} />
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index} className="menu no-arrow">
                  <NavLink to={items.link} activeClassName="selected">
                    {items.text ? (
                      <i className={`zmdi zmdi-hc-fw`}>{items.text}</i>
                    ) : (
                      <i className={`zmdi ${items.icon} zmdi-hc-fw`} />
                    )}

                    <span className="nav-text">
                      <IntlMessages id={items.menu} />
                    </span>
                  </NavLink>
                </li>
              ),
          )}
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
