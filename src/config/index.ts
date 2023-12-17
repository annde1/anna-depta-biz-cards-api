import { config } from "dotenv";
const configDotEnv = () => {
  //Load the main env file
  config({ path: "src/config/.env" });
  //Choose the mode
  const mode = process.env.NODE_ENV; //dec|test|prod -> run mode
  //Load the config file
  config({ path: `src/config/${mode}.env` });
};
export default configDotEnv;
export { configDotEnv as config };
