import React, { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";


interface ImageGalleryProps {
  imageUrls: string[];
  setImgDimension: Dispatch<SetStateAction<boolean>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageUrls,
  setImgDimension,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<
    { width: number; height: number }[]
  >([]);

  useEffect(() => {
    const checkImageDimensions = async () => {
      const newErrors: string[] = [];
      const newDimensions: { width: number; height: number }[] = [];

      // Loop through each image URL
      for (const imageUrl of imageUrls) {
        try {
          // Create an image element dynamically
          const img = new Image();
          img.src = imageUrl;

          // Wait for the image to load
          await img.decode();

          // Check the dimensions after the image has loaded
          if (img.naturalWidth < 400) {
            newErrors.push(
              `Error: Image at ${imageUrl} has width below 400 pixels.`
            );
          }

          // Store the dimensions
          newDimensions.push({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        } catch (error) {
          newErrors.push(`Error: Unable to load image at ${imageUrl}.`);
        }
      }

      // Check if all dimensions are below 400 pixels
      const allDimensionsBelow400 = newDimensions.every(
        (dimension) => dimension.width < 400
      );

      // Update the state in the parent component
      setImgDimension(allDimensionsBelow400);

      // If not, set the errors state
      if (!allDimensionsBelow400) {
        setErrors(["Error: Some images have dimensions below 400 pixels."]);
      }

      // Set the dimensions state
      setDimensions(newDimensions);
    };

    checkImageDimensions();
  }, [imageUrls, setImgDimension]);

  return (
    <div>
      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      {/* Render your images and dimensions here */}
      {dimensions.map((dimension, index) => (
        <div key={index}>
          <img src={imageUrls[index]} alt={`Image ${index}`} />
          <p>
            Width: {dimension.width}, Height: {dimension.height}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
