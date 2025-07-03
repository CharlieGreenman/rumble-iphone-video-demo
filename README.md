# 🎥 Rumble iPhone Video Demo

A web-based demonstration that triggers iPhone vibrations synchronized with video events. Experience haptic feedback that matches the action on screen!

## ✨ Features

- **Synchronized Vibrations**: iPhone vibrates at specific moments in the video
- **Visual Feedback**: On-screen indicators show when vibrations occur
- **Mobile Optimized**: Designed specifically for iPhone Safari
- **Fallback Mode**: Works even without a video file for testing
- **Real-time Timeline**: See upcoming vibration events

## 🚀 Quick Start

1. **Open on iPhone**: Navigate to the demo page using Safari on your iPhone
2. **Enable Sound**: Make sure your iPhone is not in silent mode
3. **Tap Play**: Hit the "Play & Rumble" button to start the experience
4. **Feel the Action**: Your iPhone will vibrate at key moments in the video

## 📱 Setup Instructions

### For Developers

1. Clone this repository
2. Serve the files using a local web server (required for video to work properly)
3. Open `index.html` in a browser

### Using Python (Simple HTTP Server)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server
```

### Using PHP
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎬 Adding Your Own Video

To use your own video file:

1. Add your video file to the project directory
2. Name it `demo-video.mp4` or update the `src` attribute in `index.html`
3. Keep the video under 15 seconds for the best demo experience
4. The current vibration events are timed for a 15-second demo

## 🔧 Customizing Vibration Events

Edit the `vibrationEvents` array in `script.js` to customize when vibrations occur:

```javascript
const vibrationEvents = [
    { time: 2, pattern: [200, 100, 200], name: "Thunder Strike", emoji: "⚡" },
    { time: 5, pattern: [500, 200, 500, 200, 500], name: "Explosion", emoji: "💥" },
    // Add more events...
];
```

- `time`: When the vibration occurs (in seconds)
- `pattern`: Vibration pattern (milliseconds on/off)
- `name`: Display name for the event
- `emoji`: Visual indicator emoji

## 🎯 Vibration Patterns

The demo includes various vibration patterns:

- **Quick Pulse**: `[200, 100, 200]` - For impacts
- **Strong Buzz**: `[500, 200, 500, 200, 500]` - For explosions
- **Rapid Taps**: `[100, 50, 100, 50, 100, 50, 100]` - For running/steps
- **Long Rumble**: `[800]` - For sustained impacts
- **Victory Pattern**: `[200, 100, 200, 100, 200]` - For celebrations

## 📱 Browser Compatibility

- **iOS Safari**: ✅ Full support with vibrations
- **Chrome Mobile**: ✅ Partial support (Android only)
- **Firefox Mobile**: ✅ Partial support (Android only)
- **Desktop Browsers**: ❌ No vibration support

## 🔍 Troubleshooting

### Vibrations Not Working?

1. **Check Device**: Ensure you're using an iPhone with iOS Safari
2. **Silent Mode**: Make sure your iPhone is not in silent mode
3. **User Interaction**: Tap the play button to enable vibrations
4. **iOS Version**: Requires iOS 8+ for vibration support

### Video Not Playing?

1. **HTTPS**: Some browsers require HTTPS for video playback
2. **File Format**: Ensure your video is in MP4 format
3. **File Size**: Keep videos small for better performance
4. **Fallback Mode**: The demo works without video files using mock playback

## 🎨 Customization

The demo is fully customizable:

- **CSS**: Modify `styles.css` for visual changes
- **JavaScript**: Edit `script.js` for functionality changes
- **HTML**: Update `index.html` for content changes
- **Responsive**: Already optimized for mobile devices

## 📄 Technical Details

- **Web Vibration API**: Uses `navigator.vibrate()` for iPhone haptics
- **HTML5 Video**: Synchronized with video playback events
- **Progressive Enhancement**: Graceful fallback for unsupported devices
- **Mobile-First Design**: Optimized for touch interfaces

## 🌟 Demo Experience

The demo includes a 15-second timeline with these vibration events:

1. **2s**: ⚡ Thunder Strike - Quick double pulse
2. **5s**: 💥 Explosion - Strong sustained buzz
3. **8s**: 🏃 Running Steps - Rapid tapping sequence
4. **12s**: 🎯 Impact Hit - Single strong rumble
5. **14s**: 🌟 Victory - Celebratory pattern

## 🔗 Live Demo

Simply open `index.html` in Safari on your iPhone to experience the demo!

---

*Built with ❤️ for immersive mobile experiences*