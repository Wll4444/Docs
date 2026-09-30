---
project: Golf
path: C:\Projects\Games\Golf
kind: прототип игры
stack: R3F + Rapier + Zustand
started: 2026-09-11
updated: 2026-09-30
---

# Golf

Браузерный 3D-гольф. Раунд — три лунки от ти до грина, счёт в ударах против пара. Один
жест на все удары: нажать, оттянуть, отпустить. Длина оттяжки задаёт силу, направление
задаёт курс, угол вылета определяется клюшкой.

**Статус:** шесть этапов игры, три этапа харнесса (H3 — обратный перенос исправлений из
Template, 2026-09-30) и этапы долга D-01, D-03, D-07 закрыты, очередь долга пуста. Остальное ждёт левел-дизайна. Подробно в [журнале](../Projects/Golf/02_Journal/README.md).

## Где что

- `C:\Projects\Games\Golf\CLAUDE.md` — общие правила, потолок 200 строк
- [master_plan.md](../Projects/Golf/01_Specs/master_plan.md) — план, решения, машина состояний, счёт
- [golf-rules.md](../Projects/Golf/06_Reference/golf-rules.md) — правила только этого прототипа
- [debt.md](../Projects/Golf/01_Specs/debt.md) — реестр долга
- [retrospective.md](../Projects/Golf/02_Journal/retrospective.md) — разбор способа работы после шести этапов

## Что можно взять

- **Ретроспективу**: в ней записано, какие приёмы процесса сработали и где он протёк. Большая
  часть правил из CLAUDE.md Template выросла отсюда.
- **Масштаб мира и heightfield**: [world-scale.md](../Projects/Golf/06_Reference/world-scale.md).
- **Модель качения** и её измерения: [stage-d01](../Projects/Golf/02_Journal/stage-d01-the-roll-model.md).
- **Редьюсер удара** (`game/strokeCycle.ts`): последовательность вынесена из компонента в
  чистую функцию, [stage-d07](../Projects/Golf/02_Journal/stage-d07-the-stroke-reducer.md).
  Template позже сделал то же самое с броском (debt-05).
- **Калибровку** `--table --check`: [calibration.md](../Projects/Golf/06_Reference/calibration.md).

## Происхождение

Сделан из шаблона с демо-броском по кольцевой мишени (предок Template). Сам стал основой
для Nature и источником процесса для Template.
