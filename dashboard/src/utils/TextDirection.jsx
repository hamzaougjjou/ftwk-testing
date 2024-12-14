import React from 'react';

const isArabic = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
};

const TextDirection = ({ text , styleClass='' }) => {
    const direction = isArabic(text) ? 'rtl' : 'ltr';
    return (
        <p style={{ direction }} className={styleClass}>
            {text}
        </p>
    );
};

export default TextDirection;
