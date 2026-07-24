/**
 * AI-touchpoint signature database (shared contracts copy).
 * Source of truth: rapidact-build/signatures.json — regenerate when updated.
 */

export interface SignaturePatterns {
  scripts: string[];
  iframes: string[];
  dom: string[];
  globals: string[];
}

export interface AiSignature {
  id: string;
  name: string;
  vendor: string;
  category: string;
  article: string;
  severity: "high" | "medium" | "low";
  patterns: SignaturePatterns;
}

export const AI_SIGNATURES: AiSignature[] = [
  {
    "id": "intercom",
    "name": "Intercom / Fin AI Agent",
    "vendor": "Intercom",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "intercomcdn.com",
        "widget.intercom.io"
      ],
      "iframes": [
        "intercom"
      ],
      "dom": [
        "#intercom-container",
        "iframe[name*='intercom']",
        ".intercom-lightweight-app"
      ],
      "globals": [
        "Intercom",
        "intercomSettings"
      ]
    }
  },
  {
    "id": "zendesk",
    "name": "Zendesk Messaging / AI Agents",
    "vendor": "Zendesk",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "static.zdassets.com",
        "zdassets.com/ekr"
      ],
      "iframes": [
        "zendesk"
      ],
      "dom": [
        ".zEWidget-launcher",
        "#launcher",
        "iframe[title*='Zendesk']",
        "iframe[src*='zendesk.com/embeddables']"
      ],
      "globals": [
        "zE",
        "$zopim"
      ]
    }
  },
  {
    "id": "tidio",
    "name": "Tidio (+ Lyro AI)",
    "vendor": "Tidio",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "code.tidio.co"
      ],
      "iframes": [
        "tidio"
      ],
      "dom": [
        "#tidio-chat",
        "iframe[src*='tidio']"
      ],
      "globals": [
        "tidioChatApi"
      ]
    }
  },
  {
    "id": "tawkto",
    "name": "Tawk.to (+ AI Assist)",
    "vendor": "Tawk.to",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "embed.tawk.to"
      ],
      "iframes": [
        "tawk.to"
      ],
      "dom": [
        "iframe[src*='tawk.to']"
      ],
      "globals": [
        "Tawk_API"
      ]
    }
  },
  {
    "id": "crisp",
    "name": "Crisp (+ MagicReply AI)",
    "vendor": "Crisp",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "client.crisp.chat"
      ],
      "iframes": [
        "crisp"
      ],
      "dom": [
        ".crisp-client",
        "iframe[src*='crisp']"
      ],
      "globals": [
        "CRISP_WEBSITE_ID",
        "$crisp"
      ]
    }
  },
  {
    "id": "livechat",
    "name": "LiveChat / ChatBot.com",
    "vendor": "Text Inc.",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "cdn.livechatinc.com",
        "static-chat.com",
        "chatbot.com"
      ],
      "iframes": [
        "livechatinc",
        "chatbot"
      ],
      "dom": [
        "#chat-widget-container",
        "iframe[src*='livechatinc']"
      ],
      "globals": [
        "LiveChatWidget",
        "__lc"
      ]
    }
  },
  {
    "id": "drift",
    "name": "Drift / Salesloft AI",
    "vendor": "Salesloft",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "js.driftt.com",
        "drift.com"
      ],
      "iframes": [
        "drift"
      ],
      "dom": [
        "#drift-widget",
        "iframe[src*='drift']"
      ],
      "globals": [
        "drift",
        "driftt"
      ]
    }
  },
  {
    "id": "hubspot",
    "name": "HubSpot Chat / AI",
    "vendor": "HubSpot",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "js.hs-scripts.com",
        "js.hscollectedforms.net",
        "js.hs-analytics.net"
      ],
      "iframes": [
        "hubspot"
      ],
      "dom": [
        "#hubspot-messages-iframe-container",
        "iframe[src*='hubspot']"
      ],
      "globals": [
        "HubSpotConversations"
      ]
    }
  },
  {
    "id": "freshchat",
    "name": "Freshchat / Freddy AI",
    "vendor": "Freshworks",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "snippets.freshchat.io",
        "fw-cdn.com"
      ],
      "iframes": [
        "freshchat"
      ],
      "dom": [
        "#fc_widget",
        "iframe[src*='freshchat']"
      ],
      "globals": [
        "fcWidget",
        "FreshworksWidget"
      ]
    }
  },
  {
    "id": "smartsupp",
    "name": "Smartsupp AI Chatbot",
    "vendor": "Smartsupp",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "smartsuppchat.com",
        "smartsupp.com"
      ],
      "iframes": [
        "smartsupp"
      ],
      "dom": [
        "#smartsupp-widget-container",
        "iframe[src*='smartsupp']"
      ],
      "globals": [
        "smartsupp"
      ]
    }
  },
  {
    "id": "chatra",
    "name": "Chatra",
    "vendor": "Chatra",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "call.chatra.io"
      ],
      "iframes": [
        "chatra"
      ],
      "dom": [
        "iframe[src*='chatra']"
      ],
      "globals": [
        "ChatraID",
        "Chatra"
      ]
    }
  },
  {
    "id": "jivochat",
    "name": "JivoChat",
    "vendor": "JivoChat",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "code.jivosite.com"
      ],
      "iframes": [
        "jivosite"
      ],
      "dom": [
        "iframe[src*='jivosite']"
      ],
      "globals": [
        "jivo_api"
      ]
    }
  },
  {
    "id": "userlike",
    "name": "Userlike AI",
    "vendor": "Userlike",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "userlike-cdn-widgets.s3",
        "userlike.com"
      ],
      "iframes": [
        "userlike"
      ],
      "dom": [
        "iframe[src*='userlike']"
      ],
      "globals": [
        "userlike"
      ]
    }
  },
  {
    "id": "olark",
    "name": "Olark",
    "vendor": "Olark",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "static.olark.com"
      ],
      "iframes": [
        "olark"
      ],
      "dom": [
        "#olark-box-wrapper",
        "iframe[src*='olark']"
      ],
      "globals": [
        "olark"
      ]
    }
  },
  {
    "id": "chaport",
    "name": "Chaport",
    "vendor": "Chaport",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "app.chaport.com"
      ],
      "iframes": [
        "chaport"
      ],
      "dom": [
        "iframe[src*='chaport']"
      ],
      "globals": [
        "chaport"
      ]
    }
  },
  {
    "id": "formilla",
    "name": "Formilla AI",
    "vendor": "Formilla",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "formilla.com"
      ],
      "iframes": [
        "formilla"
      ],
      "dom": [
        "iframe[src*='formilla']"
      ],
      "globals": [
        "Formilla"
      ]
    }
  },
  {
    "id": "gorgias",
    "name": "Gorgias AI Agent",
    "vendor": "Gorgias",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "gorgias.chat",
        "client-api.gorgias"
      ],
      "iframes": [
        "gorgias"
      ],
      "dom": [
        "#gorgias-chat-container",
        "iframe[src*='gorgias']"
      ],
      "globals": [
        "GorgiasChat"
      ]
    }
  },
  {
    "id": "oct8ne",
    "name": "oct8ne",
    "vendor": "oct8ne",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "oct8ne.com",
        "oct8ne-cdn"
      ],
      "iframes": [
        "oct8ne"
      ],
      "dom": [
        "chat-oct8ne",
        "iframe[src*='oct8ne']",
        "[id*='oct8ne']"
      ],
      "globals": [
        "oct8ne"
      ]
    }
  },
  {
    "id": "landbot",
    "name": "Landbot AI Agents",
    "vendor": "Landbot",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "landbot.io",
        "static.landbot.io"
      ],
      "iframes": [
        "landbot.io",
        "landbot.app"
      ],
      "dom": [
        "div[id^='landbot']",
        "iframe[src*='landbot']"
      ],
      "globals": [
        "Landbot",
        "myLandbot"
      ]
    }
  },
  {
    "id": "chatbase",
    "name": "Chatbase",
    "vendor": "Chatbase",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "chatbase.co"
      ],
      "iframes": [
        "chatbase.co"
      ],
      "dom": [
        "iframe[src*='chatbase.co']"
      ],
      "globals": [
        "chatbase"
      ]
    }
  },
  {
    "id": "botpress",
    "name": "Botpress",
    "vendor": "Botpress",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "botpress.cloud",
        "cdn.botpress"
      ],
      "iframes": [
        "botpress"
      ],
      "dom": [
        "#botpress-widget-container",
        "iframe[src*='botpress']"
      ],
      "globals": [
        "botpressWebChat"
      ]
    }
  },
  {
    "id": "voiceflow",
    "name": "Voiceflow",
    "vendor": "Voiceflow",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "cdn.voiceflow.com",
        "voiceflow.com"
      ],
      "iframes": [
        "voiceflow"
      ],
      "dom": [
        "iframe[src*='voiceflow']",
        "#voiceflow-chat"
      ],
      "globals": [
        "voiceflow"
      ]
    }
  },
  {
    "id": "manychat",
    "name": "ManyChat",
    "vendor": "ManyChat",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "widget.manychat.com",
        "mccdn.me"
      ],
      "iframes": [
        "manychat"
      ],
      "dom": [
        "iframe[src*='manychat']"
      ],
      "globals": [
        "ManyChat"
      ]
    }
  },
  {
    "id": "qualified",
    "name": "Qualified AI (Piper)",
    "vendor": "Qualified",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "cdn.qualified.com",
        "js.qualified.com"
      ],
      "iframes": [
        "qualified"
      ],
      "dom": [
        "iframe[src*='qualified']"
      ],
      "globals": [
        "qualified"
      ]
    }
  },
  {
    "id": "liveperson",
    "name": "LivePerson Conversational AI",
    "vendor": "LivePerson",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "liveperson.net",
        "lpsnmedia.net"
      ],
      "iframes": [
        "liveperson"
      ],
      "dom": [
        "iframe[src*='liveperson']",
        "div[id*='lp_']"
      ],
      "globals": [
        "lpTag"
      ]
    }
  },
  {
    "id": "genesys",
    "name": "Genesys Cloud CX Bots",
    "vendor": "Genesys",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "genesys.cloud",
        "mypurecloud.com"
      ],
      "iframes": [
        "purecloud"
      ],
      "dom": [
        "iframe[src*='purecloud']"
      ],
      "globals": [
        "Genesys"
      ]
    }
  },
  {
    "id": "ada",
    "name": "Ada AI Agent",
    "vendor": "Ada",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "static.ada.support"
      ],
      "iframes": [
        "ada.support"
      ],
      "dom": [
        "#ada-chat-frame",
        "iframe[src*='ada.support']"
      ],
      "globals": [
        "adaEmbed"
      ]
    }
  },
  {
    "id": "cognigy",
    "name": "Cognigy.AI",
    "vendor": "Cognigy",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "cognigy.com",
        "cognigy.ai"
      ],
      "iframes": [
        "cognigy"
      ],
      "dom": [
        "iframe[src*='cognigy']"
      ],
      "globals": [
        "cognigy"
      ]
    }
  },
  {
    "id": "verloop",
    "name": "Verloop.io",
    "vendor": "Verloop",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "verloop.io"
      ],
      "iframes": [
        "verloop"
      ],
      "dom": [
        "iframe[src*='verloop']"
      ],
      "globals": [
        "Verloop"
      ]
    }
  },
  {
    "id": "yellowai",
    "name": "Yellow.ai",
    "vendor": "Yellow.ai",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "cdn.yellowmessenger.com",
        "yellow.ai"
      ],
      "iframes": [
        "yellowmessenger"
      ],
      "dom": [
        "iframe[src*='yellowmessenger']"
      ],
      "globals": [
        "YM"
      ]
    }
  },
  {
    "id": "kommunicate",
    "name": "Kommunicate AI",
    "vendor": "Kommunicate",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "widget.kommunicate.io"
      ],
      "iframes": [
        "kommunicate"
      ],
      "dom": [
        "iframe[src*='kommunicate']"
      ],
      "globals": [
        "kommunicate"
      ]
    }
  },
  {
    "id": "trengo",
    "name": "Trengo AI",
    "vendor": "Trengo",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "static.trengo.com",
        "trengo.com"
      ],
      "iframes": [
        "trengo"
      ],
      "dom": [
        "iframe[src*='trengo']"
      ],
      "globals": [
        "Trengo"
      ]
    }
  },
  {
    "id": "helpscout",
    "name": "Help Scout Beacon / AI",
    "vendor": "Help Scout",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "beacon-v2.helpscout.net"
      ],
      "iframes": [
        "helpscout"
      ],
      "dom": [
        "iframe[src*='helpscout']"
      ],
      "globals": [
        "Beacon"
      ]
    }
  },
  {
    "id": "zoho",
    "name": "Zoho SalesIQ / Zobot",
    "vendor": "Zoho",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "salesiq.zoho.com",
        "salesiq.zohopublic.com"
      ],
      "iframes": [
        "salesiq"
      ],
      "dom": [
        "iframe[src*='salesiq']",
        "#zsiqwidget"
      ],
      "globals": [
        "$zoho"
      ]
    }
  },
  {
    "id": "wpbot",
    "name": "WPBot / ChatBot for WordPress",
    "vendor": "QuantumCloud",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [],
      "iframes": [],
      "dom": [
        "#wp-chatbot-wrapper",
        ".wp-chatbot-wrapper",
        "#wpChatbot"
      ],
      "globals": [
        "wpbot"
      ]
    }
  },
  {
    "id": "cliengo",
    "name": "Cliengo",
    "vendor": "Cliengo",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "cliengo.com"
      ],
      "iframes": [
        "cliengo"
      ],
      "dom": [
        "iframe[src*='cliengo']"
      ],
      "globals": [
        "cliengo"
      ]
    }
  },
  {
    "id": "collectchat",
    "name": "Collect.chat",
    "vendor": "Collect.chat",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "collect.chat"
      ],
      "iframes": [
        "collect.chat"
      ],
      "dom": [
        "iframe[src*='collect.chat']"
      ],
      "globals": [
        "collectchat"
      ]
    }
  },
  {
    "id": "continually",
    "name": "Continually",
    "vendor": "Continually",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "continual.ly"
      ],
      "iframes": [
        "continual.ly"
      ],
      "dom": [
        "iframe[src*='continual.ly']"
      ],
      "globals": [
        "Continually"
      ]
    }
  },
  {
    "id": "aivo",
    "name": "Aivo AgentBot",
    "vendor": "Aivo",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "aivo.co",
        "whisnumessenger"
      ],
      "iframes": [
        "aivo"
      ],
      "dom": [
        "iframe[src*='aivo']"
      ],
      "globals": [
        "Aivo"
      ]
    }
  },
  {
    "id": "watson",
    "name": "IBM watsonx Assistant",
    "vendor": "IBM",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "web-chat.global.assistant.watson"
      ],
      "iframes": [
        "watson"
      ],
      "dom": [
        "iframe[src*='watson']"
      ],
      "globals": [
        "watsonAssistantChatOptions"
      ]
    }
  },
  {
    "id": "salesforce",
    "name": "Salesforce Einstein Bots",
    "vendor": "Salesforce",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "service.force.com",
        "salesforceliveagent.com"
      ],
      "iframes": [
        "force.com"
      ],
      "dom": [
        "iframe[src*='salesforceliveagent']"
      ],
      "globals": [
        "embedded_svc"
      ]
    }
  },
  {
    "id": "interakt",
    "name": "Interakt AI",
    "vendor": "Interakt",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "interakt.chat"
      ],
      "iframes": [
        "interakt"
      ],
      "dom": [
        "iframe[src*='interakt']"
      ],
      "globals": [
        "interakt"
      ]
    }
  },
  {
    "id": "tars",
    "name": "Tars Chatbots",
    "vendor": "Tars",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "tars-file-upload.s3",
        "hellotars.com"
      ],
      "iframes": [
        "hellotars"
      ],
      "dom": [
        "iframe[src*='hellotars']"
      ],
      "globals": [
        "Tars"
      ]
    }
  },
  {
    "id": "pandorabots",
    "name": "Pandorabots",
    "vendor": "Pandorabots",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "pandorabots.com"
      ],
      "iframes": [
        "pandorabots"
      ],
      "dom": [
        "iframe[src*='pandorabots']"
      ],
      "globals": [
        "pandorabots"
      ]
    }
  },
  {
    "id": "willdesk",
    "name": "Willdesk AI (Shopify)",
    "vendor": "Channelwill",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "willdesk.com"
      ],
      "iframes": [
        "willdesk"
      ],
      "dom": [
        "iframe[src*='willdesk']"
      ],
      "globals": [
        "willdesk"
      ]
    }
  },
  {
    "id": "chatty",
    "name": "Chatty AI (Shopify)",
    "vendor": "Chatty",
    "category": "chat",
    "article": "50(1)",
    "severity": "medium",
    "patterns": {
      "scripts": [
        "chattyapp.com"
      ],
      "iframes": [
        "chattyapp"
      ],
      "dom": [
        "iframe[src*='chattyapp']"
      ],
      "globals": [
        "chatty"
      ]
    }
  },
  {
    "id": "repai",
    "name": "Rep AI (Shopify)",
    "vendor": "Rep AI",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "rep.ai",
        "hellorep.ai"
      ],
      "iframes": [
        "rep.ai"
      ],
      "dom": [
        "iframe[src*='rep.ai']"
      ],
      "globals": [
        "repAI"
      ]
    }
  },
  {
    "id": "doofinder",
    "name": "Doofinder AI Search",
    "vendor": "Doofinder",
    "category": "search",
    "article": "50(1)",
    "severity": "low",
    "patterns": {
      "scripts": [
        "doofinder.com",
        "doofinder"
      ],
      "iframes": [],
      "dom": [
        "#doofinder-container",
        ".df-layer"
      ],
      "globals": [
        "doofinder"
      ]
    }
  },
  {
    "id": "algolia",
    "name": "Algolia AI Search",
    "vendor": "Algolia",
    "category": "search",
    "article": "50(1)",
    "severity": "low",
    "patterns": {
      "scripts": [
        "algolia.net",
        "algolianet.com"
      ],
      "iframes": [],
      "dom": [
        "#algolia-autocomplete",
        ".ais-search-box"
      ],
      "globals": [
        "algoliasearch"
      ]
    }
  },
  {
    "id": "klevu",
    "name": "Klevu AI Search",
    "vendor": "Klevu",
    "category": "search",
    "article": "50(1)",
    "severity": "low",
    "patterns": {
      "scripts": [
        "klevu.com"
      ],
      "iframes": [],
      "dom": [
        "#klevu-search",
        ".klevu-fluid"
      ],
      "globals": [
        "klevu"
      ]
    }
  },
  {
    "id": "openai-embed",
    "name": "OpenAI/GPT embedded assistant",
    "vendor": "Custom/LLM",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "openai.com"
      ],
      "iframes": [
        "openai",
        "chatgpt"
      ],
      "dom": [
        "iframe[src*='openai']",
        "iframe[src*='chatgpt']"
      ],
      "globals": [
        "openai"
      ]
    }
  },
  {
    "id": "dialogflow",
    "name": "Google Dialogflow Messenger",
    "vendor": "Google",
    "category": "chat",
    "article": "50(1)",
    "severity": "high",
    "patterns": {
      "scripts": [
        "dialogflow.cloud.google.com",
        "www.gstatic.com/dialogflow-console"
      ],
      "iframes": [
        "dialogflow"
      ],
      "dom": [
        "df-messenger",
        "df-messenger-chat"
      ],
      "globals": [
        "dfMessenger"
      ]
    }
  }
];
