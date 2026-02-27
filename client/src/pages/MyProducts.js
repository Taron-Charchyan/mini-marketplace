import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getMyProducts} from "../store/thunk/productsThunks";
import styles from "../assets/css/MyProducts.module.css";
import AddProduct from "../components/AddProduct";

function MyProducts() {
    const API_URL = 'http://localhost:8080'
    const {products, loading} = useSelector(state => state.myProducts);
    const dispatch = useDispatch();
    const [aPO, setAPO] = useState(false);

    useEffect(() => {
        dispatch(getMyProducts());
    }, [dispatch]);

    if (loading) return <Loader/>;

    return (
        <div className={styles["products-page"]}>
            <div className={styles["products-header"]}>
                <h1>My Products</h1>
                <button
                    className={styles["add-product-btn"]}
                    onClick={() => setAPO(true)}
                >
                    + Add Product
                </button>
            </div>

            {aPO && <AddProduct onClose={() => setAPO(false)} />}

            <div className={styles["product-list"]}>
                {products.length === 0 && (
                    <p className={styles["products-empty"]}>No products yet</p>
                )}

                {products.map((product) => (
                    <Link
                        key={product._id}
                        to={`/prById/${product._id}`}
                        className={styles["product-card-link"]}
                    >
                        <div className={styles["product-card"]}>
                            <div className={styles["product-image"]}>
                                <img
                                    src={
                                        product.images?.[0]
                                            ? `${API_URL}${product.images[0]}`
                                            : "/no-image.png"
                                    }
                                    alt={product.title}
                                />
                            </div>
                            <div className={styles["product-description"]}>
                                <p className={styles["product-title"]}>
                                    {product.title}
                                </p>
                            </div>
                            <div className={styles["product-meta"]}>
                                <p className={styles["product-price"]}>
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;