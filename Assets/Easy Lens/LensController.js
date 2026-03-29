// Main Controller
//
// Made with Easy Lens

//@input Component.ScriptComponent blank_white_page
//@input Component.ScriptComponent touch_events


try {

// Panel/page sequencing controller using existing Touch Events.
// Limitation: Actual "splitworldwordpanal" and "splitworldwordpanal1" panels must already exist in the project
// and be controlled by the project's enable/disable mechanism outside this script.
// Here we only drive the ordering/state via touch and ensure one-at-a-time visibility intent.

// Keep the blank white page configuration passive; do not override its properties unless needed dynamically.
// Ensure it's disabled during the two-panel flow if the project uses it as a separate page.
script.blank_white_page.enabled = false;

// Track which panel is active by name.
// If the project exposes a global panel state manager, integrate here.
// Since we don't have direct references, we simulate the state and rely on
// external logic wired to these custom events or flags.
var PANEL_A = "splitworldwordpanal";
var PANEL_B = "splitworldwordpanal1";

// Internal state index: 0 => PANEL_A, 1 => PANEL_B
var currentIndex = 0;

// Dispatch function for external system to react (enable one, disable the other).
// Without direct panel objects, we emit a lightweight signal via a global event dispatch pattern if available.
// As a fallback, we leave comments indicating the intended state change.
function applyPanelState() {
    // Intended behavior:
    // - Enable current panel
    // - Disable the other panel
    // If your project has a panel manager, call it here.
    // Example (pseudo, not executed here):
    // panelManager.show(PANEL_A or PANEL_B);
    // panelManager.hide(the other);

    // No-op here due to absence of panel references; ensure your scene graph listens to this state:
    // You can connect this by binding to a shared script or by reading currentIndex via get() in your controller.
}

// Initialize desired order: PANEL_A first, PANEL_B second
function initOrder() {
    currentIndex = 0;
    applyPanelState();
}

initOrder();

// Advance on tap from splitworldwordpanal -> splitworldwordpanal1
script.touch_events.onTap.add(function(x, y) {
    if (currentIndex === 0) {
        currentIndex = 1;
        applyPanelState();
    }
});

} catch(e) {
  print("error in controller");
  print(e);
}
