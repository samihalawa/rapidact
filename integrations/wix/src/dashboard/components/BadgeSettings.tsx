import React, { useEffect, useState } from "react";
import { Box, Button, FormField, Input, Loader, Text } from "@wix/design-system";
import { useEmbeds } from "../hooks/wix-embeds.js";

type RapidActParameters = {
  badgeId: string;
  language: string;
};

export default function BadgeSettings() {
  const { embedScript, getEmbeddedScript } = useEmbeds<RapidActParameters>();
  const [badgeId, setBadgeId] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (getEmbeddedScript.data) {
      setBadgeId(getEmbeddedScript.data.badgeId || "");
      setLanguage(getEmbeddedScript.data.language || "en");
    }
  }, [getEmbeddedScript.data]);

  const isSaved =
    getEmbeddedScript.data?.badgeId === badgeId &&
    getEmbeddedScript.data?.language === language;
  const validLanguage = ["en", "es", "de", "fr", "it"].includes(language);

  if (getEmbeddedScript.isLoading) {
    return <Loader size="small" />;
  }

  return (
    <Box direction="vertical" gap={3}>
      <FormField
        label="Badge ID"
        infoContent="Optional customer identifier supplied by RapidAct."
      >
        <Input
          disabled={embedScript.isLoading}
          placeholder="customer-badge-id"
          value={badgeId}
          onChange={(event) => setBadgeId(event.currentTarget.value)}
        />
      </FormField>
      <FormField
        label="Language"
        infoContent="Use en, es, de, fr, or it."
      >
        <Input
          disabled={embedScript.isLoading}
          value={language}
          onChange={(event) =>
            setLanguage(event.currentTarget.value.toLowerCase().slice(0, 2))
          }
        />
      </FormField>
      {!validLanguage && <Text skin="error">Enter en, es, de, fr, or it.</Text>}
      <Button
        disabled={isSaved || !validLanguage || embedScript.isLoading}
        onClick={() => embedScript.mutate({ badgeId, language })}
      >
        {embedScript.isLoading
          ? <Loader size="tiny" />
          : getEmbeddedScript.data
            ? "Update notice"
            : "Activate notice"}
      </Button>
    </Box>
  );
}
