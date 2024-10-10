import { useEffect, useState } from "react";

function App() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data));
  }, []);
  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map((topic: any) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
