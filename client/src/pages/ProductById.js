import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/thunk/productsThunks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "../assets/css/PrById.module.css";

function ProductById() {
    const API_URL = 'http://localhost:8080';
    const dispatch = useDispatch();
    const carouselRef = useRef(null);
    const { loading, product } = useSelector((state) => state.productById);
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const isSeller = user?.role === 'seller';

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    const handleThumbnailClick = (index) => {
        if (carouselRef.current) {
            carouselRef.current.goToSlide(index);
        }
    };

    if (loading) return <Loader />;
    if (!product) return <div className="not-found">Product not found</div>;

    const responsive = {
        all: { breakpoint: { max: 4000, min: 0 }, items: 1 }
    };

    const images = product.images || [];

    if (images.length === 0) {
        return <div>No images</div>;
    }

    return (
        <div className={styles["product-page"]}>
            <div className={styles["product-container"]}>
                <div className={styles["product-images"]}>
                    <Carousel
                        key={images.length}
                        ref={carouselRef}
                        responsive={responsive}
                        infinite={false}
                        autoPlay={false}
                        showDots={false}
                        arrows={true}
                        swipeable={true}
                        draggable={true}
                        beforeChange={(nextSlide) => {
                            setSelectedImage(nextSlide);
                        }}
                    >
                        {images.map((image, index) => (
                            <div key={index} className={styles["carousel-image-wrapper"]}>
                                <img
                                    src={`${API_URL}${image}`}
                                    alt={product.title}
                                    className={styles["carousel-image"]}
                                    onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                                />
                            </div>
                        ))}
                    </Carousel>

                    {images.length > 1 && (
                        <div className={styles["thumbnail-container"]}>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ""}`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={`${API_URL}${image}`} alt="thumb" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles["product-details"]}>
                    <h1 className={styles["product-title"]}>{product.title}</h1>

                    <div className={styles["product-price-stock"]}>
                        <span className={styles["product-price"]}>${product.price}</span>
                        <span className={`${styles["product-stock"]} ${product.stock > 0 ? styles["in-stock"] : styles["out-of-stock"]}`}>
                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </span>
                    </div>

                    <div className={styles["product-description"]}>
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>

                    {!isSeller && (
                        <div className={styles["product-actions"]}>
                            <button className={styles["btn-add-to-cart"]} disabled={product.stock === 0}>
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button className={styles["btn-buy-now"]} disabled={product.stock === 0}>
                                Buy Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductById;