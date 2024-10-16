import { createLazyFileRoute } from "@tanstack/react-router";
import { Topic } from "@/pages/Topic/Topic";

export const Route = createLazyFileRoute("/topic")({
  component: Topic,
});
