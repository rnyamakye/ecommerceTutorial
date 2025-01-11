import { ProductProps } from "../../type";
import { config } from "../config";
import { store } from "../lib/store";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutButton = ({ products }: { products: ProductProps[] }) => {
  const { currentUser } = store();
  const publishableKey =
    "pk_test_51QgAzKEFdMGpwQ7Ihu6thnKCGtcEQtbahd2ldSvcj0fE8Sqa2QmpNiLk9uxV3s4iodmDNBjBAchQWGZbF3HYqols00r1uPUnEq";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch(`${config?.baseURL}/checkout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        items: products,
        email: currentUser?.email,
      }),
    });
    const checkoutSession = await response?.json();
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      window.alert(result?.error?.message);
    }
  };

  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout{" "}
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {currentUser && (
        <p className="mt-2 text-sm font-medium text-red-50 text-center">
          Need to sign in to make payment
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;
