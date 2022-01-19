export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe', query: req.query })
  }