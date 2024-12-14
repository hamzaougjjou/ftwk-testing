import React from 'react'
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import ProductItemImages from './ProductItemImages';
import ProductItemInfo from './ProductItemInfo';
import ProductItemReviews from './ProductItemReviews';
import ProductItemProperties from './ProductItemProperties';
import Error404 from './../errors/Error404';
import ReletedProduct from './ReletedProduct';
import Loading from '../utils/Loading';

function ProductItem() {


  const { id: product_id } = useParams();

  const { data: product, loading, error } = useAxios('/products/' + product_id, {
    method: 'GET',
  });

  if (error) {
    return (
      <Error404 />
    )
  }

  return (
    <div className="font-sans bg-white">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 p-6">

          <ProductItemImages product={product} loading={loading} />
          <ProductItemInfo product={product} loading={loading} />

        </div>

        <ProductItemProperties product={product} loading={loading} />

        {
          !loading ?
            <ProductItemReviews product={product} loading={loading} />
            :
            <Loading />
        }

      </div>
      <ReletedProduct current_product_id={product_id} />
    </div>

  )
}

export default ProductItem