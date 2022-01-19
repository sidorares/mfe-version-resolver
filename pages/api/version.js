import semverMaxSatisfying from "semver/ranges/max-satisfying";
import versions from "../../registry.json";

export default function handler(req, res) {
  const { name, range } = req.query;

  if (!name) {
    res.status(400).send("Missing name");
  }
  if (!range) {
    res.status(400).send("Missing range");
  }
  const pkgInfo = versions[name];
  if (!pkgInfo) {
    res.status(404).send("Package not found");
  }
  const packageVersions = Object.keys(pkgInfo.versions);
  const version = semverMaxSatisfying(packageVersions, range);
  if (!version) {
    return res.status(404).send("No version found");
  }
  res
    .status(200)
    .json({
      name: "John Doe",
      name,
      range,
      entry: pkgInfo.versions[version].entry,
    });
}
