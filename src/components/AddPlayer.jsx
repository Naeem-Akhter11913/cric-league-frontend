import React, { useState } from "react";

const AddPlayer = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-[500px] max-w-md mx-auto space-y-5 rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
                Create Account
            </h2>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    required
                />
            </div>

        </div>
    );
};

export default AddPlayer;