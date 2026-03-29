// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent globe_background
//@input Component.ScriptComponent touch_events
//@input Component.ScriptComponent blank_white_page
//@input Component.ScriptComponent splitworld_canvas_page0
//@input Component.ScriptComponent sprite_manager


try {

// Split-world 3-state flow controller with Canvas intro page and tap-to-advance.
// States:
// 0) Canvas-based page (splitworld_canvas_page0 via SpriteManager sprite), globe visible
// 1) splitworldwordpanal visible, globe visible
// 2) splitworldwordpanal1 visible, globe visible
// The actual scene panels named exactly "splitworldwordpanal" and "splitworldwordpanal1" must be
// enabled/disabled by your existing scene wiring. This script ensures exclusivity intent and
// controls the Canvas sprite visibility. Hook currentState externally if needed.

// Never show the blank white page while the split-world flow is active.
script.blank_white_page.enabled = false;

// Internal state index: 0 => Canvas page, 1 => splitworldwordpanal, 2 => splitworldwordpanal1
var currentState = 0;

// Canvas/Sprite handles
var canvasSprite = null; // Full-screen sprite that shows the canvas texture
var onscreenCanvas = null; // On-screen canvas for the intro page

// Create canvas and sprite on start
script.createEvent("OnStartEvent").bind(function() {
    // Ensure globe is behind all states during this flow
    script.globe_background.enabled = true;

    // Create on-screen canvas for the intro page
    onscreenCanvas = script.splitworld_canvas_page0.createOnScreenCanvas();

    // Optional: draw once on init (background cleared to transparent so sprite shows only our design)
    drawSplitWorldIntro(onscreenCanvas);

    // Create a full-screen sprite and assign the canvas texture
    var screenSize = script.sprite_manager.getScreenSize();
    canvasSprite = script.sprite_manager.createSprite("SplitWorld_CanvasPage0");
    canvasSprite.texture = onscreenCanvas.getTexture();
    canvasSprite.size = screenSize; // cover full screen
    canvasSprite.position = new vec2(screenSize.x * 0.5, screenSize.y * 0.5); // center in pixel space
    // Ensure visible only in state 0
    applyState();
});

// Draw a simple split-world composition once
function drawSplitWorldIntro(c) {
    // Safety: if canvas not ready, skip
    if (!c) { return; }
    var w = c.getWidth();
    var h = c.getHeight();

    // Clear to transparent so only our shapes render
    c.background(0, 0, 0, 0);

    // Left half cool gradient approximation using rectangles
    c.noStroke();
    for (var i = 0; i < 10; i++) {
        var t = i / 9.0;
        // interpolate blue->purple
        var r = Math.floor(50 + 80 * t);
        var g = Math.floor(80 + 40 * (1.0 - t));
        var b = Math.floor(180 + 60 * (1.0 - t));
        c.fill(r, g, b);
        var bandW = Math.ceil((w * 0.5) / 10);
        c.rect(i * bandW, 0, bandW, h);
    }

    // Right half warm gradient approximation
    for (var j = 0; j < 10; j++) {
        var tt = j / 9.0;
        // interpolate orange->red
        var rr = Math.floor(220 + 20 * tt);
        var gg = Math.floor(120 - 60 * tt);
        var bb = Math.floor(40 - 20 * tt);
        c.fill(rr, gg, Math.max(0, bb));
        var bandW2 = Math.ceil((w * 0.5) / 10);
        c.rect(Math.floor(w * 0.5) + j * bandW2, 0, bandW2, h);
    }

    // Center split line
    c.stroke(255, 255, 255);
    c.strokeWeight(4);
    var midX = Math.floor(w * 0.5);
    c.line(midX, 0, midX, h);

    // Title text (subtle)
    c.noStroke();
    c.fill(255, 255, 255, 200);
    c.textSize(Math.max(18, Math.floor(h * 0.04)));
    c.textAlign('center', 'top');
    c.text("Split World", Math.floor(w * 0.5), Math.floor(h * 0.05));
}

// Apply mutual exclusivity across the three states
function applyState() {
    // Globe stays on during this flow
    script.globe_background.enabled = true;

    // Ensure the canvas sprite object exists before toggling
    if (canvasSprite) {
        canvasSprite.visible = (currentState === 0);
    }

    // IMPORTANT: Hook these states to your actual scene objects:
    // - When currentState === 1, ensure only panel named "splitworldwordpanal" is visible.
    // - When currentState === 2, ensure only panel named "splitworldwordpanal1" is visible.
    // And hide them when not their state. This script cannot directly reference those panels
    // since they are not exposed as blocks here.
}

// Initialize desired order: Canvas page first
(function initOrder(){
    currentState = 0;
    // Keep globe visible behind; ensure blank page stays off
    script.globe_background.enabled = true;
    script.blank_white_page.enabled = false;
    applyState();
})();

// Advance on tap through the 3-state flow
// Use exact callback signature per docs: onTap.add((tapX, tapY) => { ... })
script.touch_events.onTap.add(function(tapX, tapY) {
    // 0 -> 1 -> 2 (then stay on 2 unless external logic resets)
    if (currentState === 0) {
        currentState = 1;
        applyState();
        return;
    }
    if (currentState === 1) {
        currentState = 2;
        applyState();
        return;
    }
});

} catch(e) {
  print("error in controller");
  print(e);
}
