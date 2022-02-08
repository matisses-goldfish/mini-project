const router = require('express').Router();
const Traveller = require('../../models/Traveller');

// GET one traveller
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id);
    if (!travellerData) {
      res.status(404).json({ message: 'No traveller with this id!' });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new traveller
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      bio: req.body.bio,
      email: req.body.email,
      password: req.body.password,
      hasTrip: req.body.hasTrip,
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for instance method hasTrip - a Traveller can visit this url to check if a Traveller at the specified id has pets

router.get('/:id/hasTrip', async (req, res) => {
  try {
    // First, we find a Traveller using their primary key (provided by params)
    const travellerData = await Traveller.findByPk(req.params.id);
    // If travellerData evaluates as false (no user exists with that primary key), then we will send an error message
    if (!travellerData) {
      res.status(404).json({ message: 'No Traveller with this id!' });
      return;
    }
    // If a Traveller does exist at the primary key, we get to use the instance method that we wrote in User.js to see if the user has pets
    const petData = travellerData.hasTrip();
    // If petData evaluates as false (Traveller has 0 pets), then the Traveller will receive the message below
    if (!petData) {
      res.status(400).json({ message: 'This person has no trips planned yet.' });
      return;
    }
    // Otherwise, the Traveller will see that the Traveller that they searched does have pets!
    res.json({ message: 'This person has a trip coming up!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a Traveller
router.put('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!travellerData[0]) {
      res.status(404).json({ message: 'No Traveller with this id!' });
      return;
    }
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
