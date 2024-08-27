import React, { useContext } from 'react'
import {ShopContext} from '../Context/Shopcontext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import Productdisplay from '../Components/Productdisplay/Productdisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
const {all_product} = useContext(ShopContext)
const {productId} = useParams();
const Product = all_product.find((item) => item.id === Number(productId))
  return (
    <div>
      <Breadcrum product={Product}/>
      <Productdisplay product={Product}/>
      <DescriptionBox/> 
      <RelatedProducts/>
    </div>
  )
}

export default Product
