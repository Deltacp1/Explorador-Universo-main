// src/components/KeplerImages/KeplerImages.js

import React, { useEffect, useState } from 'react';

const KeplerImages = () => {
  const [images, setImages] = useState([]);
  const apiUrl = 'https://science.nasa.gov/exoplanet-catalog/kepler-22b/';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Realizando fetch da página e extraindo as imagens
        const response = await fetch(apiUrl);
        const text = await response.text();

        // Criando um elemento HTML temporário para parsear o HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const imgElements = doc.querySelectorAll('img');

        // Extraindo URLs das imagens
        const imgUrls = Array.from(imgElements).map(img => img.src);
        setImages(imgUrls);
      } catch (error) {
        console.error('Erro ao buscar as imagens:', error);
      }
    };

    fetchImages();
  }, [apiUrl]);

  return (
    <div>
      <h2>Imagens de Kepler-22b</h2>
      <div className="image-gallery">
        {
          images.map((url, index) => (
            <img key={index} src={url} alt={`Kepler-22b ${index + 1}`}/>
          ))
        }
      </div>
    </div>
  );
};

export default KeplerImages;