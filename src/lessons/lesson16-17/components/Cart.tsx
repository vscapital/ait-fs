import { useTranslation } from "react-i18next";
import { useCart } from "../contexts/CartContext";
import { Button, Card } from "flowbite-react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export function Cart() {
  const { t } = useTranslation("lesson1617");
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="p-4">
        <Card>
          <div className="text-center py-6">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {t("cart.empty")}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {t("cart.start-shopping")}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t("cart.title")}</h2>
          <Button color="failure" size="sm" onClick={clearCart}>
            {t("cart.clear")}
          </Button>
        </div>
        <div className="space-y-4">
          {state.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-sm text-gray-500">
                    $
                    {(
                      item.product.price *
                      (1 - item.product.discountPercentage / 100)
                    ).toFixed(2)}{" "}
                    x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    color="gray"
                    className="p-1"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        Math.max(0, item.quantity - 1),
                      )
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    color="gray"
                    className="p-1"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  color="failure"
                  className="p-1"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">{t("cart.total-items")}:</span>
            <span>{state.totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">{t("cart.total-price")}:</span>
            <span className="text-lg font-bold">
              ${state.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
