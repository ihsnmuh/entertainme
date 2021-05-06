function errHandler(err, req, res, next) {
  switch (err.name) {
    case 'Unauthorized':
      res.status(401).json({ message: 'Unauthorized Access' });
      break;
    case 'NotFound':
      res.status(404).json({ message: 'Data Not Found' });
      break;
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errHandler;
