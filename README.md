# Campus Sync

Frontend-only React prototype of a unified campus portal: complaints, a
student marketplace, lost and found, and senior mentorship. Built on mock
data and structured so a Java Spring Boot API can be added later with changes
only inside `src/services/`.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL, pick a demo role on the entry screen and press
**Enter Demo**.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run oxlint

## How the prototype works

- Every record lives in seed files under `src/data/`, copied on first use
  into `localStorage` under the `campusSync.v1.` prefix.
- Components only ever talk to the mock services in `src/services/`, never
  to `localStorage` or the seed files directly.
- **Reset Demo Data** (Profile / Settings) removes every `campusSync.v1.`
  key so the seed records return on the next read.
- If `localStorage` is unavailable the app keeps data in memory for the
  session and shows a notice: *Changes will not be saved after refresh.*

## Swapping mock data for a real API

Each service function already returns a Promise and keeps a fixed name and
argument shape. `src/services/apiClient.js` is a ready `request(path, options)`
helper, and `USE_MOCK` in `src/utils/constants.js` lets you swap modules one at
a time. Section 14 of the PRD lists the proposed REST endpoints.