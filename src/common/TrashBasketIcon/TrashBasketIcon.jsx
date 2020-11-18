import React from 'react'
import PropType from 'prop-types'
import './TrashBasketIcon.scss'

const TrashBasketIcon = ({ onClick }) => (
    <div className="trash-wrapper" onClick={onClick}>
        <svg width="20" height="20" fill="none" className="trash">
            <path
                d="M14.75 6h-9.5l.66 9.805c.061 1.013.598 1.695 1.489 1.695H12.6c.89 0 1.412-.682 1.49-1.695L14.75 6z"
                fill="#373536"
                >
            </path>
            <path
                d="M13.85 3.007H6.196C4.984 2.887 5.021 4.365 5 5h9.992c.024-.62.07-1.873-1.142-1.993z"
                fill="#373535"
                >
            </path>
        </svg>
    </div>
)

TrashBasketIcon.propTypes = {
    onClick: PropType.func,
}

TrashBasketIcon.defaultProps = {
    onClick: () => {},
}

export default TrashBasketIcon
