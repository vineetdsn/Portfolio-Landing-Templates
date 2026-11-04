# Vineet — Interactive 3D Digital Portfolio

A single-screen interactive tech showroom built with Next.js, React Three Fiber, Three.js, Framer Motion, GSAP and Zustand. The category list and bottom toolbar switch between five procedural 3D scenes: Workspace, Hardware, Development, Creative Projects and Experiments.

## Run locally

```sh
pnpm install
pnpm dev
```

## Before publishing

- Replace the sample contact email in `app/page.tsx`.
- Update the availability label to match your current status.
- The workstation and component models are built from Three.js geometry; replace or augment these with optimized GLB assets if you want more photoreal detail.
- Test performance on a mobile device and tune the canvas pixel ratio or scene detail to suit the target device.
