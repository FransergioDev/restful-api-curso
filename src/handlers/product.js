const ProductRepository = require("../repositories/products");

const transformer = (product) => ({
  type: "product",
  id: product.id,
  attributes: {
    name: product.name,
    price: product.price,
  },
  links: {
    self: `/api/v1/products/${product.id}`,
  },
});

const getAll = async () => {
  const products = await ProductRepository.getAll();
  return { data: products.map(transformer) };
};

const find = async (req, h) => {
  const id = req.params.id;
  const product = await ProductRepository.find(id);
  return { data: transformer(product) };
};

const save = async (req, h) => {
  const product = await ProductRepository.save(req.payload);

  return h.response(transformer(product)).code(201);
};

const remove = async (req, h) => {
  const id = req.params.id;
  await ProductRepository.remove(id);
  return h.response().code(204);
};

module.exports = {
  getAll,
  save,
  find,
  remove,
};
