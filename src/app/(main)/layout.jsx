import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const MainLaout = ({children}) => {
    return (
        <>
            {/* <Header /> */}
            <Navbar /> 
            <Footer />
            {children} 
        </>
    );
};

export default MainLaout;