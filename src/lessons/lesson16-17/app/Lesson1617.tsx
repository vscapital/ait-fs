import { Route, Routes } from "react-router-dom";
import Store from "../components/Store";
import StorePage from "../components/StorePage";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader.tsx";
import { CartProvider } from "../contexts/CartContext.tsx";
import { Cart } from "../components/Cart.tsx";

export default function Lesson1617() {
  const { ready } = useTranslation("lesson1617", { useSuspense: false });

  if (!ready) {
    return <Loader />;
  }

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Routes>
              <Route path="" element={<Store />} />
              <Route path="product/:id" element={<StorePage />} />
            </Routes>
          </div>
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
