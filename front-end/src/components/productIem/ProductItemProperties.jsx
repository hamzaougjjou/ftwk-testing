import Loading from './../utils/Loading'

function ProductItemProperties({ product, loading }) {




    if (loading) {
        return (
            <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                <h3 className="text-lg font-bold text-[#333]">Product information</h3>
                <ul className="mt-6 space-y-6 text-[#333]">
                    <li className="text-sm">
                        <Loading />
                        <span className="ml-4 float-right">
                            <Loading />
                        </span>
                    </li>
                    <li className="text-sm">
                        <Loading />
                        <span className="ml-4 float-right">
                            <Loading />
                        </span>
                    </li>
                    <li className="text-sm">
                        <Loading />
                        <span className="ml-4 float-right">
                            <Loading />
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            {
                (product.data.properties.length > 0) &&
                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-lg font-bold text-[#333]">Product information</h3>
                    <ul className="mt-6 space-y-6 text-[#333]">

                        {
                            product.data.properties.map((item, i) => {
                                const [[key, value]] = Object.entries(item);
                                return (
                                    <li
                                        key={i}
                                        className="text-sm">
                                        {key}
                                        <span className="ml-4 float-right">
                                            {value}
                                        </span>
                                    </li>
                                )
                            }
                            )
                        }
                    </ul>
                </div>

            }
        </>
    )
}

export default ProductItemProperties