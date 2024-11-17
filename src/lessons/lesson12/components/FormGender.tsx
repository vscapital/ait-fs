import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import GenderResponse from "../types/gender-response";
import { Alert } from "flowbite-react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button.tsx";

export function FormGender() {
  const [genderData, setGenderData] = useState<GenderResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("lesson12");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, t("validation.name-min-length"))
      .required(t("validation.name-required"))
      .matches(/^[\p{L}]+$/u, t("validation.name-letters-only")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.genderize.io/?name=${encodeURIComponent(values.name)}`,
        );
        if (!response.ok) {
          throw new Error(t("errors.fetch-failed"));
        }
        const data: GenderResponse = await response.json();
        setGenderData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errors.generic"));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("name")}
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder={t("enter-name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {formik.errors.name}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formik.isValid}
          className={
            "font-medium rounded-lg text-sm w-full px-50 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          }
        >
          {isLoading ? t("checking") : t("check-gender")}
        </Button>
      </form>

      {error && (
        <Alert color="failure" className="mt-4">
          {error}
        </Alert>
      )}

      {genderData && !error && (
        <div className="mt-6 p-4 bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">{t("results")}</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">{t("name")}: </span>
              {genderData.name}
            </p>
            <p>
              <span className="font-medium">{t("gender")}: </span>
              {genderData.gender}
            </p>
            <p>
              <span className="font-medium">{t("probability")}: </span>
              {(genderData.probability * 100).toFixed(1)}%
            </p>
            <p>
              <span className="font-medium">{t("count")}: </span>
              {genderData.count.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
