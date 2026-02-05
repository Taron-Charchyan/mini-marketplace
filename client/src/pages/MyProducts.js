import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getMyProducts } from "../store/thunk/productsThunks";
import "../assets/css/myProducts.css"

function MyProducts() {
    const { products, loading } = useSelector(state => state.myProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProducts());
    }, [dispatch]);

    if (loading) return <Loader />;

    return (
        <div className="products-page">
            <div className="product-list">
                {products.length === 0 && (
                    <p className="products-empty">No products yet</p>
                )}

                {products.map((product) => (
                    <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        className="product-card-link"
                    >
                        <div className="product-card">
                            <div className="product-image">
                                <img
                                    src={product.images?.[0] || "/no-image.png"}
                                    alt={product.title}
                                />
                            </div>
                            <div className="product-description">
                                <p className="product-title">{product.title}</p>
                                <p className="product-text">{product.description}</p>
                            </div>
                            <div className="product-meta">
                                <p className="product-price">${product.price}</p>
                                <p className="product-stock">{product.stock}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;