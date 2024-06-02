namespace StyleHelpers {
    // This function returns the vertical center position of two heights.
    inline function verticalCentre(h1, h2)
	{
		return h1 / 2 - h2 / 2;
	}

    // This function reduces the size of an area by the specified amount from all sides and returns the new area.
	inline function addPadding(area, padding)
	{
		if (typeof padding == 'number') {
			return [area[0] + padding, area[1] + padding, area[2] - 2 * padding, area[3] - 2 * padding];			
		}
		if (typeof padding == 'object') {
			return [area[0] + padding.left, area[1] + padding.top, area[2] - 2 * padding.right, area[3] - 2 * bottom];	
		}
	}
	
	inline function withSizeKeepingCentre(area, width, height)
	{
		return [area[0] + (area[2] - width) / 2, area[1] + (area[3] - height) / 2, width, height];
	}
	
	inline function removeFromLeft(area, amount)
	{
		area[0] += amount;
		area[2] -= amount;
		return [area[0] - amount, area[1], amount, area[3]];
	}
	
	inline function removeFromRight(area, amount)
	{
		area[2] -= amount;
		return [area[0] + area[2], area[1], amount, area[3]];
	}
	
	inline function removeFromTop(area, amount)
	{
		area[1] += amount;
		area[3] -= amount;
		return [area[0], area[1] - amount, area[2], amount];
	}
	
	inline function removeFromBottom(area, amount)
	{
		area[3] -= amount;
		return [area[0], area[1] + area[3], area[2], amount];
	}
	
	inline function labelToValue(obj) {
		
		local text = obj.valueAsText;
		local label;
		
		if (obj.suffix == ' ms') {
			if (obj.value < 1.0) {
				label = ' ms';
				obj.value *= 100;
				obj.value = Engine.doubleToString(obj.value * 10, 0);
			} else {
				label = ' s';
				obj.value = Engine.doubleToString(obj.value, 2);
			}
		
			text = obj.value + label;
		}
		if (obj.suffix == ' Hz') {
			if (obj.value > 1000) {
				text = Engine.doubleToString(obj.value / 1000, 1) + 'khz';
			}
		}
		
		return text;
	}
}