const var eqWatcher = Engine.createBroadcaster({"component": undefined, "event": undefined});

eqWatcher.attachToComponentMouseEvents("tile_eq", "All Callbacks");

eqWatcher.addListener("RefreshFunction", function(component, event)
{
    if(event.drag || event.clicked)
    {
        Console.print("Update the knobs here");
    }
});