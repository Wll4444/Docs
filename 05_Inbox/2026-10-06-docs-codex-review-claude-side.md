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

**Ход (2026-10-07, чат Template, коммит Template `1012e0d`).**

- П. 1 для Template — сделано, уже с формулировкой дополнения: строка «Codex reviews a
  commit, not the working tree» в `Process` его `CLAUDE.md`, «act on those the owner has
  decided; an undecided P3 goes to debt by default», долг — `T-NN`, ссылка на протокол
  относительная. Ради потолка в 200 строк: убрана строка `npm run preview`; убрана фраза
  «A debt that lives only in a report is not planned» (есть в шаге 7 `/write-stage-report`);
  правило «measurement changes go in their own commit» дописано к «A number lives in one
  place»; хвост про четвёртый этап Golf сокращён до «its stage 4 is lost»; ссылка на
  `architecture.md` переложена в одну строку. `wc -l CLAUDE.md` — 200.
- Сверх запроса — `/new-prototype` Template (`.claude/commands/new-prototype.md`): шаг 4
  теперь переписывает и `AGENTS.md` копии (его «Read first» ссылается на `demo-rules.md`,
  который этот же шаг переименовывает, а правила ревью — про бросок демо); шаг 5 удаляет
  `Docs/02_Journal/reviews/` шаблона вместе с его отчётами.
- `Template/AGENTS.md` (написан из чата Docs) закоммичен вместе с правкой `CLAUDE.md`.
- **Не сделано: замена из дополнения в `CLAUDE.md` TinyWhoopPlayground.** На 2026-10-07 там
  по-прежнему «act only on those the owner has decided» (строка 184, дерево чистое). Это
  репозиторий TinyWhoop — из чата Template только чтение; делать из чата TinyWhoop.

## Расширение на Nature (решение владельца, 2026-10-07)

**Почему.** Владелец по итогам этапа 3 TinyWhoop (два круга, R1 — настоящий пробел в
правиле безопасности, которого Claude не видел): «польза есть», подход расширить на Nature.
Это раньше, чем предлагает сам протокол («решение … после 2–3 этапов по числам»), — решение
владельца, не результат оценки пилота. Nature — третий участник пилота, а не вывод из него.

**Что сделать из чата Nature** (его репозиторий; общие файлы `Docs/` — нет):

1. **`Nature/AGENTS.md`** — новый, по образцу `Template/AGENTS.md` и
   `TinyWhoopPlayground/AGENTS.md`: «Read first» — `C:/Projects/Games/AGENTS.md`,
   `CLAUDE.md`, `Docs/06_Reference/nature-rules.md`, этап в `Docs/01_Specs/master_plan.md`,
   `Docs/01_Specs/debt.md`, протокол. Правила ревью — про то, что рискованно в Nature, а не
   в демо с броском. Кандидаты из `nature-rules.md` (чат Nature уточняет по коду):
   - это песочница, не игра: её продукт — переносимые измеренные куски для Golf и идей из
     дорожной карты; судить, что переносимо, а что верно только для этого участка;
   - детерминизм: `world/` без `Math.random` и `Math.sin`, рассев — функция ячейки и сида;
   - коллайдер и меш — один буфер; соглашения heightfield (транспонирование молча);
     `groundHeight` (треугольники) против `Terrain.height` (гладкая функция); `r / cos θ`;
     бюджет уклона как тест физики;
   - смена рельефа — новое поколение, новый бросок зонда, новое тело коллайдера;
   - ветер: копия поля в GLSL против JS, источник времени (шаг физики, не кадр);
     звук датирован шагом физики своего броска;
   - стоимость травы и растительности — только по замеру с `--gpu`; заявления о картинке —
     по PNG и `npm run diff`, не по коду завершения;
   - вердикты `npm run scan` и запись калибровки: не перегенерировать `calibration.json`
     при ревью.
2. **Строка в `Process` `CLAUDE.md` Nature** — та же, что в Template, с долгом `D-NN` и
   ссылкой `../Docs/00_Reference/codex-review-workflow.md`. В файле 200 строк — **заменить,
   не добавить**; кандидат, проверенный в двух проектах, — строка `npm run preview`
   (Nature, строка 40). Что убрано — назвать в отчёте.
3. **Имена.** Теги Nature — `stage-04b`, `stage-p5`, поэтому `NN` протокола здесь — хвост
   тега: тег кандидата `stage-05-rc`, файл `Docs/02_Journal/reviews/stage-05-codex.md`.
   Записать в строке `CLAUDE.md` или в `nature-rules.md`, чтобы Codex и Claude назвали одно.
4. **`/new-prototype` Nature** (`.claude/commands/new-prototype.md`) — та же правка, что в
   Template: копия переписывает свой `AGENTS.md` и удаляет `reviews/`.
5. **Своя карточка** `Docs/01_Projects/Nature.md` — одна строка в статусе: Nature в пилоте
   Codex-ревью с такого-то этапа.
6. **Первое ревью — проекта целиком, до этапа 5** (владелец, 2026-10-07): сначала ревью
   того, что есть, затем п. 1–5 и этап 5 по плану. Scope — один зафиксированный коммит
   (весь репозиторий на нём), а не диапазон; файл — например
   `Docs/02_Journal/reviews/project-codex.md` (имя назвать в запросе Codex). Предусловие
   протокола — чистый `git status`: на 2026-10-07 в рабочем дереве Nature 10 изменённых
   файлов (`scripts/shot.mjs`, `src/components/Scene.tsx`, материалы и др.) — их сначала
   закоммитить или убрать, решает владелец. Следующие ревью — по этапам:
   `stage-p5..stage-05-rc` при закрытии этапа 5.

**Что сделать владельцу или чату Docs** (`00_Reference` агентам проектов только для чтения):

- `codex-review-workflow.md`: «Пилот: Template и TinyWhoopPlayground» → добавить Nature;
  в «Что проверяет Codex» — строку «Для Nature: …» (по п. 1 выше).
- Корневой `AGENTS.md` проектов не перечисляет — правка не нужна.
- `/write-stage-report` глобальный — блок «Ревью Codex» уже есть, правка не нужна.
