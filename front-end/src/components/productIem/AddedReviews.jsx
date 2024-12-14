import avatar from './../../assets/avatar.jpg';
import Rating from './Rating'

function AddedReviews({ addedReviews }) {
    return (
        <>
            {
                addedReviews.map(review => (
                    <div
                        key={review.id}
                        className="flex rounded p-3
                            w-[45%] 
                            min-w-[400px] bg-gray-100">
                        <img src={avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full border-2 border-white" />
                        <div className="ml-3">
                            <h4 className="text-sm font-bold text-[#333]">
                                {review.name}
                            </h4>
                            <div className="flex space-x-1 mt-1">
                                <p className="text-xs !ml-2 font-semibold text-[#333]">
                                    {review.created_at_formatted}
                                </p>
                            </div>
                            <br />
                            <Rating rating={review.stars} />
                            <p className="text-sm mt-4 text-[#333]">
                                {review.message}
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default AddedReviews