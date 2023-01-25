import Product from "../../components/products/Product";
import MainCSS from '../Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callProductListAboutLEDAPI
} from '../../apis/ProductAPICalls'
import { GET_PRODUCTS_LED } from '../../modules/ProductModule';

function Meal() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const led = useSelector(state => state.productReducer); 
    const ledList = led.data;

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    console.log('led' , led);

    useEffect(
        () => {
            dispatch(callProductListAboutLEDAPI({
                
            }));            
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setLimit(e.target.value);
    }


    return (
        <>
            <label>
                표시할 게시물 수:&nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={onChangeHandler}
                >
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                </select>
            </label>
            <div className={ MainCSS.productDiv }>
                { 
                led.length > 0 && led.slice(offset, offset + limit).map((res) => (<Product key={ res.imgNum } product={ res } />))
                }
            </div>        
        </>
    );
}

export default Meal;