import React from "react";

const ProductAdminCard = ({ product }) => {
  return (
    <div className="w-36 p-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
      <div>
        <img
          src={product?.image[0]}
          alt={product?.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 text-center">{product.name}</p>
      <p className="text-center">{product.unit}</p>
    </div>
  );
};

export default ProductAdminCard;
