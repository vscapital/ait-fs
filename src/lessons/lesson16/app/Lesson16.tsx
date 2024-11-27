import { Route, Routes } from "react-router-dom";
import Store from "../components/Store";
import StorePage from "../components/StorePage";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader.tsx";

export default function Lesson16() {
  const { ready } = useTranslation("lesson16", { useSuspense: false });

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="" element={<Store />} />
        <Route path="product/:id" element={<StorePage />} />
      </Routes>
    </div>
  );
}
