// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent touch_events
//@input Component.ScriptComponent blank_white_page
//@input Component.ScriptComponent globe_background


try {

// Panel/page sequencing controller using existing Touch Events.
// Ensures only one split-world panel is visible at a time and the globe sits behind them.
// Note: The actual scene objects/panels named "splitworldwordpanal" and "splitworldwordpanal1" must be
// wired to this state externally if they are not exposed as script blocks. This script toggles the
// available blocks here (globe background and blank page) and exposes clear sequencing points.

// Never show the blank white page while the globe/panels flow is active.
script.blank_white_page.enabled = false;

// Track which logical panel is active by name (for external wiring if needed)
var PANEL_A = "splitworldwordpanal";
var PANEL_B = "splitworldwordpanal1";

// Internal state index: 0 => PANEL_A, 1 => PANEL_B
var currentIndex = 0;

// Helper that should be connected to your panel visibility logic.
// If your project uses a panel manager, call it there to:
// 1) Enable the active panel
// 2) Disable the inactive panel
function applyPanelState() {
    // Ensure the globe background is enabled when using the split-world panels
    script.globe_background.enabled = true;

    // IMPORTANT: Hook these states to your actual panel objects:
    // - When currentIndex === 0, ensure only "splitworldwordpanal" is visible.
    // - When currentIndex === 1, ensure only "splitworldwordpanal1" is visible.
    // If those panels are controlled outside of this script, listen to currentIndex or
    // trigger your scene's panel manager from here.
}

// Initialize desired order: PANEL_A first, PANEL_B hidden
function initOrder() {
    currentIndex = 0;
    // Keep globe visible behind the first panel; ensure blank page stays off
    script.globe_background.enabled = true;
    script.blank_white_page.enabled = false;
    applyPanelState();
}

initOrder();

// Advance on tap from splitworldwordpanal -> splitworldwordpanal1
// Use exact callback signature: onTap.add((tapX, tapY) => { ... })
script.touch_events.onTap.add(function(tapX, tapY) {
    // Switch panels ensuring A is hidden before B is shown by external wiring
    if (currentIndex === 0) {
        currentIndex = 1;
        applyPanelState();
    }
});

} catch(e) {
  print("error in controller");
  print(e);
}
