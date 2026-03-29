// Attach this script to the root SceneObject of your Earth model (e.g. instance of planet_earth (1) prefab).
// Parent that object under SplitWorldRulesPanel so it stays visible until hideIntro hides the rules on tap.
//
// @input float popDuration = 0.55

function easeOutBack(t) {
    var c1 = 1.70158;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

var tr = script.getSceneObject().getTransform();
var targetScale = tr.getLocalScale();
tr.setLocalScale(new vec3(0, 0, 0));

var duration = script.popDuration;
var elapsed = 0;
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function (ev) {
    elapsed += ev.getDeltaTime();
    var u = Math.min(1, elapsed / duration);
    var t = easeOutBack(u);
    var s = vec3.lerp(new vec3(0, 0, 0), targetScale, t);
    tr.setLocalScale(s);
    if (u >= 1) {
        tr.setLocalScale(targetScale);
        script.removeEvent(updateEvent);
    }
});
