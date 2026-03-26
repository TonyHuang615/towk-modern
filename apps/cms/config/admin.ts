export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "towk-admin-jwt-secret"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "towk-api-token-salt"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "towk-transfer-token-salt"),
    },
  },
});
