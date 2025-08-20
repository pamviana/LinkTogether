import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Register ts-node for ESM TypeScript support
register("ts-node/esm", pathToFileURL("./"));