require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

app.post("/getPersonalizedNews", async (req, res) => {
  const { user_id } = req.body.input;

  try {
    // Fetch saved articles for the user
    const query = `
      query GetUserSavedArticles($user_id: UUID!) {
        saved_articles(where: { user_id: { _eq: $user_id } }) {
          article {
            category
          }
        }
      }
    `;

    const response = await axios.post(
      HASURA_GRAPHQL_URL,
      {
        query,
        variables: { user_id },
      },
      {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
      }
    );

    const savedCategories = response.data.data.saved_articles.map((a) => a.article.category);
    const uniqueCategories = [...new Set(savedCategories)];

    // Fetch recommended articles from those categories
    const recommendationQuery = `
      query GetRecommendedArticles($categories: [String!]) {
        articles(where: { category: { _in: $categories } }) {
          id
          title
          summary
          category
          sentiment
        }
      }
    `;

    const recommendedArticles = await axios.post(
      HASURA_GRAPHQL_URL,
      {
        query: recommendationQuery,
        variables: { categories: uniqueCategories },
      },
      {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
      }
    );

    res.json({ data: recommendedArticles.data.data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
