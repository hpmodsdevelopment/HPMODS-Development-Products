const USERNAME = 'hpmodsdevelopment';
const REPO = 'HPMODS-Development-Products';

async function fetchDownloadCounts() {
    try {
        // FIXED LINK: Switched to api.github.com and added missing forward slash before variables
        const response = await fetch(`https://github.com{USERNAME}/${REPO}/releases`);
        const releases = await response.json();

        document.querySelectorAll('.download-counter').forEach(counter => {
            const fileName = counter.getAttribute('data-release-id');
            let downloadCount = 0;

            // Make sure releases data came back as an array
            if (Array.isArray(releases)) {
                releases.forEach(release => {
                    if (release.assets) {
                        release.assets.forEach(asset => {
                            if (asset.name === fileName) {
                                downloadCount += asset.download_count;
                            }
                        });
                    }
                });
            }

            // Sets the real live number on your screen!
            counter.innerText = `📥 ${downloadCount.toLocaleString()} downloads`;
        });
    } catch (error) {
        console.error("Error fetching download metrics:", error);
        document.querySelectorAll('.download-counter').forEach(counter => {
            counter.innerText = "Downloads unavailable";
        });
    }
}

window.addEventListener('DOMContentLoaded', fetchDownloadCounts);
