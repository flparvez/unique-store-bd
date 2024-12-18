import React from 'react'
import Navbar from './HeaderSection'
import { auth } from '@/auth'

const Header =async () => {
    const session = await auth()
    const user = session?.user
  return (
    <div >
      <Navbar user={user}  />
    </div>
  )
}

export default Header
