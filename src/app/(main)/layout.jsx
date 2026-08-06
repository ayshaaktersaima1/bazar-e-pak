import Footer from '@/components/shared/Footer';
import LenisProvider from '@/components/shared/LenisProvider';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div>
            <Navbar></Navbar>
            <LenisProvider>
                {children}
            </LenisProvider>
            <Footer></Footer>
        </div>
    );
};

export default layout;