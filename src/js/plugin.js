import axios from "axios";
import cheerio from "cheerio";

export default class Plugin {
    constructor() {
        this.name = "";
        this.url = "";
        this.icon = "";
        this.supportedMethods = [];
    }

    async executeMethod(methodName, ...args) {
        if (!this.supportedMethods.includes(methodName)) {
            throw new Error(`Method ${methodName} is not supported by plugin ${this.name}`);
        }

        const result = await this[methodName](...args);
        return result;
    }

    async getUrl(url) {
        // Use axios or any other library to fetch HTML content
        const response = await axios.get(url);
        return response.data;
    }

    dom(html) {
    //     var parser = new DOMParser();
    //    return parser.parseFromString(html, "text/html");

     return cheerio.load(html);
    }

    async searchResult(data) {
        // Handle search result data
    }

    async trendingResult(data) {
        // Handle trending result data
    }

    async latestResult(data) {
        // Handle latest result data
    }
}
