import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cn } from '@bem-react/classname'
import { Dialog } from 'primereact/dialog'
import OrderForm from './components/OrderForm'
import * as selectors from '../../model/selectors'
import * as selectorsAuth from '../../../Auth/model/selectors'
import * as actions from '../../model/actions'
import 'primereact/components/dialog/Dialog.css'
import './CheckoutDialog.scss'

const className = cn('Checkout')

const CheckoutDialog = ({
    setShowCheckoutDialog,
    showCheckoutDialog,
    userData,
}) => (
    <Dialog
        header="Checkout"
        className={className()}
        visible={showCheckoutDialog}
        onHide={() => setShowCheckoutDialog(false)}
        >
        <OrderForm userData={userData} />
    </Dialog>
)

CheckoutDialog.propTypes = {
    setShowCheckoutDialog: PropTypes.func.isRequired,
    showCheckoutDialog: PropTypes.bool.isRequired,
    userData: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            house: PropTypes.string,
            apartment: PropTypes.string,
            entrance: PropTypes.string,
            floor: PropTypes.string,
        }),
    }).isRequired,
}

const mapStateToProps = (state) => ({
    showCheckoutDialog: selectors.getShowCheckoutDialog(state),
    userData: selectorsAuth.getUserData(state),
})

const mapDispatchToProps = ({
    setShowCheckoutDialog: actions.setShowCheckoutDialog,
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDialog)
