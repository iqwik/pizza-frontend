import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'primereact/dialog'
import 'primereact/components/dialog/Dialog.css'
import '../../modules/Cart/components/CheckoutDialog/CheckoutDialog.scss'

const SuccessDialog = ({
    children,
    visible,
    onHide,
}) => (
    <Dialog
        header="Success!"
        className="Checkout"
        visible={visible}
        onHide={onHide}
        >
        {children}
    </Dialog>
)

SuccessDialog.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
    onHide: PropTypes.func,
}

SuccessDialog.defaultProps = {
    children: null,
    visible: false,
    onHide: () => {},
}

export default SuccessDialog
