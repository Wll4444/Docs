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

**Статус:** этап 1 (2026-10-02, тег `stage-01`) — демо шаблона удалено; комната 5 × 4 м с
препятствиями и площадкой, тело дрона в дизарме падает, ложится в покой и замораживается;
харнесс находит дрон по метке на теле, сценарии `idle`, `drop`, `soak`, своя запись калибровки.
Находка: при `lengthUnit` 1 дрон в 25 г лежит в полу на 1.43 мм — урок
[2026-10-02-tinywhoop-rapier-length-unit-small-body](../04_Lessons/2026-10-02-tinywhoop-rapier-length-unit-small-body.md).
Следующий — этап 2, ввод с пульта. Журнал — `TinyWhoopPlayground/Docs/02_Journal/README.md`.

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
- Окно покоя как чистый редьюсер по шагам (`src/game/rest.ts`) и заморозка в покое; проверка
  заморозки — строкой «покой записан, а тело не fixed», потому что дрейф позы её не видит.

Будут кандидаты: ввод с RC-пульта через Gamepad API
(назначение осей, устаревание, подменный геймпад для харнесса — этап 2), непрерывный
синтезированный тон в аудиодвижке (этап 7).

## Происхождение

Копия Template после этапа `harness-e` (2026-09-30), `/new-prototype`, 2026-10-01.
