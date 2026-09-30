---
project: Darts
path: C:\Projects\Games\Darts
kind: игра
stack: R3F + Rapier + Zustand
started: 2026-06-23
updated: 2026-09-30
---

# Darts

Браузерный 3D-дартс от первого лица: оттянуть, прицелиться и отпустить, дротик летит по
физике и втыкается в классическую мишень (20 секторов, дабл, трибл, булл). Это первая часть
**метательной трилогии** дартс → лук → ножи, поэтому прицеливание, траектория, снаряд и
подсчёт очков изначально сделаны режимо-независимыми модулями в `src/game/`.

**Статус:** журнал доведён до этапа 19 (видимый лук и анимация натяжения), последний коммит
2026-09-16. Строка Status в CLAUDE.md проекта устарела: там до сих пор написано «bootstrap».
Подробно в [журнале](../Projects/Darts/02_Journal/).

## Где что

- `C:\Projects\Games\Darts\CLAUDE.md`, `BOARD.md` — трекер: бэклог, баги, идеи
- [darts_master_plan.md](../Projects/Darts/01_Specs/darts_master_plan.md) — единственный источник правды
- [bow_mode_plan.md](../Projects/Darts/01_Specs/bow_mode_plan.md), [knife_mode_plan.md](../Projects/Darts/01_Specs/knife_mode_plan.md)
- [review-track-stages-01-14.md](../Projects/Darts/02_Journal/review-track-stages-01-14.md) — обзор этапов 1–14

## Что можно взять

- **Контракт режима броска** и **контракт снаряда**: как один движок держит три разных
  оружия, [этап 8.2](../Projects/Darts/02_Journal/stage-08.2-throwmode-contract.md),
  [этап 9](../Projects/Darts/02_Journal/stage-09-multimode-shell-and-projectile-contract.md).
- **Регрессионный харнесс для лука**: [этап 14](../Projects/Darts/02_Journal/stage-14-bow-regression-harness.md).
- **Оптимизацию**: [этап 7.5](../Projects/Darts/02_Journal/stage-07.5-optimisation.md).
- **Модели и анимацию из Blender** (папка `Models/`, этап 19).

## Происхождение

Каркас перенесён из Rubiks-cube, физика добавлена. Сам Darts стал основой для Template.
Практики, появившиеся позже в Golf и Template (реестр долга, журнал с оглавлением,
калибровка, правила прототипа в отдельном файле), сюда пока не вернулись. См.
[02_Practices](../02_Practices/README.md).
