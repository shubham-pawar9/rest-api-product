const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select, page } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // queryObject.name = { $regex: name, $option: "i" };
    queryObject.name = name;
  }

  if (featured) {
    queryObject.featured = featured;
  }
  let apiData = Product.find(queryObject);
  if (page) {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);
  }

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    // console.log(select.split(",").join(" "));
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};
const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query).select("name company");
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
