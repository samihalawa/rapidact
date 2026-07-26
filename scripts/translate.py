#!/usr/bin/env python3
"""
RapidAct translation pipeline — automated, parallel, resumable.

Translates content/en/** markdown into es/de/fr/it using any OpenAI-compatible
chat API (Gemini via openai-compatible endpoint, OpenAI, DeepSeek, local LLM…).

Usage:
  export TRANSLATE_API_KEY=...
  export TRANSLATE_API_BASE=https://generativelanguage.googleapis.com/v1beta/openai
  export TRANSLATE_MODEL=gemini-2.5-flash
  python3 scripts/translate.py [--langs es,de] [--workers 8] [--dry-run]

- Preserves frontmatter keys; translates title/description + markdown body.
- Skips files that already exist (re-run safely; delete a file to retranslate).
- Keeps internal links (paths) untouched; translates anchor text only.
"""
import os, sys, json, time, argparse, concurrent.futures, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "content", "en")

PROMPT = """You are a professional marketing translator for the EU AI compliance niche.
Translate the following markdown document from English to {lang_name}.

Rules:
- Keep ALL markdown structure exactly (headers, tables, links, bold, blockquotes, frontmatter ---).
- Keep URLs/link paths unchanged (e.g. /scanner, /answers/foo) — translate only the visible anchor text.
- Keep brand/product names unchanged: RapidAct, Article 50, EU AI Act, WordPress, Tidio, Zendesk, etc.
- Keep prices as-is (€0 for the free tools, €99 for the company assessment).
- Tone: clear, plain, direct — match the source's no-jargon style.
- Output ONLY the translated document, nothing else.

DOCUMENT:
{doc}"""

LANG_NAMES = {"es": "Spanish", "de": "German", "fr": "French", "it": "Italian"}


def translate(doc: str, lang: str) -> str:
    base = os.environ["TRANSLATE_API_BASE"].rstrip("/")
    key = os.environ["TRANSLATE_API_KEY"]
    model = os.environ.get("TRANSLATE_MODEL", "gemini-2.5-flash")
    req = urllib.request.Request(
        f"{base}/chat/completions",
        data=json.dumps({
            "model": model,
            "messages": [{"role": "user", "content": PROMPT.format(lang_name=LANG_NAMES[lang], doc=doc)}],
            "temperature": 0.3,
        }).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                data = json.loads(r.read())
            return data["choices"][0]["message"]["content"]
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(5 * (attempt + 1))
                continue
            raise


def jobs(langs):
    for lang in langs:
        for dirpath, _, files in os.walk(SRC):
            for f in files:
                if not f.endswith(".md"):
                    continue
                src_path = os.path.join(dirpath, f)
                rel = os.path.relpath(src_path, SRC)
                dst_path = os.path.join(ROOT, "content", lang, rel)
                if not os.path.exists(dst_path):
                    yield (lang, src_path, dst_path)


def run(lang, src_path, dst_path, dry):
    with open(src_path, encoding="utf-8") as fh:
        doc = fh.read()
    if dry:
        return (dst_path, "dry")
    out = translate(doc, lang)
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    with open(dst_path, "w", encoding="utf-8") as fh:
        fh.write(out if out.endswith("\n") else out + "\n")
    return (dst_path, "ok")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--langs", default="es,de,fr,it")
    ap.add_argument("--workers", type=int, default=8)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    langs = [l.strip() for l in args.langs.split(",") if l.strip() in LANG_NAMES]
    todo = list(jobs(langs))
    print(f"{len(todo)} files to translate ({len(langs)} langs x {len(list(jobs(['en']))) or 'n/a'})")
    if not todo:
        print("nothing to do")
        return
    done = failed = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        futs = [ex.submit(run, l, s, d, args.dry_run) for (l, s, d) in todo]
        for fut in concurrent.futures.as_completed(futs):
            try:
                path, status = fut.result()
                done += 1
                print(f"[{done+failed}/{len(todo)}] {status}: {path}")
            except Exception as e:
                failed += 1
                print(f"[{done+failed}/{len(todo)}] FAILED: {e}")
    print(f"done: {done}, failed: {failed}")


if __name__ == "__main__":
    main()
