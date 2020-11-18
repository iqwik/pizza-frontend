import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import './Spinner.scss'

const className = cn('Pizza-Spinner')

const pizzaSlices = (count) => {
    const r = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
        r.push(<div key={`slice-${i}`} className="slice"></div>)
    }
    return r
}

const Spinner = ({ visible }) => (
    <div className={className({ visible })}>
        <div className="pizza">
            {pizzaSlices(13)}
        </div>
    </div>
)

Spinner.propTypes = {
    visible: PropTypes.bool,
}

Spinner.defaultProps = {
    visible: false,
}

export default Spinner
