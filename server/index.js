const express = require("express");
const { Topic, Comment } = require("./models");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // Allow specific methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  next();
});

app.get("/topics", async (req, res) => {
  const topics = await Topic.findAll({ include: "comments" });
  res.json(topics);
});

app.get("/topics/:id", async (req, res) => {
  const topic = await Topic.findByPk(req.params.id, { include: "comments" });
  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ error: "Topic not found" });
  }
});

app.post("/topics", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newTopic = await Topic.create({ title, content });
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/topics/:id/comments", async (req, res) => {
  const { author } = req.body;
  const topic = await Topic.findByPk(req.params.id);

  if (!topic) {
    return res.status(404).json({ error: "Topic not found" });
  }

  try {
    const newComment = await Comment.create({ author, content, TopicId: topic.id });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/topics/:id", async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  if (topic) {
    await topic.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Topic not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
