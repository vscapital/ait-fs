import { useNavigate, useParams } from "react-router-dom";
import Product from "../types/product";
import { useTranslation } from "react-i18next";
import { Alert, Button, Card, Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext.tsx";

export default function StorePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation("lesson1617");
  const { addItem } = useCart();

  const fetchProduct = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal,
        });

        if (!response.ok) {
          throw new Error(t("errors.fetch-failed"));
        }

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          setError(err.message);
        } else {
          setError(t("errors.generic"));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [id, t],
  );

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError("");
    setProduct(null);
    fetchProduct(abortController.signal);
    return () => abortController.abort();
  }, [fetchProduct]);

  const handleBack = () => navigate("/lesson/16");

  const renderBackButton = () => (
    <Button color="gray" onClick={handleBack} className="mb-4">
      <ArrowLeft className="mr-2 h-5 w-5" />
      {t("back")}
    </Button>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {renderBackButton()}
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {renderBackButton()}
        <Alert color="failure">
          <div className="font-medium">{error}</div>
          <div className="mt-2 text-sm">{t("errors.try-again")}</div>
        </Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {renderBackButton()}
        <Alert color="info">
          <div className="font-medium">{t("product-not-found")}</div>
          <div className="mt-2 text-sm">{t("check-product-id")}</div>
        </Alert>
      </div>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {renderBackButton()}
      <Card>
        <div className="md:grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square relative mb-4">
              <img
                className="absolute inset-0 w-full h-full object-contain"
                src={selectedImage}
                alt={product.title}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square relative border-2 rounded ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <div>
                  <span className="text-xl line-through text-gray-500">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-green-600">
                    -{product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">
                {t("stock")}: {product.stock}
              </span>
            </div>
            <Button
              className="my-4"
              onClick={() => product && addItem(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t("cart.add")}
            </Button>
            <div className="mb-6">
              <h2 className="font-semibold mb-2">{t("description")}:</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
              {t("category")}: {product.category}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
