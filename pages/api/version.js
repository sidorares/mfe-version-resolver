import semverMaxSatisfying from "semver/ranges/max-satisfying";
import semverSort from "semver/functions/sort";

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
  const sortedVersions = semverSort(packageVersions);
  const latestVersion = sortedVersions[sortedVersions.length - 1];
  //if (range === 'latest') {    
  //  return res.json({ entry: pkgInfo.versions[latestVersion].entry, });
  //}

  const version = semverMaxSatisfying(packageVersions, range);
  if (!version) {
    return res.status(404).send("No version found");
  }
  res
    .status(200)
    .json({
      name2: "John Doe 2",
      packageVersions,
      latestVersion,
      name,
      range,
      sortedVersions,
      entry: pkgInfo.versions[version].entry,
    });
}
