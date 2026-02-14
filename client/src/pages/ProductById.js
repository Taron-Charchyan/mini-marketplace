import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/thunk/productsThunks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/prById.css';

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
        setSelectedImage(index);
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

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-images">
                    <Carousel
                        ref={carouselRef}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={false}
                        showDots={false}
                        arrows={true}
                        swipeable={true}
                        draggable={true}
                        afterChange={(previousSlide, { currentSlide }) => {
                            const realIndex = currentSlide % images.length;
                            setSelectedImage(realIndex);
                        }}
                    >
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={index} className="carousel-image-wrapper">
                                    <img
                                        src={`${API_URL}${image}`}
                                        alt={product.title}
                                        className="carousel-image"
                                        onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="carousel-image-wrapper">
                                <img src="/placeholder-image.jpg" alt="Placeholder" className="carousel-image" />
                            </div>
                        )}
                    </Carousel>

                    {images.length > 1 && (
                        <div className="thumbnail-container">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={`${API_URL}${image}`} alt="thumb" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-details">
                    <h1 className="product-title">{product.title}</h1>

                    <div className="product-price-stock">
                        <span className="product-price">${product.price}</span>
                        <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="product-description">
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>

                    {!isSeller && (
                        <div className="product-actions">
                            <button className="btn-add-to-cart" disabled={product.stock === 0}>
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button className="btn-buy-now" disabled={product.stock === 0}>
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