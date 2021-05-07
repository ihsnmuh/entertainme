function errHandler(err, req, res, next) {
  if (err.name === 'NotFound') {
    res.status(404).json({ message: 'Data Not Found' });
  } else {
    const { response } = err;
    console.log(response);
    res
      .status(response.status || 500)
      .json({ message: response.data.message || 'Internal Server Error' });
  }
}

module.exports = errHandler;
