import React from 'react';

interface Props {
    nextUrl: string | null;
    previousUrl: string | null;
    setUrl: (url: string) => void;
}

const NavigationButtons: React.FC<Props> = ({ nextUrl, previousUrl, setUrl }) => {
    return (
        <>
            <button onClick={() => previousUrl ? setUrl(previousUrl) : null } disabled={!previousUrl}>Previous</button>
            <button onClick={() => nextUrl ? setUrl(nextUrl) : null } disabled={!nextUrl}>Next</button>
        </>
    );
};

export default NavigationButtons;