import { Link } from "react-router";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNav from "@/components/layout/SiteNav";
import { useI18n } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Page not found",
    body: "That RapidAct page does not exist.",
    link: "Return home",
  },
  es: {
    title: "Página no encontrada",
    body: "Esa página de RapidAct no existe.",
    link: "Volver al inicio",
  },
  de: {
    title: "Seite nicht gefunden",
    body: "Diese RapidAct-Seite existiert nicht.",
    link: "Zur Startseite",
  },
  fr: {
    title: "Page introuvable",
    body: "Cette page RapidAct n’existe pas.",
    link: "Retour à l’accueil",
  },
  it: {
    title: "Pagina non trovata",
    body: "Questa pagina RapidAct non esiste.",
    link: "Torna alla home",
  },
} as const;

export default function NotFound() {
  const { lang, path } = useI18n();
  const copy = COPY[lang];
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`${copy.title} | RapidAct`}
        description={copy.body}
        canonical={null}
        robots="noindex, nofollow"
      />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#16181d]">
          {copy.title}
        </h1>
        <p className="mt-4 text-[#5c6370]">{copy.body}</p>
        <Link
          to={path("/")}
          className="mt-7 inline-flex min-h-11 items-center rounded bg-[#16181d] px-5 text-sm font-semibold text-white"
        >
          {copy.link}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
