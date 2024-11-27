import { Card } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Product from "../types/product";

interface StoreCardProps {
  product: Product;
  isLoading?: boolean;
}

export default function StoreCard({
  product,
  isLoading = false,
}: StoreCardProps) {
  const { t } = useTranslation("lesson16");

  if (isLoading) {
    return (
      <div className="w-full h-96 rounded-lg bg-gray-100 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link
      to={`product/${product.id}`}
      relative="path"
      className="no-underline hover:no-underline"
    >
      <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative pt-[100%]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm line-through text-gray-500">
                  ${product.price}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{product.rating}</span>
              </div>
              <span className="text-gray-500">
                {t("stock")}: {product.stock}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
