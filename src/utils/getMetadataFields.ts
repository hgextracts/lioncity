type PolicySpecificFields = {
  [key: string]: string[]; // This is the index signature
};

const policyId1 = "c41f8b855fe0b9a0d378e5a8d716f9fab287c1fa63e7ccb94ecfce2d";
const policyId2 = "d1cec82b0608ab5483bd6969cccd0867d60dc9a8bf9700617210b8a5";

export const getMetadataFields = (policyId: string): string[] => {
  const policySpecificFields: PolicySpecificFields = {
    [policyId1]: [
      "Eyes",
      "Mouth",
      "Hair",
      "Head",
      "Skin",
      "Body",
      "Background",
      "Status",
    ],
    [policyId2]: [
      "Eyes",
      "Mouth",
      "Hair",
      "Head",
      "Skin",
      "Body",
      "Background",
      "Accessories",
    ],
    // Add other policies as needed
  };
  return policySpecificFields[policyId] || [];
};
