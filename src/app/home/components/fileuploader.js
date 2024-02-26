'use client'
import React from 'react';
import { sendData  } from './upload';
import { redirect } from "next/navigation";
const FileUpload = async () => {
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async function(event) {
            const base64 = event.target.result.split(',')[1]; // Extract base64 data from the result
            // Send the base64 data using the sendData method
            const data = { filename: file.name, base64 };
            const response = await sendData(data.base64, data.filename);
            redirect("/home");
        };

        reader.readAsDataURL(file); // Read the file as data URL
    };

    return (
        <input 
            type="file" 
            onChange={handleUpload} 
            className="ml-auto" 
        />
    );
};

export default FileUpload;