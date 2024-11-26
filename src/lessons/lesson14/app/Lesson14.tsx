import { Route, Routes } from "react-router-dom";
import { Products } from "../components/Products";
import ProductPage from "../components/ProductPage";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";

export default function Lesson14() {
  const { ready } = useTranslation("lesson14", { useSuspense: false });

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="" element={<Products />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}
