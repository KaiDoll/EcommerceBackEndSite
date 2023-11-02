const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` 

router.get('/', async (req, res) => {
  // finds all categories as well as its association with Products
  try {
const categoryData = await Category.findAll({
  include: [{ model:Product}]
});
res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//finds categories using its ID as well as its association with Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    } //if it is not a category data then message will display. If success than great or else it will catch and send status 500.

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
const categoryData = await Category.update(req.body, {
  where: {
    id: req.params.id
  }
});
res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id}
    });
    if(!categoryData) {
      res.status(400).json({ message: 'No category with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
