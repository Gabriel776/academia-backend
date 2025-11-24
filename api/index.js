module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const now = new Date().toISOString();
  res.statusCode = 200;
  res.end(JSON.stringify({
    status: "ok",
    time: now,
    message: "API funcionando - academia-backend"
  }));
};
