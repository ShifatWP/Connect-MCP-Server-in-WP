import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fetch from "node-fetch";
import { z } from "zod";

const WP_BASE = "https://your-site.com/wp-json/wp/v2"; // The rest api URL.
const WP_USER = "username";// The user name.
const WP_APP_PASSWORD = "pass"; // Wodpress application password.

// Base64 auth header for WordPress Basic Auth
const authHeader = "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

// Create MCP server instance
const server = new McpServer({
  name: "wordpress-mcp",
  version: "1.0.0"
});

// Register create_post tool
server.registerTool(
  "create_post",
  {
    title: "Create WordPress Post",
    description: "Create a new Post in WordPress",
    inputSchema: z.object({
      title: z.string().describe("Title for the post"),
      content: z.string().describe("HTML or text content"),
      status: z.string().describe("Post status e.g. publish")
    })
  },
  async ({ title, content, status = "publish" }) => {

    const res = await fetch(`${WP_BASE}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      },
      body: JSON.stringify({ title, content, status })
    });

    const data = await res.json();
    return {
      content: [
        { type: "text", text: `Post Created: ${data.link}` }
      ]
    };
  }
);

// Register update_post tool
server.registerTool(
  "update_post",
  {
    title: "Update WordPress Post",
    description: "Update an existing WordPress post",
    inputSchema: z.object({
      post_id: z.number().describe("Post ID to update"),
      title: z.string().optional().describe("New title"),
      content: z.string().optional().describe("New content")
    })
  },
  async ({ post_id, title, content }) => {
    const res = await fetch(`${WP_BASE}/posts/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      },
      body: JSON.stringify({ title, content })
    });
    const data = await res.json();
    return {
      content: [
        { type: "text", text: `Post Updated: ${data.link}` }
      ]
    };
  }
);



// Connect server via STDIO (used by Claude Desktop)
await server.connect(new StdioServerTransport());
console.error("✅ WordPress MCP Server running...");

