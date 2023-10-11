const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // create a new category
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.json(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // delete a category by its `id` value
});

module.exports = router;
