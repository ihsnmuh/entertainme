const { ObjectID } = require('mongodb');
const { getDatabase } = require('../config/mongodb');

class Movie {
  static findAll() {
    return getDatabase().collection('movies').find().toArray();
  }

  static addMovie(newMovie) {
    return getDatabase().collection('movies').insertOne(newMovie);
  }

  static findById(id) {
    console.log(id, '<< ID yang dicari');
    return getDatabase()
      .collection('movies')
      .find({ _id: ObjectID(id) })
      .toArray();
  }

  static updateMovie(id, data) {
    console.log(id, '<< ID yang diupdate');
    // console.log(data);
    return getDatabase()
      .collection('movies')
      .findOneAndUpdate({ _id: ObjectID(id) }, { $set: data });
  }

  static deleteMovie(id) {
    console.log(id, '<< Id yang di delete');
    return getDatabase()
      .collection('movies')
      .findOneAndDelete({ _id: ObjectID(id) });
  }
}

module.exports = Movie;
