---
project: TinyWhoopPlayground
path: C:\Projects\Games\TinyWhoopPlayground
kind: прототип игры
stack: R3F + Rapier + Zustand, Gamepad API
started: 2026-10-01
updated: 2026-10-13
---

# TinyWhoopPlayground

Симулятор полёта FPV-вупа класса Air65 в браузере, с настоящего пульта Radiomaster Pocket по
USB (EdgeTX USB Joystick → Gamepad API). Acro с рейтами Betaflight, четыре мотора с микшером,
автоарм по газу, свободный полёт в комнате с препятствиями, черепаха, синтезированный звук
моторов. Раунда нет. Главный вопрос — хочется ли летать дальше после пяти минут с пультом.
Идея — [03_Ideas](../03_Ideas/tinywhoop_flight_playground_plan.md).

**Статус:** этап 6 (2026-10-13, тег `stage-06`) — удары и черепаха. Комнаты касаются защиты-цилиндры и детали корпуса, масса
и инерция — у прежнего ящика (полёт тот же до бита); материал — трение 0.3, отскок 0.3: «липкость ушла». CCD держит тонкую
крышку стола (без него дрон проходил её на 10 и 20 м/с); мягкий CCD снят — съедал отскок. Удар — событие шага (½·m·v² на шаге,
где решатель толкнул), тряска двигает картинку, а не линзу (5° от 3 м/с, τ 60 мс — выбрал владелец). Линза не уходит за стену
(луч от центра тела). Черепаха — crash flip Betaflight 2025.12 с гашением: один переворот при любом стике, включается и на боку у
стены. Владелец: «черепаха работает как надо», «в остальном всё здорово». Уроки —
[2026-10-12-tinywhoop-rapier-soft-ccd-eats-restitution](../04_Lessons/2026-10-12-tinywhoop-rapier-soft-ccd-eats-restitution.md),
[2026-10-13-tinywhoop-f32-quaternion-angle-needs-normalising](../04_Lessons/2026-10-13-tinywhoop-f32-quaternion-angle-needs-normalising.md),
[2026-10-13-tinywhoop-hard-hit-is-not-reproducible](../04_Lessons/2026-10-13-tinywhoop-hard-hit-is-not-reproducible.md),
[2026-10-13-tinywhoop-held-loop-draws-no-interpolated-frame](../04_Lessons/2026-10-13-tinywhoop-held-loop-draws-no-interpolated-frame.md)
(замечание Codex R1). Следующий — этап 7 (звук моторов).

Этап 5 (2026-10-08, тег `stage-05`) — цена картинки в FPV-кадре взвешена парным A/B (`npm run shot -- --ab=…`):
блум (0.000% пикселей) и MSAA композера (29% кадра за 0.3% пикселей) вырезаны, AO и виньетка оставлены — `high` на окне
владельца 8.8 → 5.7 мс; строка `fx:` читает композер, который рисует. Фильтр поворота линзы (`smooth ms`) и прибор отставания
картинки от тела движка (жёсткая — 2.33 мс); владелец выбрал жёсткую линзу. Уроки —
[2026-10-08-tinywhoop-post-effect-weighed-by-pixels-it-changes](../04_Lessons/2026-10-08-tinywhoop-post-effect-weighed-by-pixels-it-changes.md),
[2026-10-08-tinywhoop-two-stale-values-cancel-in-steady-state](../04_Lessons/2026-10-08-tinywhoop-two-stale-values-cancel-in-steady-state.md);
подтверждение к уроку Nature о частоте GPU. Пользователь после симуляции хочет уровни.

Этап 4d (2026-10-08, тег `stage-04d`) — панель настройки `?debug=1` (leva) через одну дверь стора, флаги харнесса в ту же дверь,
перекрестие; линза вынесена на 22 мм вперёд. Уроки — ловушка Rapier со сменой массы, панель и харнесс в одну дверь, отравленный
прогоном мутаций dev-сервер.

Этап 4c (2026-10-08, тег `stage-04c`) — человек отлетал из корпуса с Pocket (15 вылетов, 471 с в арме): «управление очень
реалистично». Расхождения — касание стены роняет дрон, пол «липкий» (этап 6), защиты в кадре (этап 5). Урок —
[2026-10-08-tinywhoop-fly-before-building-the-tuning-panel](../04_Lessons/2026-10-08-tinywhoop-fly-before-building-the-tuning-panel.md).

Этап 4b (2026-10-07, тег `stage-04b`) — стики крутят дрон: рейты Betaflight Actual пользователя, регулятор
скорости в системе корпуса (D на гироскопе, как в Betaflight 4.5.0), airmode в тяге; харнесс играет 12 ступенек и флип и
принимает их по удержанию, а не по пику. Шаг физики — 1/240: на 60 Гц регулятор отстаёт от тела на шаг, и одни
коэффициенты — другой дрон на каждой частоте; цена ниже разрешения замера кадра. Находка: проверка удержания не видит
регулятор, бросивший держать, — в модели нечему сбивать вращение (D-19). Уроки —
[2026-10-07-tinywhoop-controller-gains-mean-nothing-at-coarse-step](../04_Lessons/2026-10-07-tinywhoop-controller-gains-mean-nothing-at-coarse-step.md),
[2026-10-07-tinywhoop-hold-check-blind-without-disturbance](../04_Lessons/2026-10-07-tinywhoop-hold-check-blind-without-disturbance.md).

Этап 4a (2026-10-07, тег `stage-04a`) — человек смотрит из корпуса: FPV-линза жёстко в теле (наклон 20°,
120° по горизонтали, вертикальный угол выводится из аспекта, ближняя плоскость — из зазора до коллайдера), вид сбоку —
для харнесса (`?view=side`), и в нём теперь виден дрон висения (D-16 закрыт). Харнесс проверяет кадр, а не код: какой
камерой нарисована комната (у рендерера), едет ли линза на теле в том же кадре, и где горизонт на PNG (+0.01 px от
выведенного). Находка: риг вида сбоку ставил «текущую камеру» и перехватил линзу — урок
[2026-10-07-tinywhoop-camera-rig-hijacks-current-camera](../04_Lessons/2026-10-07-tinywhoop-camera-rig-hijacks-current-camera.md),
предложение для Template — в Inbox. На тире `high` комната рисуется трижды за кадр.

Этап 3 (2026-10-02, тег `stage-03`) — дрон взлетает, висит и садится одним газом с
пульта: четыре мотора (тяга `F_max·s²`, выведена из тяговооружённости 5.8 и массы; лаг — точная
экспонента), арм по защёлке «газ был внизу», failsafe, автодизарм через 3 с в покое, предохранитель.
Окно газа висения — 0.6% хода стика (0.379..0.384 через пульт в 11 бит). Находки: импульс перед шагом
уносит позицию в Rapier (сила со сбросом — нет), быстрое тело заходит в стену на 0.125 м за шаг и
CCD это не меняет. Уроки —
[2026-10-02-tinywhoop-rapier-force-not-impulse-per-step](../04_Lessons/2026-10-02-tinywhoop-rapier-force-not-impulse-per-step.md),
[2026-10-02-tinywhoop-rapier-fast-body-sinks-into-wall-by-step](../04_Lessons/2026-10-02-tinywhoop-rapier-fast-body-sinks-into-wall-by-step.md).
Этап 4 разделён ревью плана (2026-10-07) на три: 4a — FPV-камера, 4b — рейты и регулятор (принимается по удержанию
скорости, а не по пику), 4c — первый полёт человека из корпуса.

Этап 2 (тег `stage-02`) — Radiomaster Pocket доходит до игры четырьмя
стиками: экран назначения осей (стик от тумблера — по доле пройденного диапазона), карта по `id`
в `localStorage`, автомат ввода `none / mapping / ready / lost`, подменный пульт харнесса через
тот же `navigator.getGamepads`. Находка: неподвижный Pocket не шлёт сэмплов (до 17.3 с), и
правило «250 мс без нового сэмпла — пульт потерян», зелёное на подменном пульте, человек снял;
задержка «пульт → страница» p50 3.25 мс. Уроки —
[2026-10-02-tinywhoop-fake-device-is-a-hypothesis](../04_Lessons/2026-10-02-tinywhoop-fake-device-is-a-hypothesis.md),
[2026-10-02-tinywhoop-mutation-killed-by-float-bit](../04_Lessons/2026-10-02-tinywhoop-mutation-killed-by-float-bit.md).
Этап 1 — комната, дрон в покое, урок
[2026-10-02-tinywhoop-rapier-length-unit-small-body](../04_Lessons/2026-10-02-tinywhoop-rapier-length-unit-small-body.md).
Журнал — `TinyWhoopPlayground/Docs/02_Journal/README.md`.

## Где что

- `C:\Projects\Games\TinyWhoopPlayground\CLAUDE.md` — правила кода (из Template) и что это за игра.
- `Docs/01_Specs/master_plan.md` — видение, решения с авторами, автоматы ввода и полёта,
  формулы (рейты, моторы, микшер), этапы 1–8, риски.
- `Docs/06_Reference/tinywhoop-rules.md` — правила только этой игры; первое, что там есть, —
  факты о пульте EdgeTX как USB-джойстике.
- `Docs/01_Specs/debt.md` — реестр долга: D-01…D-11 перенесены из Template (T-07, T-11…T-13,
  T-15…T-21).

## Что можно взять

- Харнесс, который находит тело **по метке с поколением** на `RigidBody.userData`, а не по
  форме: стейдж и «тело уже на новом спавне» читаются из движка одним способом
  (`src/components/droneWorld.ts`, `src/dev/E2EPhysicsProbe.tsx`).
- Покой как счёт шагов в чистом редьюсере и заморозка в покое (с этапа 3 — часть
  `src/game/flightCycle.ts`, до него `rest.ts`); проверка заморозки — строкой «покой записан, а
  тело не fixed», потому что дрейф позы её не видит.
- **Последовательность шага как редьюсер плюс порядок вызовов в модуле без React**
  (`src/game/flightCycle.ts`, `src/components/droneStep.ts`): порядок вопросов шага и порядок
  вызовов движка гоняются в Node на настоящем Rapier и стоят под 27 мутациями
  (`scripts/mutations/stage03.mjs`).
- **Сила в Rapier — `addForce` со сбросом на каждом шаге, не `applyImpulse`** — `droneWorld.ts`,
  `applyMotors` (урок про подшаги решателя).
- Харнесс, который **играет по шагам сам**: `src/dev/loopHold.ts` (`<Physics paused>`), `stepWorld`
  и `poseAtStep` в `E2EPhysicsProbe.tsx` — предложение в Inbox
  (`2026-10-02-tinywhoop-harness-step-scripted-scenarios`).
- Моторы, выведенные из геометрии (`src/game/motors.ts`): тяга из тяговооружённости и массы, моменты
  из положений моторов, знак реактивного момента из угла мотора, газ висения из вывода; лаг — точная
  экспонента, одинаковая на любом шаге.

- **Парный A/B цены эффекта** (этап 5): `scripts/ab.mjs` (порядок ABBA, медиана A − B с крайними парами) и режим `--ab` драйвера
  `scripts/shot.mjs` — `gpu:` пар и доля пикселей с «A против A»; выключатели эффектов через стор (`src/game/tuning.ts`, `fx`) и
  проверка по композеру, который рисует (`src/dev/fxWatch.ts`, `src/components/effectsChain.ts`).
- **Контакт маленького тела в Rapier** (этап 6): масса в коллайдере без столкновений, касаются безмассовые детали (`Drone.tsx`,
  `config/drone.ts` `DRONE_CONTACT`); удар — по импульсу решателя и скорости точки до шага (`droneWorld.ts`, `contactApproach`;
  `game/impact.ts`); тряска смещением проекции (`LensShake.tsx`); камера, не уходящая за стену (`LensGuard.tsx`); crash flip
  Betaflight 2025.12 с гашением (`game/turtle.ts`).
- Прибор **отставания камеры от тела движка** (этап 5): `src/dev/lagWatch.ts` — угол между камерой без крепления и телом в
  Rapier на каждой отрисовке, делённый на угловую скорость; видит интерполяцию `@react-three/rapier`.

- Ввод с RC-пульта или геймпада через Gamepad API (этап 2): правила — `src/game/input.ts`
  (оси → стики с вычетом центра и концами по сторонам, детектор назначения по корзинам,
  автомат ввода), мост раз в кадр через `addEffect` — `src/components/inputPoll.ts`, подменный
  пульт для харнесса — `src/dev/fakeGamepad.ts`, прибор частоты и возраста сэмпла —
  `src/dev/inputStats.ts`. «Потерян» — только пропал из `getGamepads()`: неподвижный пульт
  сэмплов не шлёт.

Будет кандидатом: непрерывный синтезированный тон в аудиодвижке (этап 7).

## Происхождение

Копия Template после этапа `harness-e` (2026-09-30), `/new-prototype`, 2026-10-01.
