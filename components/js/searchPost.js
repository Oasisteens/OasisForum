import Fuse from "fuse.js";

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: true,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.5,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
  keys: [
    { name: "title", weight: 0.7 },
    { name: "username", weight: 0.3 },
  ],
};

export default function search(list, pattern) {
  const fuse = new Fuse(list, fuseOptions);
  return fuse.search(pattern);
}
