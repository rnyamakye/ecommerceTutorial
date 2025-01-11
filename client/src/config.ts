interface Config {
  baseURL: string;
}

const checkConfig = (server: string): Config | {} => {
  let config: Config | {} = {};
  switch (server) {
    case "production":
      config = {
        baseURL: "https://ecommerce-tutorial-steel.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseURL: "http://localhost:8000",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "local";
export const config = checkConfig(selectServer) as Config;
