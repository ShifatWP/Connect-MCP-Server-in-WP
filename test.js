import fetch from "node-fetch";

const WP_BASE = "https://shifat.thdevs.com/wp-json/wp/v2";
const WP_USER = "shifat";
const WP_APP_PASSWORD = "E25R JWu5 TQnt 6msJ ToXS KAGN";

const authHeader = "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

async function test() {
  const res = await fetch(`${WP_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader
    },
    body: JSON.stringify({
      title: "Test Post from Node",
      content: "If you see this, auth works.",
      status: "draft"
    })
  });

  const text = await res.text();
  console.log("RAW RESPONSE:\n", text);
}

test();
