const { getDatabase } = require('../config/mongodb');
const { ObjectID } = require('mongodb');

class TvSeries {
  // menampilkan seluruh movies
  static findAll() {
    return getDatabase().collection('tvseries').find().toArray();
  }

  static addTvSeries(newTvSeries) {
    return getDatabase().collection('tvseries').insertOne(newTvSeries);
  }

  static findById(id) {
    console.log(id, '<< ID yang dicari');
    return getDatabase()
      .collection('tvseries')
      .find({ _id: ObjectID(id) })
      .toArray();
  }

  static updateTvSeries(id, data) {
    console.log(id, '<< ID yang diupdate');
    // console.log(data);
    return getDatabase()
      .collection('tvseries')
      .findOneAndUpdate({ _id: ObjectID(id) }, { $set: data });
  }

  static deleteTvSeries(id) {
    console.log(id, '<< Id yang di delete');
    return getDatabase()
      .collection('tvseries')
      .findOneAndDelete({ _id: ObjectID(id) });
  }
}

module.exports = TvSeries;
