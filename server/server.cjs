const fastify = require("fastify")();
const { scrapeData } = require("./scraper.cjs");

// Your scraping URL
const url = "https://www.wcostream.org/";

fastify.get("/", async (request, reply) => {
  const data = await scrapeData(url);
  return data;
});

// Run the server!
try {
  fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
