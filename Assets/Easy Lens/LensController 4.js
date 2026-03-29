// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent globe_background
//@input Component.ScriptComponent touch_events
//@input Component.ScriptComponent blank_white_page


try {

// Split-world 2-state flow controller with tap-to-advance.
// States:
// 0) splitworldwordpanal visible, globe visible
// 1) splitworldwordpanal1 visible, globe visible
// Note: Actual panels named exactly "splitworldwordpanal" and "splitworldwordpanal1" must be
// enabled/disabled by your scene's panel system. This script enforces intended sequencing and
// guarantees background/page exclusivity via available blocks.

// Never show the blank white page while the split-world flow is active.
script.blank_white_page.enabled = false;

// Internal state index: 0 => splitworldwordpanal, 1 => splitworldwordpanal1
var currentState = 0;

// Apply mutual exclusivity intent across the two states
function applyState() {
    // Ensure the globe background is on whenever we're in this split-world flow
    script.globe_background.enabled = true;

    // IMPORTANT: Hook these states to your actual scene objects:
    // - When currentState === 0, ensure only panel named "splitworldwordpanal" is visible.
    // - When currentState === 1, ensure only panel named "splitworldwordpanal1" is visible.
    // Hide the other one accordingly in your panel manager.
}

// Initialize desired order: splitworldwordpanal first
(function initOrder(){
    currentState = 0;
    // Keep globe visible behind; ensure blank page stays off
    script.globe_background.enabled = true;
    script.blank_white_page.enabled = false;
    applyState();
})();

// Advance on tap through the 2-state flow
// Use exact callback signature per docs: onTap.add((tapX, tapY) => { ... })
script.touch_events.onTap.add(function(tapX, tapY) {
    // Hide first panel, then show second (handled by your panel system), and keep globe on
    if (currentState === 0) {
        currentState = 1;
        applyState();
        return;
    }
});

} catch(e) {
  print("error in controller");
  print(e);
}
