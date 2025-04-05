# 🌗 FlowForge

**FlowForge** is a dual-mode productivity and mindfulness app built with **React Native**.  
You can switch between **Flow**, a space for rest and reflection, and **Forge**, a space for productivity and focus.

Designed to support your **mental clarity** and **task discipline**, FlowForge offers tools rooted in mindfulness science and productivity psychology.

---

## 🔮 Modes

### 🌿 Flow — Mindfulness Mode

**Flow** is where you slow down. Reconnect with your breath, reflect on your day, and recenter.

Features:
- 🧘‍♂️ **Breathing Exercises**
  - **4-7-8**: Calm your nervous system with this classic breathing pattern.
  - **Box Breathing**: Inhale – Hold – Exhale – Hold — all for 4 seconds each.
- 🌲 **Soundscapes**
  - Nature sounds to create a serene mental environment — rain, forest, ocean, and more.
- 📝 **Daily Quotes**
  - One calming or inspiring quote is served each day to reflect on.
- 🧙 **Sage – Your Zen Assistant**
  - Talk to **Sage**, an AI assistant powered by the **Gemini API**.
  - Ask questions, vent, or explore mindful practices through conversation.

---

### 🔨 Forge — Productivity Mode

**Forge** is where focus is forged. Eliminate procrastination and get things done.

Features:
- 🗓️ **Task Calendar**
  - Create, schedule, and organize tasks.
  - Push notifications ensure you stay on track until you **explicitly start the task**.
- ⏱️ **Pomodoro Timer**
  - Focus in 25-minute bursts with scheduled breaks.
  - Motion detection via **gyroscope/accelerometer** — if you pick up your phone during focus time, a cat photo appears to nudge you gently back on track 🐱.
- 💬 **Searganet – Your Motivational Strategist**
  - Chat with **Searganet**, a Gemini-powered AI productivity assistant.
  - Get help breaking down big tasks, setting goals, or just finding motivation to begin.

---

## 🔧 Built With

- ⚛️ **React Native**
- 📲 **Expo**
- 🔔 **Local Notifications (React Native Notifications)**
- 🎤 **Gemini API (Google Generative AI)**
- 🎧 **Expo AV for soundscapes**
- 📦 AsyncStorage for local persistence
- 📅 React Native Calendars
- 📟 DeviceMotion & Accelerometer from Expo Sensors

---

## 🧪 Future Features & Ideas

> Want to contribute or expand? Here’s what’s cooking:

- Emotion-aware check-ins that personalize Sage’s advice
- Mood-predicting "Aura Forecast"
- Real-time productivity/mindfulness insights dashboard
- AI-generated dreamscapes
- Deeper Sage/Searganet integration with tone analysis

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/flowforge.git
cd flowforge
npm install
npx expo start
