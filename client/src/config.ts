interface Config {
  baseURL: string;
}

const checkConfig = (server: string): Config | {} => {
  let config: Config | {} = {};
  switch (server) {
    case "production":
      config = {
        baseURL:
          "https://ecommerce-tutorial-richard-nyamekyes-projects.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseURL:
          "https://ecommerce-tutorial-richard-nyamekyes-projects.vercel.app/",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "local";
export const config = checkConfig(selectServer) as Config;
