import Navbar from '@/components/shared/Navbar';
import React from 'react';

const AuthLayout = ({children} ) => {
    return (
        <>
          <Navbar /> 
          {children} 
        </>
    );
};

export default AuthLayout;