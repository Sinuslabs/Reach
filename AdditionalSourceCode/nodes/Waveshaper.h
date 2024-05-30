#pragma once

// These will improve the readability of the connection definition

#define getT(Idx) template get<Idx>()
#define connectT(Idx, target) template connect<Idx>(target)
#define getParameterT(Idx) template getParameter<Idx>()
#define setParameterT(Idx, value) template setParameter<Idx>(value)
#define setParameterWT(Idx, value) template setWrapParameter<Idx>(value)
using namespace scriptnode;
using namespace snex;
using namespace snex::Types;

namespace Waveshaper_impl
{
// ==============================| Node & Parameter type declarations |==============================

DECLARE_PARAMETER_RANGE_SKEW(dry_wet_mixer_c0Range, 
                             -100., 
                             0., 
                             5.42227);

template <int NV>
using dry_wet_mixer_c0 = parameter::from0To1<core::gain<NV>, 
                                             0, 
                                             dry_wet_mixer_c0Range>;

template <int NV> using dry_wet_mixer_c1 = dry_wet_mixer_c0<NV>;

template <int NV>
using dry_wet_mixer_multimod = parameter::list<dry_wet_mixer_c0<NV>, dry_wet_mixer_c1<NV>>;

template <int NV>
using dry_wet_mixer_t = control::xfader<dry_wet_mixer_multimod<NV>, 
                                        faders::cosine_half>;

template <int NV>
using dry_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, dry_wet_mixer_t<NV>>, 
                                    core::gain<NV>>;

template <int NV>
using minmax_t = control::minmax<NV, 
                                 parameter::plain<core::gain<NV>, 0>>;

template <int NV>
using minmax1_t = control::minmax<NV, 
                                  parameter::plain<project::Distortion<NV>, 0>>;
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

template <int NV>
using snex_shaper_t = wrap::no_data<core::snex_shaper<snex_softsat<NV>>>;

template <int NV>
using chain_t = container::chain<parameter::empty, 
                                 wrap::fix<2, core::gain<NV>>, 
                                 snex_shaper_t<NV>>;
template <int NV>
using branch_t = container::branch<parameter::empty, 
                                   wrap::fix<2, chain_t<NV>>, 
                                   project::Distortion<NV>>;

template <int NV>
using wet_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, filters::one_pole<NV>>, 
                                    filters::one_pole<NV>, 
                                    minmax_t<NV>, 
                                    minmax1_t<NV>, 
                                    branch_t<NV>, 
                                    filters::one_pole<NV>, 
                                    filters::one_pole<NV>, 
                                    core::gain<NV>>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Waveshaper_impl::dry_wet_mixer_t<NV>, 0>, 
                                    wrap::fix<2, dry_path_t<NV>>, 
                                    wet_path_t<NV>>;

namespace Waveshaper_t_parameters
{
// Parameter list for Waveshaper_impl::Waveshaper_t ------------------------------------------------

template <int NV>
using Amount = parameter::chain<ranges::Identity, 
                                parameter::plain<Waveshaper_impl::minmax_t<NV>, 0>, 
                                parameter::plain<Waveshaper_impl::minmax1_t<NV>, 0>>;

using Distort = parameter::empty;
template <int NV>
using Mix = parameter::plain<Waveshaper_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using Gain = parameter::plain<project::Distortion<NV>, 
                              1>;
template <int NV>
using lp = parameter::plain<filters::one_pole<NV>, 0>;
template <int NV> using hp = lp<NV>;
template <int NV> using postlp = lp<NV>;
template <int NV> using posthp = lp<NV>;
template <int NV>
using Mode = parameter::plain<Waveshaper_impl::branch_t<NV>, 
                              0>;
template <int NV>
using Waveshaper_t_plist = parameter::list<Distort, 
                                           Mix<NV>, 
                                           Amount<NV>, 
                                           Gain<NV>, 
                                           lp<NV>, 
                                           hp<NV>, 
                                           postlp<NV>, 
                                           posthp<NV>, 
                                           Mode<NV>>;
}

template <int NV>
using Waveshaper_t_ = container::chain<Waveshaper_t_parameters::Waveshaper_t_plist<NV>, 
                                       wrap::fix<2, dry_wet1_t<NV>>>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public Waveshaper_impl::Waveshaper_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(Waveshaper);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(138)
		{
			0x005B, 0x0000, 0x4400, 0x7369, 0x6F74, 0x7472, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0001, 0x0000, 0x694D, 0x0078, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x025B, 
            0x0000, 0x4100, 0x6F6D, 0x6E75, 0x0074, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0xDC7F, 0x3EA1, 0x0000, 0x3F80, 0x0000, 0x0000, 0x035B, 
            0x0000, 0x4700, 0x6961, 0x006E, 0x0000, 0xC2C0, 0x0000, 0x4040, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0xCCCD, 0x3DCC, 0x045B, 0x0000, 
            0x6C00, 0x0070, 0x0000, 0x41A0, 0x4000, 0x469C, 0x1C08, 0x45A1, 
            0x6C1A, 0x3E6B, 0x0000, 0x0000, 0x055B, 0x0000, 0x6800, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0xD49A, 0x4318, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x065B, 0x0000, 0x7000, 0x736F, 0x6C74, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0x730F, 0x45DE, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x075B, 0x0000, 0x7000, 0x736F, 0x6874, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0xF1BE, 0x4234, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x085B, 0x0000, 0x4D00, 0x646F, 0x0065, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 
            0x3F80, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                                    // Waveshaper_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);                            // Waveshaper_impl::dry_path_t<NV>
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0);               // Waveshaper_impl::dry_wet_mixer_t<NV>
		auto& dry_gain = this->getT(0).getT(0).getT(1);                    // core::gain<NV>
		auto& wet_path = this->getT(0).getT(1);                            // Waveshaper_impl::wet_path_t<NV>
		auto& one_pole = this->getT(0).getT(1).getT(0);                    // filters::one_pole<NV>
		auto& one_pole1 = this->getT(0).getT(1).getT(1);                   // filters::one_pole<NV>
		auto& minmax = this->getT(0).getT(1).getT(2);                      // Waveshaper_impl::minmax_t<NV>
		auto& minmax1 = this->getT(0).getT(1).getT(3);                     // Waveshaper_impl::minmax1_t<NV>
		auto& branch = this->getT(0).getT(1).getT(4);                      // Waveshaper_impl::branch_t<NV>
		auto& chain = this->getT(0).getT(1).getT(4).getT(0);               // Waveshaper_impl::chain_t<NV>
		auto& gain = this->getT(0).getT(1).getT(4).getT(0).getT(0);        // core::gain<NV>
		auto& snex_shaper = this->getT(0).getT(1).getT(4).getT(0).getT(1); // Waveshaper_impl::snex_shaper_t<NV>
		auto& faust = this->getT(0).getT(1).getT(4).getT(1);               // project::Distortion<NV>
		auto& one_pole2 = this->getT(0).getT(1).getT(5);                   // filters::one_pole<NV>
		auto& one_pole3 = this->getT(0).getT(1).getT(6);                   // filters::one_pole<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(7);                    // core::gain<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		auto& Amount_p = this->getParameterT(2);
		Amount_p.connectT(0, minmax);  // Amount -> minmax::Value
		Amount_p.connectT(1, minmax1); // Amount -> minmax1::Value
		
		this->getParameterT(3).connectT(0, faust); // Gain -> faust::gain
		
		this->getParameterT(4).connectT(0, one_pole); // lp -> one_pole::Frequency
		
		this->getParameterT(5).connectT(0, one_pole1); // hp -> one_pole1::Frequency
		
		this->getParameterT(6).connectT(0, one_pole2); // postlp -> one_pole2::Frequency
		
		this->getParameterT(7).connectT(0, one_pole3); // posthp -> one_pole3::Frequency
		
		this->getParameterT(8).connectT(0, branch); // Mode -> branch::Index
		
		// Modulation Connections ------------------------------------------------------------------
		
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain);       // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain);       // dry_wet_mixer -> wet_gain::Gain
		minmax.getWrappedObject().getParameter().connectT(0, gain);   // minmax -> gain::Gain
		minmax1.getWrappedObject().getParameter().connectT(0, faust); // minmax1 -> faust::distortion
		
		// Default Values --------------------------------------------------------------------------
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		;                                     // one_pole::Frequency is automated
		one_pole.setParameterT(1, 1.);        // filters::one_pole::Q
		one_pole.setParameterT(2, 0.);        // filters::one_pole::Gain
		one_pole.setParameterT(3, 0.0516394); // filters::one_pole::Smoothing
		one_pole.setParameterT(4, 0.);        // filters::one_pole::Mode
		one_pole.setParameterT(5, 1.);        // filters::one_pole::Enabled
		
		;                                      // one_pole1::Frequency is automated
		one_pole1.setParameterT(1, 1.);        // filters::one_pole::Q
		one_pole1.setParameterT(2, 0.);        // filters::one_pole::Gain
		one_pole1.setParameterT(3, 0.0521776); // filters::one_pole::Smoothing
		one_pole1.setParameterT(4, 1.);        // filters::one_pole::Mode
		one_pole1.setParameterT(5, 1.);        // filters::one_pole::Enabled
		
		;                                  // minmax::Value is automated
		minmax.setParameterT(1, 0.);       // control::minmax::Minimum
		minmax.setParameterT(2, 21.5);     // control::minmax::Maximum
		minmax.setParameterT(3, 0.492949); // control::minmax::Skew
		minmax.setParameterT(4, 0.1);      // control::minmax::Step
		minmax.setParameterT(5, 0.);       // control::minmax::Polarity
		
		;                                  // minmax1::Value is automated
		minmax1.setParameterT(1, 0.);      // control::minmax::Minimum
		minmax1.setParameterT(2, 50.);     // control::minmax::Maximum
		minmax1.setParameterT(3, 0.67195); // control::minmax::Skew
		minmax1.setParameterT(4, 0.);      // control::minmax::Step
		minmax1.setParameterT(5, 0.);      // control::minmax::Polarity
		
		; // branch::Index is automated
		
		;                           // gain::Gain is automated
		gain.setParameterT(1, 20.); // core::gain::Smoothing
		gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // faust::distortion is automated
		; // faust::gain is automated
		
		;                                      // one_pole2::Frequency is automated
		one_pole2.setParameterT(1, 1.);        // filters::one_pole::Q
		one_pole2.setParameterT(2, 0.);        // filters::one_pole::Gain
		one_pole2.setParameterT(3, 0.0531524); // filters::one_pole::Smoothing
		one_pole2.setParameterT(4, 0.);        // filters::one_pole::Mode
		one_pole2.setParameterT(5, 1.);        // filters::one_pole::Enabled
		
		;                                      // one_pole3::Frequency is automated
		one_pole3.setParameterT(1, 1.);        // filters::one_pole::Q
		one_pole3.setParameterT(2, 0.);        // filters::one_pole::Gain
		one_pole3.setParameterT(3, 0.0511669); // filters::one_pole::Smoothing
		one_pole3.setParameterT(4, 1.);        // filters::one_pole::Mode
		one_pole3.setParameterT(5, 1.);        // filters::one_pole::Enabled
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 0.316135);
		this->setParameterT(3, 1.);
		this->setParameterT(4, 5155.5);
		this->setParameterT(5, 152.83);
		this->setParameterT(6, 7118.38);
		this->setParameterT(7, 45.2361);
		this->setParameterT(8, 1.);
		this->setExternalData({}, -1);
	}
	~instance() override
	{
		// Cleanup external data references --------------------------------------------------------
		
		this->setExternalData({}, -1);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------------------------------
		
		this->getT(0).getT(1).getT(4).getT(0).getT(1).setExternalData(b, index); // Waveshaper_impl::snex_shaper_t<NV>
	}
};
}

#undef getT
#undef connectT
#undef setParameterT
#undef setParameterWT
#undef getParameterT
// ======================================| Public Definition |======================================

namespace project
{
// polyphonic template declaration

template <int NV>
using Waveshaper = wrap::node<Waveshaper_impl::instance<NV>>;
}


