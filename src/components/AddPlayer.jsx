import React, { useState } from "react";

const AddPlayer = ({ formData, setFormData }) => {
    
    // name, email, password, role

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (formData.password !== formData.confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }
    //     onSubmit(formData);
    // };

    return (
        <div
            // onSubmit={handleSubmit}
            className="w-[500px] max-w-md mx-auto space-y-5 rounded-xl bg-white p-6 shadow-md"
        >
            <h2 className="text-2xl font-semibold text-gray-800">
                Create Account
            </h2>

            {/* Name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    required
                />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    required
                />
            </div>

            {/* Confirm Password */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    required
                />
            </div>

            {/* <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
                Register
            </button> */}
        </div>
    );
};

export default AddPlayer;