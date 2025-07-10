import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

const ProfilePage = () => {
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState(-1);
    const getData = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: "GET",
            });
            const result = await resp.json();
            console.log("result -->", result);
            setProducts(result.data.products);
        } catch (err) {
            console.warn("error while getting products -->", err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const title = e.target.title.value;
            const price = e.target.price.value;
            const description = e.target.description.value;
            const quantity = e.target.quantity.value;

            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    price: price,
                    description,
                    quantity,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            if (resp.status == "201") {
                alert("Product added!");
                getData();
                console.log(resp);
            } else {
                const result = await resp.json();
                alert(`Invalid data: ${result.message}`);
            }
        } catch (err) {
            console.warn("Cannot create product -->", err.message);
            alert(`Cannot create product: ${err.message}`);
        }
    };

    const handleEditProduct = async (productId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    price: updatedPrice,
                }),
                headers: { "content-type": "application/json" },
            });

            if (res.status === 200) {
                alert("Product Updated");
                setEditProductId("");
                getData();
            } else {
                const result = await res.json();
                alert(`Error while updating product: ${result.message}`);
            }
        } catch (err) {
            alert("Cannot update product:", err.message);
            console.log("Cannot update product:", err.message);
        }
    };

    return (
        <div>
            <Navbar />

            <div>
                <form onSubmit={handleSubmit} className="mx-auto my-4 flex flex-col gap-5 p-6 bg-blue-200 max-w-150">
                    <div className="flex gap-4">
                        <label>Title</label>
                        <input name="title" type="text" className="border-1 py-1 px-2 rounded-md" />
                    </div>
                    <div className="flex gap-4">
                        <label>Price</label>
                        <input name="price" type="number" className="border-1 py-1 px-2 rounded-md" />
                    </div>
                    <div className="flex gap-4">
                        <label>Description</label>
                        <input name="description" type="text" className="border-1 py-1 px-2 rounded-md" />
                    </div>
                    <div className="flex gap-4">
                        <label>Quantity</label>
                        <input name="quantity" type="number" className="border-1 py-1 px-2 rounded-md" />
                    </div>
                    <button className="border-1 py-1 px-2 rounded-md">Add Product</button>
                </form>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
                {products.map((elem) => {
                    return (
                        <div key={elem._id} className="p-4 rounded-lg border-1">
                            <p>{elem.title}</p>
                            {elem._id === editProductId ? (
                                <>
                                    <input
                                        value={updatedPrice}
                                        onChange={(e) => setUpdatedPrice(e.target.value)}
                                        className="py-1 px-2 border-1 rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            setEditProductId("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleEditProduct(elem._id);
                                        }}
                                    >
                                        Update
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{elem.price}</p>
                                    <button
                                        onClick={() => {
                                            setEditProductId(elem._id);
                                            setUpdatedPrice(elem.price);
                                        }}
                                        className="py-1 px-2 border-1 rounded-md"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { ProfilePage };
