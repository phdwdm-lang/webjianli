"use client";

import { useDemoPlayback } from "./useDemoPlayback";

// 猹杀：左右玩家列表常驻 · 中间昼夜切换发言/行动窗口（代码重绘）
const leftPlayers = [
  { n: "1", name: "你", role: "狼人", img: "user1.png", wolf: true },
  { n: "2", name: "Sarah", role: "守护", img: "user2.png" },
  { n: "3", name: "Emily", role: "预言家", img: "user3.png", wolf: true },
  { n: "4", name: "David", role: "猎人", img: "user4.png" },
];
const rightPlayers = [
  { n: "5", name: "Jessica", role: "女巫", img: "user5.png", wolf: true },
  { n: "6", name: "Chris", role: "守卫", img: "user3.png" },
  { n: "7", name: "Michael", role: "猎手", img: "user2.png" },
  { n: "8", name: "Robert", role: "村民", img: "user1.png" },
];

function PlayerRow({ p }) {
  return (
    <div className={"wf-player" + (p.wolf ? " is-wolf" : "")}>
      <span className="wf-pnum">{p.n}</span>
      <img className="wf-pavatar" src={"/wolfcha/" + p.img} alt="" />
      <div className="wf-pinfo">
        <span className="wf-pname">{p.name}</span>
        <span className="wf-pbadge">{p.role}</span>
      </div>
    </div>
  );
}

export default function WolfchaDemo() {
  const { ref, stateClass } = useDemoPlayback<HTMLDivElement>();
  return (
    <div ref={ref} className={"demo-anim wf-root " + stateClass} aria-hidden="true">
      {/* 左列玩家（常驻不变） */}
      <div className="wf-side">{leftPlayers.map((p) => <PlayerRow key={p.n} p={p} />)}</div>

      {/* 中间内容窗口（昼夜切换） */}
      <div className="wf-center">
        <div className="wf-window wf-window-night">
          <div className="wf-tag">🌙 夜晚行动 · 狼人睁眼</div>
          <div className="wf-body">
            <img className="wf-fig-wolf" src="/wolfcha/char-wolf.png" alt="" />
            <div className="wf-bubble-zone">
              <div className="wf-bubble">今晚我要刀 <b>4 号</b></div>
              <div className="wf-hint">← 点击玩家头像 · 选择猎杀目标</div>
            </div>
          </div>
        </div>

        <div className="wf-window wf-window-day">
          <div className="wf-tag">☀️ 白天发言 · 预言家报查杀</div>
          <div className="wf-body">
            <img className="wf-fig-user" src="/wolfcha/user3.png" alt="" />
            <div className="wf-bubble-zone">
              <div className="wf-msg wf-msg1"><span className="wf-msg-who">3号 · Emily</span><span className="wf-msg-txt">我昨晚查了 5 号，是好人。</span></div>
              <div className="wf-msg wf-msg2"><span className="wf-msg-who">7号 · Michael</span><span className="wf-msg-txt">同意查杀，今天投 4 号出局？</span></div>
              <div className="wf-msg wf-msg3"><span className="wf-msg-who">5号 · Jessica</span><span className="wf-msg-txt">4 号状态可疑，先不跳身份。</span></div>
              <div className="wf-hint">→ 白天讨论中 · 天黑前投票</div>
            </div>
          </div>
        </div>
      </div>

      {/* 右列玩家（常驻不变） */}
      <div className="wf-side">{rightPlayers.map((p) => <PlayerRow key={p.n} p={p} />)}</div>
    </div>
  );
}
