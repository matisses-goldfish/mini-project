const Traveller = require('./traveller');
const Trip = require('./trip');
const Location = require('./location');

Traveller.hasMany(Trip, {
    foreignKey: 'traveller_id',
    onDelete: 'CASCADE',
  });

Trip.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

Traveller.hasMany(Location, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE',
});

Location.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

module.exports = { Traveller, Trip, Location };
