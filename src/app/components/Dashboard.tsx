'use client';
import React from 'react';
import DefaultHomepage from './DefaultHomepage';
import UserHomepage from './UserHomepage';
import { useSession } from 'next-auth/react';

type DashboardProps = {
  defaultData: string;
};

const Dashboard: React.FC<DashboardProps> = ({ defaultData }) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <UserHomepage />
      ) : (
        <DefaultHomepage defaultData={defaultData} />
      )}
    </>
  );
};

export default Dashboard;
