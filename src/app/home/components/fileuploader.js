'use client'
import React from 'react';
import { sendData  } from './ServerActions/upload';
import { redirect } from "next/navigation";
import { buttonVariants } from '../../../components/ui/button'; // replace with the actual path

const FileUpload = async () => {
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async function(event) {
            const base64 = event.target.result.split(',')[1]; // Extract base64 data from the result
            // Send the base64 data using the sendData method
            const data = { filename: file.name, base64 };
            console.log(data);
            const response = await sendData(data.base64, data.filename);
            // redirect("/home");
            console.log(response);
            window.location.reload();
          };
          
          reader.readAsDataURL(file); // Read the file as data URL
    };

  return (
    <div className='ml-auto'>
      <input 
        type="file" 
        id="file-upload"
        onChange={handleUpload} 
        className="hidden" // hide the file input
      />
      <label 
        htmlFor="file-upload" 
        className={buttonVariants()} // apply the styles to the label
      >
        Upload
      </label>
    </div>
  );
};

export default FileUpload;