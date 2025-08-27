const FEEDS = [

    "https://www.uxmatters.com/rss.php",  
    "https://uxmag.com/rss",  
    "https://rss.feedspot.com/ux_rss_feeds/",


    "https://wiki.seeedstudio.com/sensecraft_hmi_rss/",  
    "https://doc.exorint.net/jmobile/v4.07/en/Content/Manual/RSS%20Feed%20Widget.htm",


    "https://www.automotive-iq.com/rss-feeds",  
    "https://www.weather.gov/mlb/adas_status",


    "https://rss.feedspot.com/automobile_rss_feeds/",  
    "https://www.motor1.com/rss/",  
    "https://www.thecarconnection.com/rss",


    "https://rss.feedspot.com/ai_rss_feeds/",  
    "https://feeder.co/discover/ai",  
    "https://www.reddit.com/r/rss/comments/1ezcwdh/large_collection_of_rss_feeds_in_the_ai_space/"

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
