import Product from "../types/product";
import { Card } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ShopProductProps {
  product: Product;
  isLoading?: boolean;
}

export function ShopProduct({ product, isLoading = false }: ShopProductProps) {
  const { t } = useTranslation("lesson14");
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

  return (
    <Link
      to={`product/${product.id}`}
      relative="path"
      className="no-underline hover:no-underline"
    >
      <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative pt-[100%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-auto">
            <div className="text-xl font-bold my-2">
              {t("price")}: ${product.price}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>
                  {t("rating")}: {product.rating.rate}
                </span>
                <span className="text-gray-400 ml-1">
                  ({product.rating.count} {t("reviews")})
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
