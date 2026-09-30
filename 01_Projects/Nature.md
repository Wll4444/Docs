---
project: Nature
path: C:\Projects\Games\Nature
kind: песочница / шаблон ландшафта
stack: R3F + Rapier + Zustand
started: 2026-09-25
updated: 2026-09-30
---

# Nature

Это не игра, а песочница для рельефа, биомов и растительности. В ней один участок
процедурной земли, зонд, который можно на него бросить, четыре вида камеры и полный
измерительный харнесс, унаследованный от Golf. На выходе получаются переиспользуемые и
**измеренные** куски (функции высот, поля биомов, рассадка, инстансная растительность) и
знание о том, сколько они стоят. Предназначены они для прототипов, которым нужен ландшафт.

**Статус:** этап 4 закрыт: трава тайлами вокруг глаза, прореживание с расстоянием, заглушка
ветра. Затем П-3 (2026-09-30): исправления харнесса из Template перенесены (строка `--table`
судится тем же `runErrors`, что и ручной прогон; запись только из всего манифеста). Дальше П-2
(инструмент сканирования, долг D-08) и ветер. Подробно в
[журнале](../Projects/Nature/02_Journal/README.md).

## Где что

- `C:\Projects\Games\Nature\CLAUDE.md`
- [master_plan.md](../Projects/Nature/01_Specs/master_plan.md)
- [nature-rules.md](../Projects/Nature/06_Reference/nature-rules.md) — правила только этого проекта
- [debt.md](../Projects/Nature/01_Specs/debt.md)

## Что можно взять

- **Heightfield**: [heightfield.md](../Projects/Nature/06_Reference/heightfield.md).
- **Биомы, рассадку, траву** вместе с ценой каждого шага:
  [этап 2](../Projects/Nature/02_Journal/stage-02-biomes.md),
  [этап 3](../Projects/Nature/02_Journal/stage-03-vegetation-scatter.md),
  [этап 4](../Projects/Nature/02_Journal/stage-04-grass.md).
- **`scripts/diff.mjs`**: какая доля пикселей изменилась между двумя скриншотами и **где**
  именно. Перенесён в Template (`harness-d`, 2026-09-30) — брать оттуда.

## Происхождение

Этап 0 сделан из Golf, всё специфичное для гольфа вырезано.
