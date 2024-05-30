template <int NumVoices> struct snex_softsat
{
	SNEX_NODE(snex_softsat);
	
	// Implement the Waveshaper here...
	
	float gain = 0.0f;
	float out = 0.0f;
	
	float saturate(float input)
	{
		if(input < gain)
		{
			out = input;
		}
		else if(input > gain)
		{
			out = gain + (input-gain) / 				(1.0f+Math.pow(((input-gain)/(1.0f-gain)), 2.0f));
		}
		else if(input > 1.0f)
		{
			out = (gain + 1.0f) / 2.0f;
		}
		return out;
	}
	
	float getSample(float input)
	{
		if(input>0.0f)
		{
			saturate(input);
		}
		else
		{
			input = input * -1.0f;
			saturate(input);
			out = out * -1.0f;
		}
		return out;
	}
	// These functions are the glue code that call the function above
	template <typename T> void process(T& data)
	{
		for(auto ch: data)
		{
			for(auto& s: data.toChannelData(ch))
			{
				s = getSample(s);
			}
		}
	}
	template <typename T> void processFrame(T& data)
	{
		for(auto& s: data)
			s = getSample(s);
	}
	void reset()
	{
		
	}
	void prepare(PrepareSpecs ps)
	{
		
	}
	
	void setExternalData(const ExternalData& d, int index)
	{
	}
	template <int P> void setParameter(double v)
	{
		if(P==0)
		{
			gain = (float)v;
		}
	}
};
