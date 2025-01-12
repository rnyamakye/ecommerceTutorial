import Container from "../ui/Container";
import FavoriteProduct from "../ui/FavoriteProduct";
import { store } from "../lib/store";

const Favorite = () => {
  const { favoriteProduct } = store();

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <div>
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Favorite Product
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-[500px] tracking-wide">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
              ut commodi ipsam provident numquam, odit cupiditate, incidunt cum
              pariatur excepturi dicta laboriosam error quo dolore libero.
              Maxime ad laborum libero?
            </p>
          </div>
          <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
            <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
              {favoriteProduct?.map((product) => (
                <FavoriteProduct key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-2xl font-bold">Nothing added to Favorite yet</h2>
        </div>
      )}
    </Container>
  );
};

export default Favorite;
