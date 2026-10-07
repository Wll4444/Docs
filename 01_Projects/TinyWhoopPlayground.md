---
project: TinyWhoopPlayground
path: C:\Projects\Games\TinyWhoopPlayground
kind: прототип игры
stack: R3F + Rapier + Zustand, Gamepad API
started: 2026-10-01
updated: 2026-10-02
---

# TinyWhoopPlayground

Симулятор полёта FPV-вупа класса Air65 в браузере, с настоящего пульта Radiomaster Pocket по
USB (EdgeTX USB Joystick → Gamepad API). Acro с рейтами Betaflight, четыре мотора с микшером,
автоарм по газу, свободный полёт в комнате с препятствиями, черепаха, синтезированный звук
моторов. Раунда нет. Главный вопрос — хочется ли летать дальше после пяти минут с пультом.
Идея — [03_Ideas](../03_Ideas/tinywhoop_flight_playground_plan.md).

**Статус:** этап 3 (2026-10-02, тег `stage-03`) — дрон взлетает, висит и садится одним газом с
пульта: четыре мотора (тяга `F_max·s²`, выведена из тяговооружённости 5.8 и массы; лаг — точная
экспонента), арм по защёлке «газ был внизу», failsafe, автодизарм через 3 с в покое, предохранитель.
Окно газа висения — 0.6% хода стика (0.379..0.384 через пульт в 11 бит). Находки: импульс перед шагом
уносит позицию в Rapier (сила со сбросом — нет), быстрое тело заходит в стену на 0.125 м за шаг и
CCD это не меняет. Уроки —
[2026-10-02-tinywhoop-rapier-force-not-impulse-per-step](../04_Lessons/2026-10-02-tinywhoop-rapier-force-not-impulse-per-step.md),
[2026-10-02-tinywhoop-rapier-fast-body-sinks-into-wall-by-step](../04_Lessons/2026-10-02-tinywhoop-rapier-fast-body-sinks-into-wall-by-step.md).
Следующий — этап 4, разделённый ревью плана (2026-10-07) на три: 4a — FPV-камера, 4b — рейты и
регулятор (принимается по удержанию скорости, а не по пику), 4c — первый полёт человека из корпуса.

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

- Ввод с RC-пульта или геймпада через Gamepad API (этап 2): правила — `src/game/input.ts`
  (оси → стики с вычетом центра и концами по сторонам, детектор назначения по корзинам,
  автомат ввода), мост раз в кадр через `addEffect` — `src/components/inputPoll.ts`, подменный
  пульт для харнесса — `src/dev/fakeGamepad.ts`, прибор частоты и возраста сэмпла —
  `src/dev/inputStats.ts`. «Потерян» — только пропал из `getGamepads()`: неподвижный пульт
  сэмплов не шлёт.

Будет кандидатом: непрерывный синтезированный тон в аудиодвижке (этап 7).

## Происхождение

Копия Template после этапа `harness-e` (2026-09-30), `/new-prototype`, 2026-10-01.
