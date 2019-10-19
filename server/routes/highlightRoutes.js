const { Router } = require('express');

const { createPresignedHighlightPost } = require('../services/awsService')

class HighlightRoutes {
  constructor() {
    this.router = Router();

    this.router.post('/presignedPost', this.presignedPost.bind(this));
  }
  async presignedPost(req, res) {
    console.log('req', req.body);
    const { fileName } = req.body;
    const output = await createPresignedHighlightPost(fileName);
    console.log('output', output)
    res.send(output);
  }
}

module.exports = new HighlightRoutes();
