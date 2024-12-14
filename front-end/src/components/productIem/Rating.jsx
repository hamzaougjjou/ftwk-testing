
const Star = ({ filled }) => (
    <svg className={`w-5 ${filled ? 'fill-[#FFE234]' : 'fill-none'}`} viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
    </svg>
);


const Rating = ({ rating }) => {

    let filledStars = Math.floor(rating);
    let hasHalfStar = rating % 1 !== 0;

    if (rating > 5) {
        filledStars = 5;
        hasHalfStar = false;
    }


    const totalStars = 5;

    return (
        <div className="flex">
            {[...Array(filledStars)].map((_, i) => (
                <Star key={i} filled={true} />
            ))}
            {hasHalfStar && <Star filled={true} />}
            {[...Array(totalStars - filledStars - (hasHalfStar ? 1 : 0))].map((_, i) => (

                <svg key={filledStars + 1 + i} className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
            ))}

        </div>
    );
};

export default Rating