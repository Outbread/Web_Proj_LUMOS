import ProductCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';

function Product({ product : { pdCode, pdName, pdPrice , productImage, pdImgPath , mainImg }}) {

    const navigate = useNavigate();

    const onClickProductHandler = (pdCode) => {
        navigate(`/product/${pdCode}`, { replace: true });        
    }

    console.log('productImage', productImage);

    return (
        <div 
            className={ ProductCSS.productDiv }
            onClick={ () => onClickProductHandler(pdCode) }
        >
            <div>                            
                <img src={productImage?.filter(r => r.mainImg == 'Y')[0].pdImgPath}/>
            </div>                        
            <h5>{ pdName }</h5>
            <h5>{ pdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</h5>
        </div>
    );
}

export default Product;