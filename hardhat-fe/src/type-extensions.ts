import "hardhat/types/config";

import { FeConfig } from "./types";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    fe?: Partial<FeConfig>;
  }

  interface HardhatConfig {
    fe: FeConfig;
  }
}
