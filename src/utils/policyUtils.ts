// src/utils/policyUtils.ts

import { PolicyID } from "@/types/policyEnum";

export const policyIdToCollectionName: { [key in PolicyID]?: string } = {
  [PolicyID.LoveLace]: "Lovelace",
  [PolicyID.Mane]: "Mane",
  [PolicyID.LuckyLions]: "Lucky Lions",
  [PolicyID.Residents]: "Residents",
  [PolicyID.FooDogs]: "Foo Dogs",
  [PolicyID.Degens]: "Degens",
  [PolicyID.Ledger]: "Ledger",
  [PolicyID.Gangs]: "Gangs",
  [PolicyID.Handle]: "Handle",
  [PolicyID.Preprod1]: "preprod 1",
  [PolicyID.Preprod2]: "preprod 2",
  [PolicyID.Preprod3]: "preprod 3",
  [PolicyID.Preprod4]: "preprod 4",
  [PolicyID.T_Mane]: "T-Mane",

  // Add other mappings as needed
};
