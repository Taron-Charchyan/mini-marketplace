import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../store/thunk/productsThunks";
import Loader from "./Loader";
import styles from "../assets/css/AddProduct.module.css";

function AddProduct({onClose}) {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.addProduct);
    const [fileKey, setFileKey] = useState(Date.now());

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        images: [],
        stock: 1
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock', formData.stock);

        formData.images.forEach((file) => {
            formDataToSend.append('images', file);
        });

        const result = await dispatch(addProduct(formDataToSend));

        if (result?.success) {
            setFormData({
                title: "",
                description: "",
                price: 0,
                images: [],
                stock: 1
            });
            setFileKey(Date.now());
            if (onClose) onClose();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    if (loading) return <Loader />;

    return (
        <div className={styles["add-product-overlay"]} onClick={handleBackdropClick}>
            <div className={styles["add-product-container"]}>
                <button
                    className={styles["close-button"]}
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <form onSubmit={handleSubmit}>
                    <h2>Add new product</h2>

                    <div className={styles["input-group"]}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles["input-group"]}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            maxLength={500}
                            minLength={10}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles["input-group"]}>
                        <label htmlFor="price">Price</label>
                        <div className={styles["price-input-wrapper"]}>
                            <span className={styles["currency-symbol"]}>$</span>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label htmlFor="images">Images</label>
                        <input
                            id="images"
                            key={fileKey}
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div className={styles["input-group"]}>
                        <label htmlFor="stock">Stock</label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            min="1"
                            step="1"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles["submit-button"]}
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;