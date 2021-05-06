const { getDatabase } = require('../config/mongodb');

class TvSeries {
  // menampilkan seluruh movies
  static findAll() {
    return getDatabase().collection('tvseries').find().toArray();
  }

  static addMovie(newTvSeries) {
    return getDatabase().collection('tvseries').insertOne(newTvSeries);
  }
}

module.exports = TvSeries;
