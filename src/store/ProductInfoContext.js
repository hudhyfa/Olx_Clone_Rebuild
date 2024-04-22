import { createContext, useContext, useState } from "react";

const ProductInfo = createContext();

export const ProductInfoContextHook = () => {
    return useContext(ProductInfo);
}

function ProductInfoContext({children}) {
    const [ productDetails, setProductDetails ] = useState();
    return (
        <ProductInfo.Provider value={{productDetails, setProductDetails}}>
            {children}
        </ProductInfo.Provider>
    )
}

export default ProductInfoContext;