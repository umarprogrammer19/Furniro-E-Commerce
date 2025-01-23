// pages/success.tsx

import { useEffect, useState } from "react";

const Success = () => {
    // const [orderDetails, setOrderDetails] = useState(null);

    // useEffect(() => {
    //     // You can fetch the order details from your backend based on the session ID
    //     const sessionId = new URLSearchParams(window.location.search).get("session_id");

    //     if (sessionId) {
    //         fetch(`/api/order/${sessionId}`)
    //             .then((res) => res.json())
    //             .then((data) => setOrderDetails(data))
    //             .catch((err) => console.error("Error fetching order details:", err));
    //     }
    // }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full text-center">
                <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
                <p className="text-lg text-gray-700 mt-4">Thank you for your purchase!</p>
                {/* <div className="mt-6">
                    {orderDetails ? (
                        <>
                            <h2 className="text-xl text-gray-800">Order Summary</h2>
                            <div className="mt-4 text-left">
                                <p className="text-lg text-gray-700">Order ID: {orderDetails.id}</p>
                                <p className="text-lg text-gray-700">Amount: ${orderDetails.amount}</p>
                                <p className="text-lg text-gray-700">Payment Method: {orderDetails.paymentMethod}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg text-gray-700">Fetching your order details...</p>
                    )}
                </div> */}
                <a
                    href="/"
                    className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default Success;
