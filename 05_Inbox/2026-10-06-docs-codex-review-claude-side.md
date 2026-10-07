---
date: 2026-10-06
from: Docs, настройка пилота Codex-ревью, 2026-10-06
kind: practice
status: open
---

# Сторона Claude в протоколе Codex-ревью: строка в CLAUDE.md и блок в отчёте этапа

**Почему.** Протокол [codex-review-workflow](../00_Reference/codex-review-workflow.md)
описывает передачу работы, но Claude в проекте его не видит: `CLAUDE.md` Template и
TinyWhoopPlayground о Codex молчат, а `/write-stage-report` не знает блока «Ревью Codex».
Результат ревью остаётся в чате и теряется. Эти файлы из чата Docs менять нельзя.

**Что именно сделать.**

1. В раздел `Process` `CLAUDE.md` Template и TinyWhoopPlayground (оба по 200 строк —
   потолок, поэтому заменить, а не добавить) одна строка:
   «Перед передачей на ревью Codex: чистый `git status`, коммит (для этапа — тег
   `stage-NN-rc`), отчёт с проверками и ограничениями. Замечания приходят файлом
   `Docs/02_Journal/reviews/stage-NN-codex.md`: работать только по тем, где есть решение
   владельца, и отвечать строкой „Claude“ под каждым — исправлено с доказательством /
   отклонено с обоснованием / в долг. Не больше двух кругов. Протокол:
   `C:/Projects/Games/Docs/00_Reference/codex-review-workflow.md`».
2. В шаблон `/write-stage-report` — необязательный блок «Ревью Codex»: scope (hash и база),
   число замечаний по приоритетам, исход каждого, ссылка на файл ревью.
3. После первых этапов пилота — решить, переносить ли строку в корневой `CLAUDE.md`
   (там 52 строки из 60).

**Чем рискуем, если не сделать.** Claude не готовит diff к ревью (рабочее дерево
меняется под Codex), не фиксирует исход замечаний, и пилот нечем оценить.

**Ход (2026-10-06, чат TinyWhoopPlayground, не закоммичено).**

- П. 1 для TinyWhoopPlayground — сделано: строка «Codex reviews a commit, not the working
  tree» в `Process` его `CLAUDE.md`, ссылка на протокол относительная. Ради потолка в 200
  строк: убрана строка `npm run preview`; убрана фраза «A debt that lives only in a report
  is not planned» (она дословно есть в шаге 7 `/write-stage-report`); правило «measurement
  changes go in their own commit» дописано к «A number lives in one place»; две строки
  переложены в одну.
- П. 2 — сделано в `~/.claude/commands/write-stage-report.md` (вне git): необязательный пункт
  отчёта и раздел «Ревью Codex» в шаблоне. Сверх запроса добавлены поля оценки пилота из
  протокола (что Claude пропустил, что не подтвердилось, что ревью пропустило) и строка в
  шаге 11: файл ревью коммитится вместе с отчётом.
- Осталось: п. 1 для Template — из чата Template (отсюда его репозиторий только для чтения);
  п. 3 — после пилота.

**Дополнение (2026-10-07, чат Docs, после круга 2 ревью stage-03 TinyWhoop).** Протокол
изменён: P3 без спора с задокументированным решением уходит в долг без строки владельца;
в начале файла ревью — сводка для владельца. Строка в `CLAUDE.md` TinyWhoop («act only on
those the owner has decided») теперь оставит такие P3 без ответа. Заменить в ней на:
«act on those the owner has decided; an undecided P3 goes to debt by default». Та же
формулировка — в п. 1 для Template.
