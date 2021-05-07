function errHandler(err, req, res, next) {
  console.log(err);

  switch (err.name) {
    case 'NotFound':
      res.status(404).json({ message: 'Data Not Found' });
      break;
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errHandler;
