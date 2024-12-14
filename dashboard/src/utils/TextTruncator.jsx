import TextDirection from "./TextDirection";

const TextTruncator = ({ text, len = 150, styleClass = '' }) => {

    let truncatedText = text.substring(0, len);

    return (
        <p
            className={styleClass}
        >
            <TextDirection text={truncatedText + (text.length > len ? '...' : "") } />
        </p>


    );
};

export default TextTruncator;
