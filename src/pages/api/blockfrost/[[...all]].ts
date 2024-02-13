import { NextApiHandler } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const getTarget = (networkType: string) => {
  switch (networkType) {
    case "preprod":
      return "https://cardano-preprod.blockfrost.io/api/v0";
    case "mainnet":
      return "https://cardano-mainnet.blockfrost.io/api/v0";
    default:
      return null;
  }
};

const getProjectId = (networkType: string) => {
  switch (networkType) {
    case "preprod":
      return process.env.BLOCKFROST_PROJECT_ID_PREPROD;
    case "mainnet":
      return process.env.BLOCKFROST_PROJECT_ID_MAINNET;
    default:
      return null;
  }
};

const blockfrostProxy: NextApiHandler = async (req, res) => {
  if (!req.url) {
    res.status(400).json({ message: "Request URL is undefined" });
    return;
  }

  const networkType = req.url.split("/")[3].toLowerCase();
  const target = getTarget(networkType);
  const PROJECT_ID = getProjectId(networkType);
  console.log("proxy hit");
  try {
    if (!target || !PROJECT_ID) {
      throw new Error("Invalid target or project id");
    }

    if (!req.headers["x-forwarded-port"]) {
      req.headers["x-forwarded-port"] = "443";
    }

    await httpProxyMiddleware(req, res, {
      target,
      headers: {
        project_id: PROJECT_ID,
      },

      pathRewrite: [
        {
          patternStr: `^/api/blockfrost/${networkType.toLowerCase()}`,
          replaceStr: "",
        },
      ],
    });
  } catch (error) {
    console.error("Proxy error", error);
    res.status(502).json({ message: "Proxy error" });
  }
};

export default blockfrostProxy;
