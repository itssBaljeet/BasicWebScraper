# Moonfin Roku Seerr Fix

This branch is a remote build workspace for a patched Moonfin Roku sideload ZIP.

The local Codex shell on the server is currently failing before commands run, so this branch uses GitHub Actions to clone `Moonfin-Client/Roku`, apply the Seerr loading fix, build the Roku package, and commit the resulting ZIP back into this folder.

Expected output after the workflow completes:

```text
moonfin-roku-seerr-fix/dist/moonfin-roku-seerr-fixed.zip
```

## Fix Summary

- The Seerr navbar icon now opens `JellyseerrHubScreen` instead of jumping directly into `JellyseerrDiscoveryScreen`.
- The discovery screen has a 35-second watchdog timer so a failed/stuck Seerr proxy request cannot leave Roku stuck on `Loading...` forever.

## Build Manually

```bash
git clone https://github.com/Moonfin-Client/Roku.git
cd Roku
git apply ../moonfin-seerr-roku.patch
npm install
npm run build
```

Workflow trigger: 2026-04-24 after default workflow registration.
