// Обзор проектов папки Games: какие практики где есть и насколько общий код разошёлся
// с Template. Печатает markdown — таблицы в 02_Practices и 06_Code вставлены отсюда,
// поэтому их обновляют перезапуском, а не правкой руками.
//
//   node scripts/survey.mjs            # обе таблицы
//   node scripts/survey.mjs practices  # только практики
//   node scripts/survey.mjs code       # только код
//
// Признак практики — наличие файла. Это грубо (файл может лежать и не использоваться),
// зато проверяемо; всё, что файлом не видно, описано в 02_Practices/README.md словами.

import { existsSync, readdirSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const GAMES = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
// Порядок — хронологический: так таблица читается как история переноса практик.
const PROJECTS = ['Tic-tac-toe', 'Rubiks-cube', 'Darts', 'Golf', 'Template', 'Nature']
const CANON = 'Template'

const at = (p, ...rest) => join(GAMES, p, ...rest)
const has = (...rest) => (p) => existsSync(at(p, ...rest))
const hasMatch = (dir, re) => (p) => {
  try { return readdirSync(at(p, dir)).some((f) => re.test(f)) } catch { return false }
}
const count = (fn) => (p) => fn(p)

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

function git(...args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch (e) {
    // `git diff --no-index` выходит с кодом 1, когда файлы различаются — это не ошибка.
    return e.stdout ?? ''
  }
}

const PRACTICES = [
  ['CLAUDE.md', has('CLAUDE.md')],
  ['правила прототипа `*-rules.md`', hasMatch('Docs/06_Reference', /-rules\.md$/)],
  ['мастер-план', hasMatch('Docs/01_Specs', /master_plan\.md$/)],
  ['реестр долга `debt.md`', has('Docs', '01_Specs', 'debt.md')],
  ['журнал с оглавлением', has('Docs', '02_Journal', 'README.md')],
  ['BOARD.md', has('BOARD.md')],
  ['`/new-prototype`', has('.claude', 'commands', 'new-prototype.md')],
  ['скриншот-харнесс `shot.mjs`', has('scripts', 'shot.mjs')],
  ['калибровка `--table --check`', has('scripts', 'calibration.mjs')],
  ['`diff.mjs` (где изменились пиксели)', has('scripts', 'diff.mjs')],
  ['мутационная проверка `mutate.mjs`', has('scripts', 'mutate.mjs')],
  ['запись игры человека `playlog`', has('scripts', 'playlog.mjs')],
  ['e2e-зонд `src/dev/e2e.ts`', has('src', 'dev', 'e2e.ts')],
  ['уровни качества `config/quality.ts`', has('src', 'config', 'quality.ts')],
  ['i18n RU/EN', has('src', 'i18n')],
  ['аудио-движок', has('src', 'audio', 'engine.ts')],
  ['редьюсер цикла в `game/`', hasMatch('src/game', /^(throw|stroke)Cycle\.ts$/)],
  ['файлов с тестами', count((p) => walk(at(p, 'src')).filter((f) => /\.test\.tsx?$/.test(f)).length)],
  ['git-тегов этапов', count((p) => git('-C', at(p), 'tag').split('\n').filter(Boolean).length)],
]

function practices() {
  const out = [`| практика | ${PROJECTS.join(' | ')} |`, `| --- |${PROJECTS.map(() => ' :-: |').join('')}`]
  for (const [label, test] of PRACTICES) {
    const cells = PROJECTS.map((p) => {
      const v = test(p)
      return typeof v === 'number' ? String(v) : v ? '✓' : '·'
    })
    out.push(`| ${label} | ${cells.join(' | ')} |`)
  }
  return out.join('\n')
}

// Общий код: каждый файл Template из src/ и scripts/, который есть хотя бы в одном
// другом проекте по тому же пути. Ячейка — `=` (совпадает), `+a −d` (строк по сравнению
// с Template, CR/LF не считаются) или `·` (файла нет).
function code() {
  const others = PROJECTS.filter((p) => p !== CANON)
  const files = ['src', 'scripts']
    .flatMap((d) => walk(at(CANON, d)))
    .map((f) => relative(at(CANON), f).split(sep).join('/'))
    .filter((f) => !/\.test\.|\.d\.mts$/.test(f))
  const rows = []
  for (const f of files) {
    const cells = others.map((p) => {
      if (!existsSync(at(p, f))) return '·'
      const stat = git('diff', '--no-index', '--numstat', '--ignore-cr-at-eol', at(CANON, f), at(p, f)).trim()
      if (!stat) return '='
      const [a, d] = stat.split(/\s+/)
      return `+${a} −${d}`
    })
    if (cells.some((c) => c !== '·')) rows.push(`| \`${f}\` | ${cells.join(' | ')} |`)
  }
  // Скрипты, которые выросли в другом проекте и в Template не попали, — кандидаты на перенос.
  const orphans = others.flatMap((p) =>
    walk(at(p, 'scripts'))
      .map((f) => relative(at(p), f).split(sep).join('/'))
      .filter((f) => !/\.test\./.test(f) && !existsSync(at(CANON, f)))
      .map((f) => `- \`${f}\` — есть в ${p}, нет в ${CANON}`),
  )
  return [
    `| файл (путь как в ${CANON}) | ${others.join(' | ')} |`,
    `| --- |${others.map(() => ' :-: |').join('')}`,
    ...rows,
    '',
    ...(orphans.length ? orphans : ['- скриптов вне Template нет']),
  ].join('\n')
}

const what = process.argv[2]
const today = new Date().toISOString().slice(0, 10)
if (what !== 'code') console.log(`### Практики по проектам (${today})\n\n${practices()}\n`)
if (what !== 'practices') console.log(`### Общий код против ${CANON} (${today})\n\n${code()}`)
