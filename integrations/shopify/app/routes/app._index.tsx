import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { useEffect } from "react";
import { useLoaderData, useRouteError } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

const BUNDLED_BADGE_VERSION = "1.0.0";
const MANIFEST_URL = "https://rapidact.eu/badge-manifest.json";

type BadgeManifest = {
  platforms?: {
    shopify?: {
      version?: string;
    };
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { authenticated: Boolean(session.shop) };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const response = await admin.graphql(`#graphql
    query RapidActShop {
      shop {
        name
        myshopifyDomain
      }
    }
  `);
  const result = await response.json();
  const shop = result.data?.shop;

  let latestVersion = BUNDLED_BADGE_VERSION;
  try {
    const manifestResponse = await fetch(MANIFEST_URL, {
      headers: { Accept: "application/json" },
    });
    if (manifestResponse.ok) {
      const manifest = (await manifestResponse.json()) as BadgeManifest;
      latestVersion =
        manifest.platforms?.shopify?.version || BUNDLED_BADGE_VERSION;
    }
  } catch {
    // Version awareness is informational; the bundled extension still works.
  }

  const shopDomain = shop?.myshopifyDomain || session.shop;
  const appKey = process.env.SHOPIFY_API_KEY || "";

  return {
    shopName: shop?.name || shopDomain,
    bundledVersion: BUNDLED_BADGE_VERSION,
    latestVersion,
    editorUrl: `https://${shopDomain}/admin/themes/current/editor?context=apps&activateAppId=${appKey}/rapidact-badge`,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const shopify = useAppBridge();
  const updateAvailable = data.latestVersion !== data.bundledVersion;

  useEffect(() => {
    let disposed = false;

    const authenticateClientRequest = async () => {
      await shopify.ready;
      const idToken = await shopify.idToken();
      if (disposed) return;

      await fetch(window.location.pathname, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
    };

    void authenticateClientRequest().catch(() => undefined);

    return () => {
      disposed = true;
    };
  }, [shopify]);

  return (
    <s-page heading="RapidAct AI disclosure">
      <s-section heading={`Ready for ${data.shopName}`}>
        <s-paragraph>
          Add the RapidAct app embed to your storefront, enter the customer
          Badge ID, and save the theme. The disclosure script and brand image
          are bundled in this Shopify app version.
        </s-paragraph>
        <s-stack direction="inline" gap="base">
          <s-link href={data.editorUrl} target="_top">
            Open the theme editor
          </s-link>
        </s-stack>
      </s-section>

      <s-section heading="Version">
        <s-paragraph>
          Bundled badge {data.bundledVersion}.{" "}
          {updateAvailable
            ? `Version ${data.latestVersion} is available in the next Shopify app release.`
            : "This is the current published badge version."}
        </s-paragraph>
      </s-section>

      <s-section slot="aside" heading="Three steps">
        <s-paragraph>1. Open the theme editor.</s-paragraph>
        <s-paragraph>2. Enable RapidAct and enter the Badge ID.</s-paragraph>
        <s-paragraph>3. Save and check the live storefront.</s-paragraph>
      </s-section>
    </s-page>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
