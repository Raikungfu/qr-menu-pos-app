function Loading() {

    return (
        // <div className='flex justify-center items-center h-screen bg-gray-100'>
        //     <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader animate-spin-slow"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
        // </div>
        <div className='flex justify-center items-center h-screen'>
            <svg className='svg-animation'>
                <g className='g-animation'>
                    <path className='path-animation' d="M 50,100 A 1,1 0 0 1 50,0" />
                </g>
                <g className='g-animation'>
                    <path className='path-animation' d="M 50,75 A 1,1 0 0 0 50,-25" />
                </g>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FF56A1', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#FF9350', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default Loading;