export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", ["towk-key-1", "towk-key-2"]),
  },
  url: env("PUBLIC_URL", "http://localhost:1337"),
});
