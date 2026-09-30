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
| **Харнесс** | `scripts/shot.mjs`, `scripts/calibration.mjs`, `scripts/diff.mjs`, `src/dev/e2e.ts`, `E2EProbe.tsx`, `E2EPhysicsProbe.tsx`, `scenarios.ts` | гоняет игру без окна, снимает PNG, пишет и проверяет калибровку | **Разошёлся сильнее всего**, но сверен 2026-09-30: что куда дошло — в подразделе «Харнесс: сверка» ниже. Сотни строк разницы в основном законные: Template переписал идеи Golf, а не скопировал код |
| **Производительность** | `src/dev/perf.ts`, `PerfProbe.tsx`, `PerfOverlay.tsx`, `config/quality.ts`, `store/qualityStore.ts` | замер кадра, уровни качества | `PerfOverlay` почти одинаковый. `quality.ts` форкается законно (перемеряется под сцену), `perf.ts` разошёлся на ~100 строк, законно ли это, не проверено |
| **Аудио** | `src/audio/engine.ts`, `components/AudioManager.tsx`, `store/audioStore.ts`, `config/audio.ts` | Web Audio, привязка к событиям стора | `engine.ts` в Darts совпадает со старым Template. В Golf и Nature он переписан: синтез вместо `.ogg` и журнал для харнесса. Журнал перенесён в Template (`harness-e`), синтез нет (Template T-06, «переносится приём, не спеки») |
| **HUD** | `components/hudStyles.ts`, `HudChrome.tsx` | общий вид интерфейса | почти одинаковые, кроме Darts |
| **Тестовые утилиты** | `src/test-utils/renderWithStore.tsx` | рендер компонента со стором | одинаковые |
| **Игра** | `App.tsx`, `Scene.tsx`, `CameraRig.tsx`, `store/gameStore.ts`, `game/*`, `config/scene.ts`, `config/physics.ts` | своё у каждой игры | расходиться обязаны; в таблице ниже для полноты |

### Харнесс: сверка 2026-09-30

Источник — Template: [план сверки](../Projects/Template/01_Specs/harness_reconcile_plan.md),
§2–§4; код внесли этапы [`harness-d`](../Projects/Template/02_Journal/stage-hd-setting-cost.md)
и [`harness-e`](../Projects/Template/02_Journal/stage-he-sound-in-record.md).

- **Перенесено в Template:** `diff.mjs` (`npm run diff`) и таймер GPU (`gpu:`, `gpuMs`) из
  Nature. Предел снимка 16384 px по стороне — вместо `--dpr ≤ 4` Golf и Nature: здесь
  ломается PNG, а не буфер. Журнал звука (`sounds:`, поле `sounds`, `compareSounds`) из Golf
  и Nature.
- **Осталось в Nature сознательно:** парный A/B цены картинки — ждёт первый прототип, который
  перемеряет AO/блум (T-07); цена построения `time*Build` — ждёт процедурную сцену.
- **Есть только в Template, в Golf и Nature не дошло:** защита от чужого сервера на 5173 (у
  Golf проверки нет вовсе); одна функция вердикта `runErrors` для ручного прогона и строки
  `--table` (у соседей строка с `MISMATCH` запишется калибровкой); запись пишется только из
  всего манифеста и не пишется с упавшей строкой (Golf пишет запись с дыркой); `MISSING` для
  выбранной, но не вернувшейся строки; `selectRuns` отвергает `--table=quik`; `requires`;
  покрытие окна метрик; проверка raw-бэкенда; `drift`; окно ввода, `playlog`, `mutate.mjs`,
  тест калибровки. Ещё два пункта найдены в `harness-e`. Прогон падает на любом звуке
  `SILENT` и на контексте не в `running`: без `--autoplay-policy` молчит только первый звук
  (урок [autoplay](../04_Lessons/2026-09-30-template-autoplay-first-sound-only.md)).
  `compareSounds` у соседей режет строку по пробелу и не разбирает `SILENT`. В `diff.mjs`
  Nature неизвестный байт фильтра читается как «без фильтра», Template его отвергает.
  Переносить ли это в Golf и Nature — решение владельца, отдельным этапом в каждом.
- **Дыра во всех трёх:** `--quality`/`--lang` не проверяют, что дошли (Template T-18).

Снимок ниже сверку не отражает: перенос шёл приёмом, а не текстом, поэтому числа почти не
сдвинулись (`diff.mjs` Template против Nature — +84 −125).

## Снимок расхождений

Собран `node scripts/survey.mjs code` на 2026-09-30. Ячейка показывает `=` (файл совпадает
с Template), `+a −d` (сколько строк добавлено и удалено относительно Template, переводы
строк не учитываются) или `·` (файла нет). Незакоммиченные изменения в рабочих копиях тоже
попадают в снимок.

| файл (путь как в Template) | Tic-tac-toe | Rubiks-cube | Darts | Golf | Nature |
| --- | :-: | :-: | :-: | :-: | :-: |
| `src/App.tsx` | +15 −116 | +30 −93 | +287 −50 | +16 −8 | +65 −57 |
| `src/audio/engine.ts` | · | · | +6 −63 | +77 −73 | +72 −73 |
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
| `src/dev/e2e.ts` | · | · | +478 −393 | +756 −417 | +637 −466 |
| `src/dev/E2EPhysicsProbe.tsx` | · | · | +14 −77 | +127 −73 | +94 −73 |
| `src/dev/E2EProbe.tsx` | · | · | +14 −15 | = | +29 −2 |
| `src/dev/perf.ts` | · | · | +20 −155 | +98 −147 | +123 −137 |
| `src/dev/PerfOverlay.tsx` | · | · | +1 −1 | = | = |
| `src/dev/PerfProbe.tsx` | · | · | +1 −83 | +18 −78 | +42 −43 |
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
| `scripts/calibration.mjs` | · | · | · | +424 −368 | +418 −374 |
| `scripts/diff.mjs` | · | · | · | · | +84 −125 |
| `scripts/shot.mjs` | · | · | +355 −756 | +778 −594 | +828 −668 |
- скриптов вне Template нет
