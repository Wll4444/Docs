---
date: 2026-10-01
from: TinyWhoopPlayground, этап 0 (`/new-prototype`)
kind: card
status: open
---

# Зарегистрировать TinyWhoopPlayground в общей базе: строка в таблице проектов, junction, survey

**Почему.** 2026-10-01 из копии Template начат прототип `C:\Projects\Games\TinyWhoopPlayground`
(симулятор FPV-вупа с пульта Radiomaster Pocket, идея — `03_Ideas/tinywhoop_flight_playground_plan.md`).
Карточку своего проекта агент написал сам: `01_Projects/TinyWhoopPlayground.md`. Остальные три
шага из [README хранилища](../README.md), «Ссылки на Docs проектов», — файлы владельца.

**Что именно сделать.**
- `01_Projects/README.md`: строка в таблице — `TinyWhoopPlayground` | симулятор полёта FPV-вупа с
  настоящего пульта | R3F, Rapier, Zustand, Gamepad API | 2026-10-01 | этап 0, план написан. В
  «Родословной» — ветка `Template ──► TinyWhoopPlayground` (копия после `harness-e`).
- Junction (PowerShell): `New-Item -ItemType Junction -Path "C:\Projects\Games\Docs\Projects\TinyWhoopPlayground" -Target "C:\Projects\Games\TinyWhoopPlayground\Docs"`;
  имя — в список в README хранилища.
- `scripts/survey.mjs`: `'TinyWhoopPlayground'` в `PROJECTS`.

**Чем рискуем, если не сделать.** Ссылки вида `../Projects/TinyWhoopPlayground/...` из общей базы
не откроются в Obsidian, а снимки практик и кода не увидят проект, и он выпадет из сверки копий.
