import React from "react";
import Image from "next/image";
import photo from "./iiitprep-logo.png";

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 left-0 w-full bg-white shadow-md flex items-center">
            {/* Logo on the Top Left */}
            <div className="ml-4">
                <Image src={photo} alt="IIITprep Logo" width={40} height={40} />
            </div>

            {/* Centered Text Content */}
            <div className="flex flex-col items-center w-full text-center">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-extrabold">
                        IIITprep UGEE Mock 9 - SUPR
                    </h1>
                    <span className="text-gray-600 text-xl">|</span>
                    <span className="text-gray-600 text-xl">
                        IIITprep UGEE Mock Test | Need subscription for Result
                    </span>
                </div>
                {/* Second Line - Answer Key & Solutions */}
                <span className="text-gray-600 text-xl mt-3">
                    Answer Key & Solutions
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
