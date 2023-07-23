'use client'
import React from 'react'
import DefaultHomepage from './DefaultHomepage'
import UserHomepage from './UserHomepage'
import { useSession } from 'next-auth/react'

const Dashboard = ({defaultData}) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? <UserHomepage /> : <DefaultHomepage defaultData={defaultData}/>}
    </>
  )
}

export default Dashboard