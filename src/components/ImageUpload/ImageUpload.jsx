// ImageUpload.jsx
import React, { useState } from 'react';
import './ImageUpload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import {analyzeImage} from '../../utils/VisionService';
import ProductsView from '../ProductsView/ProductsView';
import getProductData  from '../../utils/ProductSearch';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  const [labels, setLabels] = useState([]);
  const [products, setProducts] = useState([]);

  const handleImageUpload = async (files) => {
    if (files[0]) {
      setFileName(files[0].name);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result.split(',')[1];

        setImage(`data:image/png;base64, ${imageBase64}`);

        try {
          // Call the analyzeImage function from the VisionService
          const labels = await analyzeImage(imageBase64);
          setLabels(labels.map(label => label.description));

          console.log('Labels:', labels.map(label => label.description))

          // Call the getProductData function from the ProductApi
          const productData = await getProductData(labels);
          setProducts(productData.data);

          console.log('Products:', productData);

        } catch (error) {
          console.error('Error processing image or fetching product data:', error);
          // Handle the error, maybe show a message to the user
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <main>
      <form
        action=""
        onClick={() => document.querySelector('.input-field').click()}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={({ target: { files } }) => handleImageUpload(files)}
          className="input-field"
        />

        {image ? (
          <img src={image} width={150} height={150} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse files to search</p>
          </>
        )}
      </form>

      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf" />
        <span style={{ color: 'black' }}>
          {fileName}
          <MdDelete
            onClick={() => {
              setFileName('No selected file');
              setImage(null);
              setLabels([]);
              setProducts([]); // Clear products when deleting the file
            }}
          />
        </span>
      </section>

      {/* Pass labels and products to the ProductsView component */}
      <h2 className="sr-only">Products</h2>
      {
        products.length > 0 && <ProductsView products={products} />
      }
    </main>
  );
}

export default ImageUpload;
