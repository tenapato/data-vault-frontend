'use client'
import React from 'react';
import { download } from './ServerActions/download';
import { deleteFile } from './ServerActions/delete';


const ActionButton = ({ name, id }) => {
  const handleDownload = async () => {
    let response = await download(id)
    window.open(response, '_blank');
    // console.log('Download', id);
  };

  const handleDelete = async () => {
    let response = await deleteFile(id)
    window.location.reload();
  };

  const handleClick = name === 'Download' ? handleDownload : handleDelete;

  return (
    <button className={name === 'Download' ? 'mr-4' : 'ml-4'} onClick={handleClick}>
      {name}
    </button>
  );
};

export default ActionButton;