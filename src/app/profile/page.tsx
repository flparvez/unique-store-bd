import ProfilePage from '@/components/ProfilePage'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'My Account',
  description: 'My Account Unique Store Bd',
}
const Profile = () => {
  return (
    <div>
      <ProfilePage />
    </div>
  )
}

export default Profile
