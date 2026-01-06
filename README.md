1. Create server codes and run 'node index.js' in terminal'
2. Connect the MCP Server with Claude Desktop app (or anyother ai that supports mcp setup).
3. Paste the below code in the claude_desktop_config.json flie -
   {
  "mcpServers": {
    "wordpress": {
      "command": "node",
      "args": ["D:\\wp-mcp-server\\index.js"], (Change the directory path)
      "env": {}
    }
  }
}
