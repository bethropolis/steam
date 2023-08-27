const axios = require("axios");
const jsdom = require("jsdom");
const fs = require('fs');

const { JSDOM } = jsdom;

const cache = {};
const cacheValidityTime = 60 * 60 * 1000; // 1 hour in milliseconds

const getHtml = async (url) => {
    return await axios.get(url);
  };

const scrapeData = async (url) => {
    console.log("🚀 ~ file: scraper.cjs:9 ~ scrapeData ~ url:", url)
    
    // Check if the data is already in the cache and not expired
    if (cache[url] && Date.now() - cache[url].timestamp < cacheValidityTime) {
        console.log("Using cached data");
        return cache[url].data;
    }

    console.log("Fetching data");

    const html = await getHtml(url);
    const dom = new JSDOM(html.data);

    const { document } = dom.window;

    let posts = document.querySelectorAll("#content > div:nth-child(5) > div");
    console.log("🚀 ~ file: scraper.cjs:23 ~ scrapeData ~ posts:", posts)

    const data = {};

    posts.forEach((post, i) => {
        
        // write the html into scraped.html
        fs.appendFileSync('server/scraped.html', post.outerHTML);

        if(!post.getElementsByClassName("recent-release").length){ 
            return;
        }

        let type = post?.querySelector("div.recent-release > a")?.getAttribute("name");
        let items = post.querySelectorAll("div.sidebar_body > ul > li");
        data[type] = []
        console.log(`${i}: ${type} items: ${items.length}`);
        items.forEach((item,index) => {
            let img = item.querySelector("div.img > a > img");
            let name = img.getAttribute("alt");
            let show_url = url + name.split(" ").join("-");
            let prev_img = img.getAttribute("src");

            data[type].push({
                prev_img,
                show_url,
                name,
            })

        })
    });

    // Store the scraped data in the cache
    cache[url] = {
        data: data,
        timestamp: Date.now(),
    };

    return data;
};

module.exports = { scrapeData };
