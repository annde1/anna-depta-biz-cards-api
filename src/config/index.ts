import { config } from "dotenv";
const configDotEnv = () => {
  //load the main/general .env file
  config({ path: "src/config/.env" });
  const mode = process.env.NODE_ENV; //dec|test|prod -> run mode
  console.log("App is running in", mode, "mode");

  //load config file
  config({ path: `src/config/${mode}.env` });
};
export default configDotEnv;
export { configDotEnv as config };
