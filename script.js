// Vibration events with timestamps (in seconds) and vibration patterns
const vibrationEvents = [
    { time: 2, pattern: [200, 100, 200], name: "Thunder Strike", emoji: "⚡" },
    { time: 5, pattern: [500, 200, 500, 200, 500], name: "Explosion", emoji: "💥" },
    { time: 8, pattern: [100, 50, 100, 50, 100, 50, 100], name: "Running Steps", emoji: "🏃" },
    { time: 12, pattern: [800], name: "Impact Hit", emoji: "🎯" },
    { time: 14, pattern: [200, 100, 200, 100, 200], name: "Victory", emoji: "🌟" }
];

let video;
let playButton;
let testVibrationButton;
let vibrationIndicator;
let eventElements;
let lastTriggeredEvent = -1;
let mockVideoMode = false;
let mockTime = 0;
let mockInterval = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    checkVibrationSupport();
    checkVideoAvailability();
});

function initializeElements() {
    video = document.getElementById('demoVideo');
    playButton = document.getElementById('playButton');
    testVibrationButton = document.getElementById('testVibration');
    vibrationIndicator = document.getElementById('vibrationIndicator');
    eventElements = document.querySelectorAll('.event');
}

function setupEventListeners() {
    // Play button click
    playButton.addEventListener('click', function() {
        handlePlayButtonClick();
    });

    // Test vibration button
    testVibrationButton.addEventListener('click', function() {
        testVibration();
    });

    // Only add video event listeners if not in mock mode
    if (!mockVideoMode) {
        // Video time update
        video.addEventListener('timeupdate', function() {
            checkVibrationEvents();
            updateEventHighlight();
        });

        // Video play/pause events
        video.addEventListener('play', function() {
            playButton.textContent = '⏸️ Pause';
        });

        video.addEventListener('pause', function() {
            playButton.textContent = '▶️ Play & Rumble';
        });

        // Video ended
        video.addEventListener('ended', function() {
            playButton.textContent = '▶️ Play & Rumble';
            resetEventHighlights();
            lastTriggeredEvent = -1;
        });

        // Handle video error (when no video file is present)
        video.addEventListener('error', function() {
            console.log('Video file not found - enabling mock mode');
            enableMockVideoMode();
        });
    }
}

function checkVideoAvailability() {
    // Check if video can load
    if (video.readyState === 0) {
        video.addEventListener('loadedmetadata', function() {
            console.log('Video loaded successfully');
        });
        
        video.addEventListener('error', function() {
            console.log('Video failed to load - enabling mock mode');
            enableMockVideoMode();
        });
        
        // Try to load the video
        video.load();
    }
}

function handlePlayButtonClick() {
    if (mockVideoMode) {
        handleMockVideoPlayback();
    } else {
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    }
}

function handleMockVideoPlayback() {
    if (mockInterval) {
        // Stop mock playback
        clearInterval(mockInterval);
        mockInterval = null;
        playButton.textContent = '▶️ Play & Rumble';
        resetEventHighlights();
    } else {
        // Start mock playback
        playButton.textContent = '⏸️ Pause';
        mockTime = 0;
        lastTriggeredEvent = -1;
        
        mockInterval = setInterval(() => {
            mockTime += 0.1;
            
            // Check vibration events
            for (let i = 0; i < vibrationEvents.length; i++) {
                const event = vibrationEvents[i];
                if (mockTime >= event.time && mockTime < event.time + 0.2 && i > lastTriggeredEvent) {
                    triggerVibration(event);
                    lastTriggeredEvent = i;
                }
            }
            
            // Update event highlights
            updateMockEventHighlight();
            
            // End simulation at 15 seconds
            if (mockTime >= 15) {
                clearInterval(mockInterval);
                mockInterval = null;
                mockTime = 0;
                lastTriggeredEvent = -1;
                playButton.textContent = '▶️ Play & Rumble';
                resetEventHighlights();
            }
        }, 100);
    }
}

function playVideo() {
    // Request user interaction for iOS
    if (isIOS()) {
        requestPermissions();
    }
    
    video.play().catch(function(error) {
        console.log('Video play failed:', error);
        // Fallback to mock mode if video fails
        enableMockVideoMode();
        handleMockVideoPlayback();
    });
}

function pauseVideo() {
    video.pause();
}

function checkVibrationEvents() {
    const currentTime = video.currentTime;
    
    for (let i = 0; i < vibrationEvents.length; i++) {
        const event = vibrationEvents[i];
        
        // Check if we should trigger this event
        if (currentTime >= event.time && i > lastTriggeredEvent) {
            triggerVibration(event);
            lastTriggeredEvent = i;
        }
    }
}

function triggerVibration(event) {
    // Check if vibration is supported
    if ('vibrate' in navigator) {
        navigator.vibrate(event.pattern);
        console.log(`Vibration triggered: ${event.name}`);
    } else {
        console.log('Vibration not supported on this device');
    }
    
    // Show visual indicator
    showVibrationIndicator(event);
}

function showVibrationIndicator(event) {
    vibrationIndicator.querySelector('span').textContent = `${event.emoji} ${event.name.toUpperCase()}!`;
    vibrationIndicator.classList.add('active');
    
    // Remove indicator after animation
    setTimeout(() => {
        vibrationIndicator.classList.remove('active');
    }, 1000);
}

function updateEventHighlight() {
    const currentTime = video.currentTime;
    
    eventElements.forEach((element, index) => {
        const event = vibrationEvents[index];
        if (currentTime >= event.time && currentTime < event.time + 1) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

function updateMockEventHighlight() {
    eventElements.forEach((element, index) => {
        const event = vibrationEvents[index];
        if (mockTime >= event.time && mockTime < event.time + 1) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

function resetEventHighlights() {
    eventElements.forEach(element => {
        element.classList.remove('active');
    });
}

function testVibration() {
    const testPattern = [200, 100, 200, 100, 200];
    
    if ('vibrate' in navigator) {
        navigator.vibrate(testPattern);
        showVibrationIndicator({ emoji: '📳', name: 'Test Vibration' });
        console.log('Test vibration triggered');
    } else {
        alert('Vibration is not supported on this device. Try opening this page on an iPhone with iOS Safari.');
    }
}

function checkVibrationSupport() {
    if (!('vibrate' in navigator)) {
        console.log('Vibration not supported');
        const info = document.querySelector('.info p');
        info.innerHTML = '<strong>Note:</strong> Vibration is not supported on this device. For the full experience, please open this page on an iPhone with iOS Safari and ensure your device is not in silent mode.';
    } else {
        console.log('Vibration supported');
    }
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function requestPermissions() {
    // On iOS, we need user interaction to enable vibration
    // This is automatically handled by user clicking the play button
    console.log('iOS detected - vibration permissions requested');
}

// Mock video mode for demonstration when no video file is present
function enableMockVideoMode() {
    console.log('Enabling mock video mode');
    mockVideoMode = true;
    
    // Hide the video element and show a placeholder
    const videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = `
        <div class="video-placeholder">
            <p>📹 Demo Video</p>
            <p>15 seconds of action</p>
            <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px;">Running in demo mode</p>
        </div>
    `;
}

// Add some visual feedback for better user experience
document.addEventListener('visibilitychange', function() {
    if (document.hidden && video && !video.paused) {
        // Pause video if tab becomes hidden
        video.pause();
    }
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
    // Small delay to ensure proper rendering after orientation change
    setTimeout(() => {
        if (video && !video.paused) {
            video.currentTime = video.currentTime; // Force refresh
        }
    }, 100);
}); 