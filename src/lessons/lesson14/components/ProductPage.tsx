import { useNavigate, useParams } from "react-router-dom";
import Product from "../types/product";
import { useTranslation } from "react-i18next";
import { Alert, Button, Card, Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation("lesson14");

  const fetchProduct = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`,
          {
            signal,
          },
        );

        if (!response.ok) {
          throw new Error(t("errors.fetch-failed"));
        }

        const text = await response.text();
        if (!text) {
          throw new Error(t("errors.empty-response"));
        }

        try {
          const data = JSON.parse(text);
          setProduct(data);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          throw new Error(t("errors.invalid-json"));
        }
      } catch (err) {
        // Check if the error is due to abort
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            return;
          }
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

    return () => {
      abortController.abort();
    };
  }, [fetchProduct]);

  const handleBack = () => {
    navigate("/lesson/14");
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {renderBackButton()}
      <Card>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-contain md:h-full md:w-48"
              src={product.image}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x300.png";
                e.currentTarget.alt = t("image-load-error");
              }}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
              {t("category")}: {product.category}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-4">
              <h2 className="font-semibold">{t("description")}:</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="mt-6 flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                {t("price")}: ${product.price}
              </span>
              <div className="ml-6 flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>
                  {t("rating")}: {product.rating?.rate ?? t("no-rating")}
                </span>
                <span className="text-gray-400 ml-1">
                  ({product.rating?.count ?? 0} {t("reviews")})
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
