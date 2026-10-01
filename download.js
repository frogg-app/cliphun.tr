// Shared by the landing page and /download/*: reads /version.json (written by the release workflow).
async function manifest() {
  const r = await fetch('/version.json', { cache: 'no-cache' });
  if (!r.ok) throw new Error('No release published yet.');
  return r.json();
}
function guessPlatform() {
  const ua = navigator.userAgent;
  return /Android/.test(ua) ? 'android' : /Mac/.test(ua) ? 'macos' : /Win/.test(ua) ? 'windows' : /Linux/.test(ua) ? 'linux' : '';
}
const LABEL = { macos: 'macOS', windows: 'Windows', android: 'Android', linux: 'Linux' };
const PATH = { macos: 'mac', windows: 'windows', android: 'android', linux: 'linux' };
const SOON = ['linux'];

// Starts the download for one platform on /download/<platform>/.
function startDownload(plat) {
  const msg = document.getElementById('msg');
  manifest().then(m => {
    const a = (m.downloads || {})[plat];
    if (!a) throw new Error(`The ${LABEL[plat]} build isn't in the latest release yet. Check back soon.`);
    msg.innerHTML = `Downloading ClipHuntr ${m.version} for ${LABEL[plat]}. <a href="${a.url}">Click here</a> if it doesn't start.`;
    location.replace(a.url);
  }).catch(e => { msg.textContent = e.message; });
}
