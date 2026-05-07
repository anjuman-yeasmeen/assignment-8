import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content p-10 mt-20 border-t border-orange-100">
            <div className="footer container mx-auto flex flex-col md:flex-row justify-between gap-10">
                {/* Contact Info */}
                <aside>
                    <div className="flex items-center gap-2 mb-4">

                        <span className="text-xl font-bold tracking-tighter text-orange-600">HEATWAVE</span>
                    </div>
                    <p className="max-w-xs text-sm opacity-70">
                        Your premium destination for summer essentials. Keep it cool with SunCart's Heatwave collection.
                    </p>
                    <div className="mt-4 text-sm font-medium">
                        <p>Email: support@suncart.com</p>
                        <p>Phone: +880 1234 567890</p>
                    </div>
                </aside>

                {/* Quick Links / Policy */}
                <nav>
                    <h6 className="footer-title opacity-100 text-orange-600">Legal</h6>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>

                {/* Social Links */}
                <nav>
                    <h6 className="footer-title opacity-100 text-orange-600">Social Presence</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a className="text-2xl text-blue-600 hover:scale-110 transition-transform"><FaFacebook /></a>
                        <a className="text-2xl text-blue-400 hover:scale-110 transition-transform"><FaTwitter /></a>
                        <a className="text-2xl text-pink-500 hover:scale-110 transition-transform"><FaInstagram /></a>
                        <a className="text-2xl text-blue-700 hover:scale-110 transition-transform"><FaLinkedin /></a>
                    </div>
                </nav>
            </div>
            
            <div className="text-center mt-10 border-t border-base-300 pt-6 text-sm opacity-60">
                <p>Copyright © 2026 - All right reserved by SunCart Ltd</p>
            </div>
        </footer>
    );
};

export default Footer;