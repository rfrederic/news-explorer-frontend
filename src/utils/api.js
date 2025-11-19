import { API_KEY, BASE_URL } from "./constants";

export async function getArticles(query = "technology") {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(
        query
      )}&pageSize=20&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await response.json();

    return data.articles.map((article, index) => ({
      id: index + "_" + Date.now(),
      title: article.title || "No title",
      description: article.description || "No description",
      urlToImage:
        article.urlToImage ||
        "https://via.placeholder.com/600x400?text=No+Image",
      url: article.url,
      source: article.source?.name || "Unknown",
      publishedAt: article.publishedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
