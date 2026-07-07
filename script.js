const USERNAME = 'hpmodsdevelopment'; 
const REPO = 'HPMODS-Development-Products'; 

async function fetchDownloadCounts() {
    try {
        const response = await fetch(`https://github.com{USERNAME}/${REPO}/downloads`);
        const releases = await response.json();

        // loop through all elements that need a counter
        document.querySelectorAll('.download-counter').forEach(counter => {
            const fileName = counter.getAttribute('data-release-id');
            let downloadCount = 0;

            // search releases to find the matching file name
            releases.forEach(release => {
                release.assets.forEach(asset => {
                    if (asset.name === fileName) {
                        downloadCount += asset.download_count;
                    }
                });
            });

            // update the website text with the live count
            counter.innerText = `📥 ${downloadCount.toLocaleString()} downloads`;
        });
    } catch (error) {
        console.error("Error fetching download metrics:", error);
        document.querySelectorAll('.download-counter').forEach(counter => {
            counter.innerText = "Downloads unavailable";
        });
    }
}

// run the function when the webpage loads
window.addEventListener('DOMContentLoaded', fetchDownloadCounts);
