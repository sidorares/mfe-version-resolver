import semverMaxSatisfying from 'semver/ranges/max-satisfying'
//const versions = ['1.1.0', '1.4.0', '1.2.0', '0.0.1', '3.0.1', '2.2.1', '2.5.3', '1.1.1'];
import versions from '../../registry.json';

export default function handler(req, res) {
  const { name, range } = req.query;
  res.status(200).json({ name: 'John Doe', name, range, versions })
}