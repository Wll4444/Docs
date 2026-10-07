---
date: 2026-10-07
from: TinyWhoopPlayground, этап 4a
kind: code
status: open
---

# Риг камеры Template — держать камеру Canvas, а не текущую; прибор «какой камерой нарисован кадр» — в харнесс Template

**Почему.** Урок [2026-10-07-tinywhoop-camera-rig-hijacks-current-camera](../04_Lessons/2026-10-07-tinywhoop-camera-rig-hijacks-current-camera.md):
риг, ставящий `useThree((s) => s.camera)`, перехватил в TinyWhoop вторую камеру (FPV-линзу) и поставил её в позу вида
сбоку. В `Template/src/components/CameraRig.tsx` тот же приём (строка `const camera = useThree((s) => s.camera)`), и
каждый новый прототип наследует спящий дефект — он проснётся в день, когда прототип добавит вторую камеру.

**Что именно сделать.**
- `Template/src/components/CameraRig.tsx`: брать камеру один раз — `const camera = useRef(get().camera).current` (или
  своя `<perspectiveCamera>` с `set`/возвратом), метить её `userData.view`. Образец и юнит «риг не трогает камеру,
  ставшую камерой страницы после него» — `TinyWhoopPlayground/src/components/CameraRig.tsx`, `CameraRig.test.tsx`.
- По желанию — в харнесс Template: обёртка `gl.render`, которая запоминает камеру отрисовки корневой сцены, и проверка
  драйвера «кадр нарисован тем видом, что запрошен» (`TinyWhoopPlayground/src/dev/CameraProbe.tsx`, `cameraWatch.ts`,
  `cameraProblems` в `scripts/shot.mjs`). Попутно она меряет, сколько раз за кадр рисуется сцена: в TinyWhoop на тире
  `high` — трижды (пост-обработка), на `low` — раз.

**Чем рискуем, если не сделать.** Прототип, добавивший вторую камеру, получит правдоподобную картинку не тем глазом и
будет искать ошибку в новой камере; тесты и сборка этого не видят.
