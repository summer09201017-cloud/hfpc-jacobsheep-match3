// 鍛造:noahark-match3 → 雅各的斑點羊(創 30:32,43;31:9)。newBlock 一律不含 endAnchor(A28 教訓)。
import fs from 'fs'
import path from 'path'
const ROOT = path.resolve(import.meta.dirname, '..')
const P = (f) => path.join(ROOT, f)
function repl(src, from, to, tag) {
  if (!src.includes(from)) { console.error('🔴 缺錨:', tag); process.exit(1) }
  return src.replace(from, to)
}
function replRange(src, startAnchor, endAnchor, newBlock, tag) {
  const i = src.indexOf(startAnchor)
  const j = src.indexOf(endAnchor, i + 1)
  if (i < 0 || j < 0) { console.error('🔴 缺區段錨:', tag); process.exit(1) }
  return src.slice(0, i) + newBlock + src.slice(j)
}

let g = fs.readFileSync(P('game.js'), 'utf8')

g = replRange(g, '// 挪亞方舟・動物上船', '(function () {', `// 雅各的斑點羊(創 30:32,43;31:9)——「Candy 骨架 + tsum 皮」家族(fork noahark-match3)。
// 文案為 AI 依和合本草擬(引文均經 cuv MCP 逐字查證:創 30:32、30:43、31:9),牧者已核可題材(07-23)。
//
// 玩法:羊群混在一起了!點兩隻相鄰的羊交換;排成一排 3 隻「同紋」(有點的/有紋的/黑的…)
//   =「歸入羊圈」(圈欄一格格滿);新的羊從草場走來補位。連 4+ 出「剝皮的枝子」(創 30:37),
//   點一下整排整列一起歸圈;蝴蝶偶爾飛來逗羊擋路,一會兒自己飛走。
// ★ 神學守法:①歸圈不是消滅;②信息=「神使人昌盛」——連雅各都承認「神把你們父親的牲畜
//   奪來賜給我了」(創 31:9),不是剝皮枝子的把戲,是神在拉班十次改工價的虧待裡看顧他;
//   ③永不會輸;④綿羊山羊「分類審判」紅線不涉及——這裡分的是「紋路歸圈」,不是誰被丟棄。
`, 'header')

g = repl(g, "const ANIMALS = ['sheep', 'dove', 'lion', 'elephant', 'turtle', 'frog']",
  "const ANIMALS = ['spotted', 'striped', 'black', 'white', 'brown', 'grey']", 'kinds')

g = repl(g, "young: { label: '🐣 幼', desc: '6×6・上船 20 對', size: 6, kinds: 4, goal: 20, crow: 0 },",
  "young: { label: '🐣 幼', desc: '6×6・歸圈 20 欄', size: 6, kinds: 4, goal: 20, crow: 0 },", 'age-y')
g = repl(g, "kid: { label: '🙂 童', desc: '7×7・上船 32 對', size: 7, kinds: 5, goal: 32, crow: 2 },",
  "kid: { label: '🙂 童', desc: '7×7・歸圈 32 欄', size: 7, kinds: 5, goal: 32, crow: 2 },", 'age-k')
g = repl(g, "teen: { label: '🔥 青', desc: '8×8・上船 45 對', size: 8, kinds: 6, goal: 45, crow: 3 },",
  "teen: { label: '🔥 青', desc: '8×8・歸圈 45 欄', size: 8, kinds: 6, goal: 45, crow: 3 },", 'age-t')

g = replRange(g, '  const T = {', '\n\n  const VOICES', `  const T = {
    title: '🐑 雅各的斑點羊',
    ref: '創世記 30:32,43',
    intro1: '「把綿羊中凡有點的、有斑的，和黑色的……都挑出來；將來這一等的就算我的工價。」(創 30:32)',
    how: '羊群混在一起了!點一隻、再點旁邊的一隻交換位置;排成一排 3 隻「同紋」的羊(有點的、有紋的、黑的…)就「歸入羊圈」,新的羊會從草場走來。連出 4 隻以上會出現剝皮的枝子——點一下,整排整列一起歸圈!湊滿目標欄數,羊群就數算清楚了。放心慢慢分——沒有步數限制。',
    pick: '草場上的羊等著數算。選一群:',
    hud: (p, goal) => \`🐑 已歸圈 \${p}/\${goal} 欄\`,
    gather: '同紋歸圈!',
    cascade: '草場又走來新的羊…',
    shuffle: '牧人把羊群趕勻了…',
    noswap: '這樣排不成一排——輕輕放回去',
    crowCome: '蝴蝶飛來逗羊了…',
    crowGo: '蝴蝶飛走了',
    rainbowBorn: '剝皮的枝子!點它,整排整列歸圈',
    rainbowGo: '一大群一起歸圈了!',
    closeLine: '於是雅各極其發大，得了許多的羊群、僕婢、駱駝，和驢。(創 30:43)',
    winTitle: '🎉 羊群數算清楚了!',
    winVerse: '於是雅各極其發大，得了許多的羊群、僕婢、駱駝，和驢。',
    winRef: '創世記 30:43',
    teachVerse: '這樣，神把你們父親的牲畜奪來賜給我了。',
    teachRef: '創世記 31:9',
    teach: '斑點羊不是把戲變出來的——連雅各自己後來都承認:「神把你們父親的牲畜奪來賜給我了。」在拉班十次改工價的虧待裡,神一直看顧雅各。使人昌盛的,從來不是聰明的手段,是神的信實。',
    review: '文案待牧者審核・經文均經和合本逐句核對',
  }`, 'T')

g = repl(g, "window.__ping('noahark-match3' + suffix, t)", "window.__ping('jacobsheep-match3' + suffix, t)", 'ping')

// 青草場色調(比方舟版更暖)
g = repl(g, "sky.addColorStop(0, '#9db8d8'); sky.addColorStop(0.55, '#c6d6e4'); sky.addColorStop(0.72, '#9ec380'); sky.addColorStop(1, '#7fae62')",
  "sky.addColorStop(0, '#b8d4e8'); sky.addColorStop(0.5, '#d8e4d0'); sky.addColorStop(0.68, '#a8c878'); sky.addColorStop(1, '#84b05c')", 'sky')

// 羊圈(沿用窗格進度;一欄=兩隻小羊剪影)
g = replRange(g, '    // 方舟:右側大船,艙房窗=進度(每對亮一格)', '    _rainbowArc(alpha) {', `    // 羊圈:右側木欄大圈,一格=一欄(滿一欄亮一格)
    _ark() {
      const { ctx } = this
      const goal = this.cfg.goal
      const done = this._pairs()
      const frac = (this.collected % PAIR) / PAIR
      const ax = 764, aw = 176
      // 圈地
      ctx.fillStyle = 'rgba(150,120,70,0.25)'
      rR(ctx, ax + 6, 92, aw - 12, 336, 14); ctx.fill()
      // 木欄外框
      ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 6
      rR(ctx, ax + 8, 94, aw - 16, 332, 12); ctx.stroke()
      ctx.strokeStyle = '#a5854f'; ctx.lineWidth = 3
      for (const yy of [150, 230, 310]) {
        ctx.beginPath(); ctx.moveTo(ax + 10, yy); ctx.lineTo(ax + aw - 10, yy); ctx.stroke()
      }
      // 欄位(=目標欄數)
      const houseY = 104, houseH = 312
      const cols = goal > 36 ? 5 : goal > 24 ? 4 : goal > 16 ? 3 : 2
      const rows = Math.ceil(goal / cols)
      const wx0 = ax + 22, wy0 = houseY + 6
      const ww = (aw - 44 - (cols - 1) * 6) / cols
      const wh = Math.min(24, (houseH - 20 - (rows - 1) * 5) / rows)
      for (let i = 0; i < goal; i++) {
        const col = i % cols, row = Math.floor(i / cols)
        const wx = wx0 + col * (ww + 6), wy = wy0 + row * (wh + 5)
        const full = i < done
        const filling = i === done ? frac : 0
        ctx.fillStyle = full ? '#f4ecd4' : 'rgba(90,70,40,0.35)'
        rR(ctx, wx, wy, ww, wh, 5); ctx.fill()
        if (!full && filling > 0) {
          ctx.fillStyle = 'rgba(244,236,212,0.5)'
          rR(ctx, wx, wy + wh * (1 - filling), ww, wh * filling, 4); ctx.fill()
        }
        if (full) { // 一欄兩隻小羊(白身+深頭)
          ctx.fillStyle = '#6a5a3a'
          ctx.beginPath(); ctx.arc(wx + ww * 0.3, wy + wh * 0.5, wh * 0.2, 0, 7); ctx.fill()
          ctx.beginPath(); ctx.arc(wx + ww * 0.7, wy + wh * 0.5, wh * 0.2, 0, 7); ctx.fill()
        }
      }
      // 圈門+踏道(羊的落點)
      ctx.fillStyle = '#5a4016'
      rR(ctx, ax + 26, 386, 34, 40, 6); ctx.fill()
      ctx.fillStyle = '#c8b078'
      ctx.beginPath(); ctx.moveTo(ax + 28, 424); ctx.lineTo(ax - 34, 452); ctx.lineTo(ax - 22, 460); ctx.lineTo(ax + 60, 426); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#2c3c1c'
      ctx.font = 'bold 14px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('羊圈', ax + aw / 2, 66)
      ctx.font = '11px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.fillText('(創 30:32 都挑出來)', ax + aw / 2, 82)
    }

`, 'sheepfold')

// 特效弧改草場金綠
g = repl(g, `      const COLORS = ['#e8524a', '#f0a030', '#f5d90a', '#58b368', '#4a90d9', '#9068be']
      ctx.save()
      ctx.globalAlpha = 0.75 * alpha`, `      const COLORS = ['#f4ecd4', '#e8d8a8', '#c8d888', '#a8c868', '#88b048', '#689838']
      ctx.save()
      ctx.globalAlpha = 0.75 * alpha`, 'arc-colors')
g = repl(g, `      const COLORS = ['#e8524a', '#f0a030', '#f5d90a', '#58b368', '#4a90d9', '#9068be']
      ctx.lineWidth = Math.max(3, H * 0.008)`, `      const COLORS = ['#f4ecd4', '#e8d8a8', '#c8d888', '#a8c868', '#88b048', '#689838']
      ctx.lineWidth = Math.max(3, H * 0.008)`, 'wincard-arc')

// tsum 皮:六款「同羊不同紋」+蝴蝶(crow)+剝皮的枝子(rainbow)
g = replRange(g, "      if (kind === 'sheep') {", `      ctx.restore()
    }

    _drawIntro() {`, `      const sheepBase = (wool, faceCol) => {
        body(wool, shade(wool))
        ctx.fillStyle = '#fff'
        // 頭頂雲朵毛
        ctx.globalAlpha = 0.65
        for (const [ux, uy] of [[-0.45, -0.72], [-0.15, -0.86], [0.2, -0.84], [0.5, -0.68]]) {
          ctx.beginPath(); ctx.arc(ux * r, uy * r, r * 0.24, 0, 7); ctx.fill()
        }
        ctx.globalAlpha = 1
        // 垂耳
        ctx.fillStyle = faceCol
        ctx.beginPath(); ctx.ellipse(-r * 0.82, -r * 0.06, r * 0.2, r * 0.3, 0.5, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.ellipse(r * 0.82, -r * 0.06, r * 0.2, r * 0.3, -0.5, 0, 7); ctx.fill()
      }
      const shade = (hex) => { // 簡易加深(取近似邊線色)
        const m = { '#f6f1e2': '#d8ceb2', '#3a3a44': '#22222a', '#c8a06a': '#a8804a', '#c4c8cc': '#a4a8ac' }
        return m[hex] || '#b0a890'
      }
      if (kind === 'white') { // 純白羊
        sheepBase('#f6f1e2', '#e0d4ba')
        face()
      } else if (kind === 'spotted') { // 有點的:白底黑點
        sheepBase('#f6f1e2', '#e0d4ba')
        ctx.fillStyle = '#4a4a52'
        for (const [ux, uy] of [[-0.42, -0.32], [0.35, -0.45], [0.5, 0.3], [-0.5, 0.35], [0.05, 0.52]]) {
          ctx.beginPath(); ctx.arc(ux * r, uy * r, r * 0.11, 0, 7); ctx.fill()
        }
        face()
      } else if (kind === 'striped') { // 有紋的:白底棕紋
        sheepBase('#f6f1e2', '#e0d4ba')
        ctx.strokeStyle = '#a8825a'; ctx.lineWidth = Math.max(2, r * 0.11); ctx.lineCap = 'round'
        for (const a of [-0.45, 0, 0.45]) {
          ctx.beginPath(); ctx.moveTo(a * r - r * 0.18, -r * 0.45); ctx.quadraticCurveTo(a * r + r * 0.12, 0, a * r - r * 0.1, r * 0.5); ctx.stroke()
        }
        ctx.lineCap = 'butt'
        face()
      } else if (kind === 'black') { // 黑羊(創30:32 黑色的)
        sheepBase('#3a3a44', '#2a2a32')
        const er = r * 0.13
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(-r * 0.32, -r * 0.1, er * 1.6, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.32, -r * 0.1, er * 1.6, 0, 7); ctx.fill()
        ctx.fillStyle = '#1c1c22'
        ctx.beginPath(); ctx.arc(-r * 0.3, -r * 0.08, er, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.34, -r * 0.08, er, 0, 7); ctx.fill()
        ctx.fillStyle = 'rgba(240,140,140,0.35)'
        ctx.beginPath(); ctx.arc(-r * 0.52, r * 0.18, er * 1.2, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.52, r * 0.18, er * 1.2, 0, 7); ctx.fill()
        ctx.strokeStyle = '#e8e0d0'; ctx.lineWidth = Math.max(1.2, r * 0.05)
        ctx.beginPath(); ctx.arc(0, r * 0.12, r * 0.18, 0.25 * Math.PI, 0.75 * Math.PI); ctx.stroke()
      } else if (kind === 'brown') { // 棕羊
        sheepBase('#c8a06a', '#a8804a')
        face()
      } else if (kind === 'grey') { // 灰羊
        sheepBase('#c4c8cc', '#a4a8ac')
        face()
      } else if (kind === 'crow') { // 蝴蝶:飛來逗羊(不嚇孩子的搗蛋鬼)
        ctx.fillStyle = '#f0b040'
        ctx.beginPath(); ctx.ellipse(-r * 0.42, -r * 0.25, r * 0.4, r * 0.55, -0.5, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.ellipse(r * 0.42, -r * 0.25, r * 0.4, r * 0.55, 0.5, 0, 7); ctx.fill()
        ctx.fillStyle = '#e88030'
        ctx.beginPath(); ctx.ellipse(-r * 0.38, r * 0.3, r * 0.3, r * 0.4, -0.4, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.ellipse(r * 0.38, r * 0.3, r * 0.3, r * 0.4, 0.4, 0, 7); ctx.fill()
        ctx.fillStyle = '#5a4a3a'
        ctx.beginPath(); ctx.ellipse(0, 0, r * 0.14, r * 0.62, 0, 0, 7); ctx.fill()
        const er = r * 0.1
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(-er * 0.9, -r * 0.5, er, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(er * 0.9, -r * 0.5, er, 0, 7); ctx.fill()
        ctx.fillStyle = '#2c2416'
        ctx.beginPath(); ctx.arc(-er * 0.8, -r * 0.48, er * 0.6, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(er, -r * 0.48, er * 0.6, 0, 7); ctx.fill()
        ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = Math.max(1.2, r * 0.05); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(-er * 0.6, -r * 0.68); ctx.quadraticCurveTo(-r * 0.3, -r * 0.95, -r * 0.38, -r * 1.05); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(er * 0.6, -r * 0.68); ctx.quadraticCurveTo(r * 0.3, -r * 0.95, r * 0.38, -r * 1.05); ctx.stroke()
        ctx.lineCap = 'butt'
      } else if (kind === 'rainbow') { // 剝皮的枝子(創30:37):白綠相間條紋枝+星光
        body('#fdf8e8', '#d8c896')
        ctx.save()
        ctx.rotate(-0.6)
        ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = Math.max(3, r * 0.16); ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(-r * 0.55, r * 0.3); ctx.lineTo(r * 0.55, -r * 0.3); ctx.stroke()
        ctx.strokeStyle = '#f4ecd4'
        for (const k2 of [-0.3, 0, 0.3]) {
          ctx.beginPath(); ctx.moveTo(k2 * r - r * 0.08, -k2 * r * 0.55 + r * 0.06); ctx.lineTo(k2 * r + r * 0.08, -k2 * r * 0.55 - r * 0.06); ctx.stroke()
        }
        ctx.lineCap = 'butt'
        ctx.restore()
        ctx.fillStyle = '#88b048'
        ctx.beginPath(); ctx.ellipse(r * 0.42, -r * 0.5, r * 0.14, r * 0.22, 0.5, 0, 7); ctx.fill()
        const tw = 0.6 + 0.4 * Math.sin(this._t * 5)
        ctx.fillStyle = \`rgba(255,235,150,\${tw})\`
        ctx.beginPath()
        for (let i = 0; i < 10; i++) {
          const ang = (i / 10) * Math.PI * 2 - Math.PI / 2
          const rr = i % 2 === 0 ? r * 0.2 : r * 0.09
          const px = -r * 0.55 + Math.cos(ang) * rr, py = -r * 0.6 + Math.sin(ang) * rr
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.fill()
      }
`, 'tsum-kinds')

g = repl(g, "this._tsum(ctx, VW * 0.32, VH * 0.63, 26, 'sheep', 0.25 * Math.abs(Math.sin(this._t * 2)))",
  "this._tsum(ctx, VW * 0.32, VH * 0.63, 26, 'spotted', 0.25 * Math.abs(Math.sin(this._t * 2)))", 'demo1')
g = repl(g, "this._tsum(ctx, VW * 0.5, VH * 0.63, 26, 'lion', 0.25 * Math.abs(Math.sin(this._t * 2 + 1)))",
  "this._tsum(ctx, VW * 0.5, VH * 0.63, 26, 'black', 0.25 * Math.abs(Math.sin(this._t * 2 + 1)))", 'demo2')
g = repl(g, "this._tsum(ctx, VW * 0.68, VH * 0.63, 26, 'frog', 0.25 * Math.abs(Math.sin(this._t * 2 + 2)))",
  "this._tsum(ctx, VW * 0.68, VH * 0.63, 26, 'striped', 0.25 * Math.abs(Math.sin(this._t * 2 + 2)))", 'demo3')
g = repl(g, "ctx.fillText(T.ref + ' ・ 保全生命', VW / 2, VH * 0.23)",
  "ctx.fillText(T.ref + ' ・ 神使人昌盛', VW / 2, VH * 0.23)", 'intro-sub')
g = repl(g, "ctx.fillText(`上船 ${this.cfg.goal} 對——一對一對,一個不少`, W / 2, H * 0.235)",
  "ctx.fillText(`歸圈 ${this.cfg.goal} 欄——凡有點的、有斑的,都數算清楚`, W / 2, H * 0.235)", 'win-sub')

fs.writeFileSync(P('game.js'), g)

// ── index.html / sw / manifest / gen-tts ──
let h = fs.readFileSync(P('index.html'), 'utf8')
h = repl(h, '<title>挪亞方舟・動物上船</title>', '<title>雅各的斑點羊</title>', 'title')
h = repl(h, '<meta name="description" content="點兩隻相鄰的動物交換,排成一排 3 隻同款就一起上船!一對一對進方舟,保全生命(創世記 6-9,和合本)">',
  '<meta name="description" content="點兩隻相鄰的羊交換,排成一排 3 隻同紋就歸入羊圈!斑點羊數算清楚——神使人昌盛(創世記 30,和合本)">', 'desc')
h = repl(h, '<meta name="theme-color" content="#9db8d8">', '<meta name="theme-color" content="#a8c878">', 'theme')
h = repl(h, 'background:#9db8d8', 'background:#a8c878', 'bg')
h = repl(h, '📱 請把手機轉成橫向<br>方舟和動物們都在等你!', '📱 請把手機轉成橫向<br>羊圈和羊群都在等你!', 'rotate')
h = repl(h, "var k = 'ping-noahark-match3'", "var k = 'ping-jacobsheep-match3'", 'ping-key')
h = repl(h, "window.__ping('noahark-match3')", "window.__ping('jacobsheep-match3')", 'ping-id')
fs.writeFileSync(P('index.html'), h)

let s = fs.readFileSync(P('sw.js'), 'utf8')
s = repl(s, "var CACHE_NAME = 'noahark-match3-v2';", "var CACHE_NAME = 'jacobsheep-match3-v1';", 'sw')
fs.writeFileSync(P('sw.js'), s)

let m = fs.readFileSync(P('manifest.webmanifest'), 'utf8')
m = m.replace('挪亞方舟・動物上船', '雅各的斑點羊').replace('"short_name": "方舟上船"', '"short_name": "斑點羊"')
m = m.replace('點兩隻相鄰的動物交換,排成一排 3 隻同款就一起上船!一對一對進方舟,保全生命(創世記 6-9,和合本)', '點兩隻相鄰的羊交換,排成一排 3 隻同紋就歸入羊圈!斑點羊數算清楚——神使人昌盛(創世記 30,和合本)')
m = m.replace('"background_color": "#9db8d8"', '"background_color": "#a8c878"').replace('"theme_color": "#8a5a30"', '"theme_color": "#689838"')
fs.writeFileSync(P('manifest.webmanifest'), m)

let t = fs.readFileSync(P('scripts/gen-tts.mjs'), 'utf8')
t = replRange(t, "  ['intro',", '];', `  ['intro', '今天我要走遍你的羊群,把綿羊中凡有點的、有斑的,和黑色的,並山羊中凡有斑的、有點的,都挑出來;將來這一等的就算我的工價。'],
  ['bless', '於是雅各極其發大,得了許多的羊群、僕婢、駱駝,和驢。'],
  ['win', '這樣,神把你們父親的牲畜奪來賜給我了。創世記三十一章九節。']
`, 'tts-lines')
fs.writeFileSync(P('scripts/gen-tts.mjs'), t)

console.log('🟢 鍛造完成:雅各的斑點羊')
