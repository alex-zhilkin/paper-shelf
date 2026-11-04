# Shelf

A quiet personal reading library, hosted as a static app on GitHub Pages. Light, dark, and device themes; PDF reading; a saved-for-later queue; private GitHub sync; and an optional paper assistant.

## Use it

Open the published Pages URL. The initial library contains five stability-prediction/benchmark references (IFUM, ThermoMPNN, RaSP, PROSTATA, and the Mega-scale experimental dataset) and three recent Verkhivker coauthored studies from 2024–2025. The older foundational references remain accessible in the archived Foundations collection. **Add paper** accepts a PDF or a DOI/link. Titles, authors, years, topics, and read-next priority are editable. Click a title for paper details and notes. Papers can be archived and restored.

PDFs can be read immediately after uploading on the current device. The reader supports text selection, search, page navigation, zoom, notes, and remembered position. Phones get full-width reading and a separate notes/assistant panel.

## Connect the private library

1. Open **Connect GitHub** in Shelf.
2. Use your private repository, normally `alex-zhilkin/shelf-library`.
3. Create a fine-grained GitHub personal access token selecting only this repository, with **Contents: read and write**. Choose an appropriate expiration. Workflow permissions are unnecessary.
4. Paste it into Shelf and connect. The token is kept only in the tab's session storage. It is never included in a commit or reference export.
5. Connect each device separately. When a session ends, reconnect to resume syncing; previously downloaded files remain cached on that device.

The app repository is public; the library repository is private. Only `site/` is published. `library-seed/` is excluded from Git and Pages deployment. Metadata is stored in `shelf/catalog.json`; PDFs in `shelf/pdfs/`. Reading changes save to IndexedDB first, then sync. Each metadata field has its own change timestamp; competing note edits preserve both versions, and chat histories are merged by message ID. Progress updates are batched to avoid a commit for every page turn. A visible error preserves pending local changes for retry. This is single-person synchronization, not a collaborative editing system.

New PDF versions use filenames containing their SHA-256 fingerprint. Sync uploads a new file before updating the catalog, so simultaneous replacements cannot overwrite each other's bytes. Device caches use the same fingerprint; legacy files remain readable. Prior versions remain in Git history and may also remain as unreferenced files.

The private library includes the RaSP and PROSTATA PDFs from their publishers, along with the 1996 proceedings manuscript PDF obtained from the [Stanford Pacific Symposium on Biocomputing archive](https://psb.stanford.edu/psb-online/proceedings/psb96/verkhivker.pdf). Other entries are references with verified source links; source access and PDF availability vary. Attach PDFs you have access to. Papers with a public PDF link offer a download attempt; sources that block cross-origin downloads require downloading and attaching the file manually.

## Collections

Create a collection using the plus button in the desktop sidebar or **+ New collection** in the compact navigation picker. Select existing papers when creating it, or choose a collection in the Add/Edit paper form. A paper can keep multiple collection tags when added through the collection dialog. Empty collections sync to GitHub too.

The **ΔG benchmarks** collection contains a source-linked comparison of input, prediction target, and evaluation datasets. Keep absolute unfolding ΔG separate from mutation-induced ΔΔG, and distinguish original model training from later retrained baselines. The comparison does not invent numerical rankings across different datasets or test splits.

**Compare papers / Ask collection** supports an optional discussion based on reference details, verified method notes, and your own notes. These collection discussions do not read all attached PDFs; the dialog states that explicitly. Group discussions remain in the current page session, and their answers can be copied. Individual-paper chat uses the selected PDF text and is saved with that paper.

## Paper assistant

Open a PDF and select **Ask paper**.

**On this device:** WebLLM 0.2.86 runs SmolLM2 360M (Light) or Llama 3.2 1B (Balanced) with WebGPU in a dedicated worker. Model weights are downloaded from the MLC AI Hugging Face collection and cached by the browser. Initial downloads are approximately 200 MB in Light mode or 600 MB in Balanced mode. Light mode needs roughly 400–600 MB of working memory; Balanced roughly 1 GB, depending on browser and precision. The model is unloaded when leaving the reader; weights remain cached. No paper text is sent to an AI service in this mode. The app checks for a compatible GPU before loading. It never downloads a model automatically.

**Cloud API:** Optional direct connection to the OpenAI Responses API with your own personal API key. The key stays in page memory only and is cleared on reload. The selected paper text and recent chat history are sent only after you ask. The request sets `store: false`. The default model is `gpt-5.6-luna`; the model name is editable. This is personal bring-your-own-key mode, not a shared application with an embedded API key. API credits/billing belong to your account.

Summaries of longer papers use multiple sections followed by a synthesis. Questions use relevant extracted passages. Page citations navigate to the PDF page, and answers can be saved to notes. Chat is saved with the paper. The assistant reads extracted PDF text, not scanned pages, diagrams, or reliably reconstructed mathematical layouts; check equations and figures in the original. Small local models need factual review, especially for quantitative chemistry. AI answers are not pre-generated or invented when a connection is unavailable.

## Run locally

Node 22 or later is sufficient; app dependencies are vendored, so no installation or build is required.

```sh
npm start
```

Open the printed localhost URL. `npm test` checks synchronization, retrieval, data validation, and the API adapter. `npm run check` checks JavaScript syntax.

## Deploy

Push to `main` and enable GitHub Pages with GitHub Actions. The included workflow publishes only `site/`. A project subdirectory such as `/paper-shelf/` is supported; all app assets use relative URLs. No server, database subscription, or AI key is required to use the reading library.

## Limits and storage

- Maximum PDF upload: 25 MB in this version.
- Local files are cached in this browser. Clearing website data clears that local cache; reconnecting recovers files already synced to GitHub.
- A paper is safe across devices only after its PDF and catalog update have successfully synced. Watch the connection status if the network is unavailable.
- Reference JSON and BibTeX exports contain metadata/notes, not PDF backups.
- Offline launch, OCR, PDF highlighting, Word integration, and Zotero migration are not implemented.
- Keep substantial PDF libraries in the private data repository. Git history retains earlier file versions, so repeatedly replacing large PDFs increases repository size.

## Dependencies and provenance

- PDF.js / pdfjs-dist 5.4.624, Apache-2.0; license in `site/vendor/pdfjs/LICENSE`.
- WebLLM 0.2.86, Apache-2.0; license in `site/vendor/webllm/LICENSE`.
- SmolLM2 360M (Light) or Llama 3.2 1B (Balanced) weights download only when requested from the MLC AI model collection; they are not included in this repository.
- Starter bibliographic metadata was verified against PubMed / Europe PMC and Crossref. Each paper retains a canonical source and an original relevance note.
