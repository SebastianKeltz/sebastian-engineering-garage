export const basePath = '/sebastian-engineering-garage';
export const siteUrl = `https://sebastiankeltz.github.io${basePath}/`;

// Native images, downloads, and metadata need the Pages repository prefix.
// SiteLink handles page navigation separately for static hosting.
export function publicPath(path: string) {
  return `${basePath}${path}`;
}
