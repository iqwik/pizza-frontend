export const currencyList = [
    { id: 1, value: 'usd' },
    { id: 2, value: 'eur' },
]

export const deliveryCost = { usd: 5, eur: 4.21 }

export const formatCurrency = (
    value,
    currency,
) => value.toLocaleString('en-US', { style: 'currency', currency })

/**
 * Update localStorage
 *   the action has 4 types:
 *     - add (add item to store)
 *     - update (change count)
 *     - clear (clear localStorage)
 *     - remove (remove item from store)
 */
export const updateStore = (action, item, num) => {
    let store
    const cart = JSON.parse(localStorage.getItem('cart')) || {}
    if (action === 'add') {
        let items
        let quantity = 1
        if (cart?.items) {
            const qty = cart.items?.[item.id]?.qty + 1 || 1
            items = { ...cart.items, [item.id]: { ...item, qty } }
            quantity = cart.quantity + 1
        } else {
            items = { [item.id]: { ...item, qty: 1 } }
        }
        store = { items, quantity }
    } else if (action === 'update' && cart?.items?.[item.id] && num > 0) {
        const oldQty = cart.items[item.id].qty
        cart.quantity -= oldQty
        cart.items[item.id].qty = num
        cart.quantity += num
        store = cart
    } else if (cart?.items?.[item.id] && (action === 'remove' || (num === 0 && action === 'update'))) {
        cart.quantity -= cart.items[item.id].qty
        delete cart.items[item.id]
        if (cart.quantity > 0) {
            store = cart
        } else {
            localStorage.clear()
        }
    } else if (action === 'clear') {
        localStorage.clear()
    }
    if (store) {
        localStorage.setItem('cart', JSON.stringify(store))
    }
    return store || {}
}

export const regexPatterns = {
    name: /^[A-Za-z\s]{2,}$/i,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^(((?=.*[a-z])(?=.*[A-Z]))|(?=.*[0-9])|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i,
}

export const validName = (name) => regexPatterns.name.test(name)
export const validEmail = (email) => regexPatterns.email.test(email)
export const validPassword = (password) => regexPatterns.password.test(password)

export const refactorOrdersData = (items) => items.map((o) => {
    const { address, cart, comment } = JSON.parse(o.order)
    const deliveryAddress = Object.entries(address).map(([key, value]) => `${key}: ${value}`).join(', ')
    return {
        ...cart,
        deliveryAddress,
        comment,
        date: o.date,
    }
})
