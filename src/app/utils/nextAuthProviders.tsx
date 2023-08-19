'use client'

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
}

const NextAuthProviders = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProviders;