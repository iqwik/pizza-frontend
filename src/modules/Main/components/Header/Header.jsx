import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import AuthButton from './components/AuthButton'
import CurrencyDropdown from './components/CurrencyDropdown'
import CartButton from './components/CartButton'
import './Header.scss'

const className = cn('Header')

const logoText = 'Love PIZZA!'

const Header = ({
    authButton,
    cartButton,
    currencyButton,
    logoLink,
}) => (
    <header className={className()}>
        <nav className={className('Nav')}>
            {logoLink
                ? (<NavLink className={className('Logo')} to="/">{logoText}</NavLink>)
                : (<div className={className('Logo')}>{logoText}</div>)}
            <div className={className('Buttons')}>
                {authButton ? <AuthButton /> : null}
                {currencyButton ? <CurrencyDropdown /> : null}
                {cartButton ? <CartButton /> : null}
            </div>
        </nav>
    </header>
)

Header.propTypes = {
    authButton: PropTypes.bool,
    cartButton: PropTypes.bool,
    currencyButton: PropTypes.bool,
    logoLink: PropTypes.bool,
}

Header.defaultProps = {
    authButton: true,
    cartButton: true,
    currencyButton: true,
    logoLink: true,
}

export default Header
