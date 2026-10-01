// Shared by the landing page and /download/*: reads /version.json (written by the release workflow).
async function manifest() {
  const r = await fetch('/version.json', { cache: 'no-cache' });
  if (!r.ok) throw new Error('No release published yet.');
  return r.json();
}
function guessPlatform() {
  const ua = navigator.userAgent;
  return /Mac/.test(ua) ? 'macos' : /Win/.test(ua) ? 'windows' : '';
}
const LABEL = { macos: 'macOS', windows: 'Windows' };
