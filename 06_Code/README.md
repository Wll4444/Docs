# Общий код

У проектов общий стек и общие предки, поэтому много кода в них одинаково называется и
лежит по одним путям. При этом код **копировался и после копирования жил своей жизнью**.
Здесь записано, какой код общий, где его каноническая версия и насколько разошлись копии.

## Правила

1. **Канон — Template.** Новый прототип начинается с копии Template (`/new-prototype`), а не
   с копии соседа.
2. **Расхождение бывает законным.** Уровни качества, калибровка, настройки физики и сцены
   перемеряются под каждую сцену (правило «измерено — свойство кода и сцены»), поэтому их
   форки ожидаемы. Незаконно другое: когда исправление или инструмент появились в одном
   проекте, а в Template не попали.
3. **Обратный перенос идёт через Inbox.** Агент, который сделал в проекте что-то пригодное
   для всех (починил харнесс, написал инструмент), кладёт предложение в
   [05_Inbox](../05_Inbox/README.md) с `kind: code`. Переносит владелец, отдельным этапом
   в Template.
4. **Общий пакет пока не нужен.** Выносить код в npm-пакет стоит только тогда, когда он не
   зависит от сцены и расхождение копий в третий раз стоило времени (правило третьего раза
   из реестра долга). Первые кандидаты перечислены ниже.

## Группы

| группа | файлы | что делает | состояние копий (2026-09-30) |
| --- | --- | --- | --- |
| **i18n** | `src/i18n/context.ts`, `LanguageProvider.tsx`, `translations.ts` | RU/EN без библиотеки | `context.ts` совпадает везде, `LanguageProvider` почти везде. **Первый кандидат в пакет.** `translations.ts` своё у каждой игры, так и должно быть |
| **Харнесс** | `scripts/shot.mjs`, `scripts/calibration.mjs`, `src/dev/e2e.ts`, `E2EProbe.tsx`, `E2EPhysicsProbe.tsx`, `scenarios.ts` | гоняет игру без окна, снимает PNG, пишет и проверяет калибровку | **Разошёлся сильнее всего**: Golf, Nature и Template развивали его параллельно, `e2e.ts` и `shot.mjs` отличаются на сотни строк. Какие улучшения дошли куда, по числам не видно; сверка харнесса — кандидат на отдельный этап. Точно известно одно: `diff.mjs` из Nature в Template не попал |
| **Производительность** | `src/dev/perf.ts`, `PerfProbe.tsx`, `PerfOverlay.tsx`, `config/quality.ts`, `store/qualityStore.ts` | замер кадра, уровни качества | `PerfOverlay` почти одинаковый. `quality.ts` форкается законно (перемеряется под сцену), `perf.ts` разошёлся на ~100 строк, законно ли это, не проверено |
| **Аудио** | `src/audio/engine.ts`, `components/AudioManager.tsx`, `store/audioStore.ts`, `config/audio.ts` | Web Audio, привязка к событиям стора | `engine.ts` в Darts совпадает с Template, в Golf и Nature переписан (+100 строк). Стоит посмотреть, что там добавили |
| **HUD** | `components/hudStyles.ts`, `HudChrome.tsx` | общий вид интерфейса | почти одинаковые, кроме Darts |
| **Тестовые утилиты** | `src/test-utils/renderWithStore.tsx` | рендер компонента со стором | одинаковые |
| **Игра** | `App.tsx`, `Scene.tsx`, `CameraRig.tsx`, `store/gameStore.ts`, `game/*`, `config/scene.ts`, `config/physics.ts` | своё у каждой игры | расходиться обязаны; в таблице ниже для полноты |

## Снимок расхождений

Собран `node scripts/survey.mjs code` на 2026-09-30. Ячейка показывает `=` (файл совпадает
с Template), `+a −d` (сколько строк добавлено и удалено относительно Template, переводы
строк не учитываются) или `·` (файла нет). Незакоммиченные изменения в рабочих копиях тоже
попадают в снимок.

| файл (путь как в Template) | Tic-tac-toe | Rubiks-cube | Darts | Golf | Nature |
| --- | :-: | :-: | :-: | :-: | :-: |
| `src/App.tsx` | +15 −116 | +30 −93 | +287 −50 | +16 −8 | +65 −57 |
| `src/audio/engine.ts` | · | · | = | +102 −41 | +97 −41 |
| `src/audio/useGameSounds.ts` | · | · | +67 −21 | +45 −25 | · |
| `src/components/AudioManager.tsx` | · | · | +25 −8 | = | +7 −7 |
| `src/components/CameraRig.tsx` | · | · | +95 −49 | +297 −60 | +90 −89 |
| `src/components/Effects.tsx` | · | · | +4 −4 | +61 −44 | +42 −45 |
| `src/components/GameUI.tsx` | · | +400 −115 | +82 −58 | +141 −74 | · |
| `src/components/HudChrome.tsx` | · | · | +100 −22 | +10 −4 | +3 −59 |
| `src/components/hudStyles.ts` | · | · | +5 −5 | = | +1 −1 |
| `src/components/Scene.tsx` | +68 −115 | +43 −119 | +77 −38 | +81 −59 | +89 −80 |
| `src/components/ThrowController.tsx` | · | · | +334 −180 | · | · |
| `src/components/ThrowIndicator.tsx` | · | · | +1 −1 | · | · |
| `src/config/audio.ts` | · | · | +29 −19 | +222 −22 | +97 −24 |
| `src/config/physics.ts` | · | · | +72 −80 | +285 −85 | +128 −80 |
| `src/config/quality.ts` | · | · | +65 −48 | +34 −35 | +74 −58 |
| `src/config/scene.ts` | · | +54 −132 | +173 −65 | +283 −103 | +274 −122 |
| `src/dev/e2e.ts` | · | · | +479 −372 | +757 −396 | +641 −448 |
| `src/dev/E2EPhysicsProbe.tsx` | · | · | +14 −77 | +127 −73 | +94 −73 |
| `src/dev/E2EProbe.tsx` | · | · | +14 −15 | = | +29 −2 |
| `src/dev/perf.ts` | · | · | +20 −111 | +98 −103 | +132 −102 |
| `src/dev/PerfOverlay.tsx` | · | · | +1 −1 | = | = |
| `src/dev/PerfProbe.tsx` | · | · | +1 −10 | +17 −4 | +77 −5 |
| `src/dev/scenarios.ts` | · | · | · | +420 −190 | +302 −183 |
| `src/game/aiming.ts` | · | · | +18 −21 | +125 −33 | · |
| `src/game/pointerGesture.ts` | · | · | +9 −15 | · | · |
| `src/game/scoring.ts` | · | · | +42 −30 | · | · |
| `src/game/types.ts` | · | · | · | +68 −26 | · |
| `src/i18n/context.ts` | · | = | = | = | = |
| `src/i18n/LanguageProvider.tsx` | · | +1 −1 | = | = | = |
| `src/i18n/translations.ts` | · | +57 −59 | +111 −44 | +117 −21 | +86 −39 |
| `src/index.css` | +1 −22 | +2 −19 | +9 −8 | +8 −17 | +8 −18 |
| `src/main.tsx` | +0 −12 | +0 −12 | +2 −9 | +0 −5 | +0 −5 |
| `src/store/audioStore.ts` | · | · | +13 −8 | +1 −1 | +2 −2 |
| `src/store/gameStore.ts` | · | · | · | +429 −80 | · |
| `src/store/qualityStore.ts` | · | · | +16 −17 | +1 −1 | +2 −2 |
| `src/store/throwUiStore.ts` | · | · | +19 −10 | · | · |
| `src/test-utils/renderWithStore.tsx` | · | +2 −2 | = | = | = |
| `scripts/calibration.mjs` | · | · | · | +432 −287 | +421 −295 |
| `scripts/shot.mjs` | · | · | +356 −658 | +784 −501 | +773 −580 |

- `scripts/diff.mjs` — есть в Nature, нет в Template
