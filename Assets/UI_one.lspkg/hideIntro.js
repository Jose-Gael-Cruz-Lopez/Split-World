// @input SceneObject rulesScreen
// @input Component.TouchComponent touchArea
// @input SceneObject wordScreen
script.wordScreen.enabled = false
// Listen for tap events
script.touchArea.onTap.add(function(eventData) {
    script.rulesScreen.enabled = false; // hides the rules
    script.wordScreen.enabled = true;
});
