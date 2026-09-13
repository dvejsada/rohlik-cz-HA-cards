# Local dev Home Assistant

A throwaway Home Assistant instance for trying the cards against a real
`rohlikcz` integration while developing, without touching a real HA install.

## Prerequisites

- Docker + Docker Compose.
- A checkout of [HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ) as a sibling
  of this repository, i.e.:

  ```
  some-folder/
    HA-RohlikCZ/
    rohlik-cz-HA-cards/
  ```

  (adjust the relative path in `docker-compose.yml` if your layout differs).

## Usage

From this directory:

```bash
npm run build   # from the repo root — builds dist/rohlik-cards.js
docker compose up -d
```

Then open http://localhost:8123, finish onboarding, and:

1. Settings → Devices & services → Add integration → search "Rohlík.cz" and
   configure it (the `custom_components/rohlikcz` folder is mounted for you).
2. Settings → Dashboards → Resources → Add resource:
   - URL: `/local/rohlik-cards/rohlik-cards.js`
   - Type: JavaScript module
3. Add a card with `type: custom:rohlik-placeholder-card` (or a real card once
   later phases land) and pick your Rohlík device.

`npm run dev` (rollup `--watch`) rebuilds `dist/rohlik-cards.js` on save; reload
the dashboard (hard refresh) to pick up changes — the mounted `dist/` folder
means no rebuild-and-copy step is needed.

Stop and remove the container with:

```bash
docker compose down
```

The `./config` folder (HA's own config, gitignored) persists between runs so
you don't have to redo onboarding each time; delete it for a clean slate.
