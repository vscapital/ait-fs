import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Product from "../types/product";
import { ShopProduct } from "./ShopProduct";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { t } = useTranslation("lesson14");

  const loadProducts = async (limit: number) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}`,
      );
      if (!response.ok) {
        throw new Error(t("errors.fetch-failed"));
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: { limit: number }) => {
    loadProducts(values.limit);
  };

  const validationSchema = Yup.object({
    limit: Yup.number()
      .required(t("validation.limit-required"))
      .min(1, t("validation.limit-min"))
      .max(20, t("validation.limit-max"))
      .integer(t("validation.limit-integer")),
  });

  const formik = useFormik({
    initialValues: {
      limit: 3,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    let mounted = true;

    const initialLoad = async () => {
      if (!mounted) return;
      setIsLoading(true);
      setError("");

      try {
        await loadProducts(3);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : t("errors.generic"));
        }
      }
    };

    initialLoad().catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : t("errors.generic"));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="mb-8">
        <div className="flex gap-4 items-start">
          <div className="flex-1 max-w-xs">
            <TextInput
              id="limit"
              type="number"
              {...formik.getFieldProps("limit")}
              placeholder={t("enter-limit")}
              color={
                formik.touched.limit && formik.errors.limit ? "failure" : "gray"
              }
              helperText={
                formik.touched.limit &&
                formik.errors.limit && (
                  <span className="text-red-600">{formik.errors.limit}</span>
                )
              }
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                {t("loading")}
              </>
            ) : (
              t("load-products")
            )}
          </Button>
        </div>
      </form>

      {error && (
        <Alert color="failure" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: Number(formik.values.limit) }).map(
              (_, index) => (
                <ShopProduct
                  key={index}
                  product={{} as Product}
                  isLoading={true}
                />
              ),
            )
          : products.map((product) => (
              <ShopProduct key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
