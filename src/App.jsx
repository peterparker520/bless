import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  "早餐一定要吃呀 🥛",
  "路上注意安全哦 🚗",
  "今天也要超棒的 ✨",
  "累了就歇一歇吧 🛋️",
  "记得多晒晒太阳 🌞",
  "心情要像晴天一样 🌈",
  "好事总会轮到你 🍀",
  "别忘记好好吃饭 🍚",
  "今天也要甜甜的 🍬",
  "有我在呢别担心 🤗",
  "风大记得戴围巾 🧣",
  "快乐会如约而至 💖",
  "每天都有小惊喜 🎁",
  "笑容别藏起来哦 😊",
  "努力就会有回报 🌟",
  "烦恼别放心里呀 💨",
  "今天也要有收获 📦",
  "记得给家人报平安 📞",
  "脚步慢一点也没关系 🚶",
  "今天的你超可爱呀 🥰",
  "别给自己太大压力 🫂",
  "记得补充维生素哦 🥦",
  "好运会一直跟着你 🍀",
  "难过了就说出来呀 😔",
  "今天也要元气满满呀 ⚡",
  "雨天记得带雨伞哦 ☔",
  "每一步都走得踏实 👣",
  "记得多喝温热水呀 ☕",
  "今天也要开心呀 😃",
  "别熬夜早点睡觉 😴",
  "愿你被温柔以待 🤲",
  "记得做喜欢的事 ❤️",
  "今天也要有好心情 🌸",
  "冷了就多穿件衣服 🧥",
  "努力的你超耀眼 ✨",
  "记得多吃蔬菜呀 🥬",
  "今天也要加油呀 💪",
  "别让坏情绪影响你 😤",
  "天凉记得盖好被子 🛌",
  "愿你每天都顺心 🚀",
  "记得适当放松呀 🧘",
  "今天的阳光超好哦 ☀️",
  "别忘记爱自己呀 💖",
  "好运马上就来啦 🍀",
  "记得多活动活动 🧘",
  "今天也要超开心呀 🥳",
  "别太较真啦开心点 😆",
  "天冷记得喝热汤呀 🍲",
  "愿你每天都快乐 😊",
  "记得给生活加点甜 🍰",
  "今天也要超元气呀 ⚡",
  "别让疲惫困住你 😩",
  "愿你事事都如意 🎉",
  "记得和朋友联系呀 📱",
  "今天的你超优秀呀 🏆",
  "别把烦恼留到明天 🗑️",
  "雨天记得别淋湿呀 ☔",
  "记得好好照顾自己 🤗",
  "今天也要超顺利呀 🚀",
  "别让压力压垮你 🫂",
  "天凉记得添衣物呀 🧣",
  "愿你梦想不缺席 🌠",
  "记得多听喜欢的歌 🎧",
  "今天的你超棒呀 👍",
  "别忘记微笑呀 😄",
  "天冷记得暖手呀 🧤",
  "愿你每天有惊喜 🎁",
  "记得多吃点好的 🍗",
  "今天也要超开心 😃",
  "别让坏天气影响心情 🌧️",
  "愿你每天都轻松 😌",
  "记得多看书呀 📚",
  "今天的你超可爱 🥰",
  "别忘记好好休息 💤",
  "愿你每天都幸福 🌈"
];

const bgColors = [
  "lightpink", "skyblue", "lightgreen", "lavender",
  "lightyellow", "plum", "coral", "bisque", "aquamarine",
  "mistyrose", "honeydew", "lavenderblush", "oldlace"
];

const BOX_W = 250;
const BOX_H = 60;
const MAX_TIPS = 52; // 同时最多52个提示
const INTERVAL = 200; // 每隔200ms新增一个

export default function WarmTips() {
  const [started, setStarted] = useState(false);
  const [tipsList, setTipsList] = useState([]);
  const containerRef = useRef(null);

  // 生成不超出屏幕的随机位置
  const getRandomPosition = () => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const x = Math.random() * (cw - BOX_W);
    const y = Math.random() * (ch - BOX_H);
    return { x, y };
  };

  // 创建一个新的提示
  const createTip = () => {
    const { x, y } = getRandomPosition();
    const text = tips[Math.floor(Math.random() * tips.length)];
    const bg = bgColors[Math.floor(Math.random() * bgColors.length)];
    return {
      id: Date.now() + Math.random().toString(36).slice(2),
      text,
      bg,
      x,
      y
    };
  };

  // ✅ 只有在 started=true 时，才启动动画逻辑
  useEffect(() => {
    if (!started) return; // 防止一开始就执行
    const interval = setInterval(() => {
      setTipsList(prev => {
        const next = [...prev, createTip()];
        if (next.length > MAX_TIPS) next.shift();
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [started]);

  // ✅ 最后的 return 用条件渲染，不提前 return
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          style={{
            padding: "16px 36px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(45deg, #ff7eb3, #ff758c)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          点我
        </button>
      ) : (
        <AnimatePresence>
          {tipsList.map(({ id, text, bg, x, y }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: BOX_W,
                height: BOX_H,
                lineHeight: `${BOX_H - 6}px`,
                background: bg,
                borderRadius: 16,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(0,0,0,0.1)",
                textAlign: "center",
                fontFamily: "Microsoft YaHei, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#333",
                userSelect: "none",
                zIndex: 9999
              }}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
