module.exports = {
  build: (app) => {
    app.get('/api/logo/airline/:id', (req, res) => {
      res.sendFile('QTR.gif', { root: __dirname  });
    });
  }
}
