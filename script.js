const FEEDS = [
    "https://www.engadget.com/rss.xml",
    "https://www.theverge.com/rss/index.xml",
    "https://techcrunch.com/feed/"
];

document.getElementById('generate').addEventListener('click', async () => {
    const tag = document.getElementById('tag').value.toLowerCase();
    const results = document.getElementById('feed-results');
    results.innerHTML = 'Cargando...';

    let allItems = [];

    for (let feedUrl of FEEDS) {
        try {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
            const data = await res.json();
            allItems.push(...data.items);
        } catch (err) {
            console.error(`Error leyendo feed ${feedUrl}`, err);
        }
    }

    const filtered = allItems.filter(item =>
        item.title.toLowerCase().includes(tag) || item.description.toLowerCase().includes(tag)
    );

    results.innerHTML = filtered.map(item => `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`).join('');
});
