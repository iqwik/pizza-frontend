import React from 'react'
import { cn } from '@bem-react/classname'
import { OverlayPanel } from 'primereact/overlaypanel'
import CartGrid from './components/CartGrid'
import 'primereact/components/overlaypanel/OverlayPanel.css'
import './CartDialog.scss'

const className = cn('Cart-Dialog')

const CartDialog = React.forwardRef(({ ...props }, ref) => (
    <OverlayPanel className={className()} ref={ref} {...props}>
        <CartGrid />
    </OverlayPanel>
))

export default CartDialog
