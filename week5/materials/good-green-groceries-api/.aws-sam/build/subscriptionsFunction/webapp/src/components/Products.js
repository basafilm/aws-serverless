import useFetch from "../hooks/useFetch";
import useProducts from "../hooks/useProducts";
import Subscription from './subscription'
function Products() {
  const { cart, addProduct, removeProduct } = useProducts();
const {items} = useFetch("/products",{ method:"GET"})
  const isInCart = (product) => {
    return !cart.find((item) => item.id === product.id);
  };

  return (
    <div>
      <div className="row">
        {items&& items.map((product) => {
          return (
            <div className="card col-md-4" key={product.id}>
              <div className="text-center">
                <img style={{ width: "400px" }} src={product.imageURL} alt="" />
              </div>
              <div className="card-body">
                <h2>{product.name}</h2>

                <p className="card-text">{product.description}</p>
                <p>
                  <strong>
                    price: {product.price} {product.currency}
                  </strong>
                </p>
                {isInCart(product) && (
                  <button
                    onClick={() => addProduct(product)}
                    className="btn btn-primary"
                  >
                    Select
                  </button>
                )}
                {!isInCart(product) && (
                  <button
                    onClick={() => removeProduct(product)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                  
                )}
              </div>
              <div className="form-group mt-4 col-md-4">
          <p className="mt-4">You will be charged: {cart&& cart}</p>
          </div>
          <Subscription productId={product.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
