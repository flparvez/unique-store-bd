
import { auth } from '@/auth'
import CheckoutPage from '@/components/CheckoutPage'

import React from 'react'
export const metadata= {
  title: 'Order Page',
  description: 'Order Page Unique Store Bd',
}
const Checkout =async () => {
  const session = await auth()
  const user = session?.user
  return (
    <div>
      <CheckoutPage user={user} />
    </div>
  )
}

export default Checkout
