import React, { useEffect, useState } from "react";
import { Box, Card, Page, Text } from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import BadgeSettings from "../components/BadgeSettings.js";
import { withProviders } from "../withProviders.js";

const BUNDLED_VERSION = "1.0.0";

function RapidActDashboard() {
  const [latestVersion, setLatestVersion] = useState(BUNDLED_VERSION);

  useEffect(() => {
    fetch("https://rapidact.eu/badge-manifest.json", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.ok ? response.json() : null)
      .then((manifest) => {
        const version = manifest?.platforms?.wix?.version;
        if (typeof version === "string") setLatestVersion(version);
      })
      .catch(() => undefined);
  }, []);

  return (
    <Page height="100vh">
      <Page.Header title="RapidAct AI disclosure" />
      <Page.Content>
        <Card>
          <Card.Header title="Publish the visitor notice" />
          <Card.Divider />
          <Card.Content>
            <Box direction="vertical" gap={4}>
              <Text>
                Enter the customer Badge ID, choose the language, and activate.
                Wix injects the bundled notice on every published page.
              </Text>
              <BadgeSettings />
              <Text size="tiny" skin="standard">
                Bundled badge {BUNDLED_VERSION}.{" "}
                {latestVersion === BUNDLED_VERSION
                  ? "This is the current published version."
                  : `Version ${latestVersion} will arrive through the next Wix app version.`}
              </Text>
            </Box>
          </Card.Content>
        </Card>
      </Page.Content>
    </Page>
  );
}

export default withProviders(RapidActDashboard);
