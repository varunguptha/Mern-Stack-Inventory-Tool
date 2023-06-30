import React, { useEffect } from 'react'
import "./ProductSummary.scss"
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch, useSelector } from "react-redux";
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice';

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

export const formatNumbers = (x) =>
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) =>
{
    const dispatch = useDispatch()
    const totalStoreValue = useSelector(selectTotalStoreValue)
    const totalCatagory = useSelector(selectCategory)
    const outOfStock = useSelector(selectOutOfStock)


    useEffect(() =>
    {
        dispatch(CALC_STORE_VALUE(products))
        dispatch(CALC_CATEGORY(products))
        dispatch(CALC_OUTOFSTOCK(products))

    }, [dispatch, products])


    return (
        <div className='product-summary'>
            <div className="info-summary">
                <InfoBox icon={productIcon} title={"Total Products"} count={products.length}
                    bgColor="card1" />
                <InfoBox icon={earningIcon} title={"Total Store value"} count={`$ ${formatNumbers(totalStoreValue.toFixed(2))}`}
                    bgColor="card2" />
                <InfoBox icon={categoryIcon} title={"No. of Catagory "} count={totalCatagory.length}
                    bgColor="card3" />
                <InfoBox icon={outOfStockIcon} title={"Out of stock"} count={outOfStock}
                    bgColor="card4" />
            </div>
        </div>
    )
}

export default ProductSummary