#pragma once

#include <JuceHeader.h>
// These will improve the readability of the connection definition

#define getT(Idx) template get<Idx>()
#define connectT(Idx, target) template connect<Idx>(target)
#define getParameterT(Idx) template getParameter<Idx>()
#define setParameterT(Idx, value) template setParameter<Idx>(value)
#define setParameterWT(Idx, value) template setWrapParameter<Idx>(value)
using namespace scriptnode;
using namespace snex;
using namespace snex::Types;

namespace Degrade_impl
{
// =============================| Node & Parameter type declarations |=============================

DECLARE_PARAMETER_RANGE_SKEW(dry_wet_mixer_c0Range, 
                             -100., 
                             0., 
                             5.42227);

using dry_wet_mixer_c0 = parameter::from0To1<core::gain, 
                                             0, 
                                             dry_wet_mixer_c0Range>;

using dry_wet_mixer_c1 = dry_wet_mixer_c0;

using dry_wet_mixer_multimod = parameter::list<dry_wet_mixer_c0, dry_wet_mixer_c1>;

using dry_wet_mixer_t = control::xfader<dry_wet_mixer_multimod, faders::linear>;

using dry_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, dry_wet_mixer_t>, 
                                    core::gain>;

template <int NV>
using wet_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, filters::allpass<NV>>, 
                                    fx::sampleandhold<NV>, 
                                    core::gain>;

namespace dry_wet1_t_parameters
{
DECLARE_PARAMETER_RANGE_STEP(DryWet_1Range, 
                             32., 
                             64., 
                             1.);

template <int NV>
using DryWet_1 = parameter::from0To1<fx::sampleandhold<NV>, 
                                     0, 
                                     DryWet_1Range>;

template <int NV>
using DryWet = parameter::chain<ranges::Identity, 
                                parameter::plain<Degrade_impl::dry_wet_mixer_t, 0>, 
                                DryWet_1<NV>>;

}

template <int NV>
using dry_wet1_t = container::split<dry_wet1_t_parameters::DryWet<NV>, 
                                    wrap::fix<2, dry_path_t>, 
                                    wet_path_t<NV>>;

namespace Degrade_t_parameters
{
}

template <int NV>
using Degrade_t_ = container::chain<parameter::plain<Degrade_impl::dry_wet1_t<NV>, 0>, 
                                    wrap::fix<2, dry_wet1_t<NV>>>;

// ================================| Root node initialiser class |================================

template <int NV> struct instance: public Degrade_impl::Degrade_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(Degrade);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(16)
		{
			0x005B, 0x0000, 0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 
            0xC93F, 0x962F, 0x003E, 0x8000, 0x003F, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -----------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                      // Degrade_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);              // Degrade_impl::dry_path_t
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0); // Degrade_impl::dry_wet_mixer_t
		auto& dry_gain = this->getT(0).getT(0).getT(1);      // core::gain
		auto& wet_path = this->getT(0).getT(1);              // Degrade_impl::wet_path_t<NV>
		auto& allpass = this->getT(0).getT(1).getT(0);       // filters::allpass<NV>
		auto& sampleandhold = this->getT(0).getT(1).getT(1); // fx::sampleandhold<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(2);      // core::gain
		
		// Parameter Connections -----------------------------------------------------------------
		
		auto& DryWet_p = dry_wet1.getParameterT(0);
		DryWet_p.connectT(0, dry_wet_mixer);          // DryWet -> dry_wet_mixer::Value
		DryWet_p.connectT(1, sampleandhold);          // DryWet -> sampleandhold::Counter
		this->getParameterT(0).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		// Modulation Connections ----------------------------------------------------------------
		
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain); // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain); // dry_wet_mixer -> wet_gain::Gain
		
		// Default Values ------------------------------------------------------------------------
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		allpass.setParameterT(0, 1000.); // filters::allpass::Frequency
		allpass.setParameterT(1, 1.);    // filters::allpass::Q
		allpass.setParameterT(2, 0.);    // filters::allpass::Gain
		allpass.setParameterT(3, 0.01);  // filters::allpass::Smoothing
		allpass.setParameterT(4, 0.);    // filters::allpass::Mode
		allpass.setParameterT(5, 1.);    // filters::allpass::Enabled
		
		; // sampleandhold::Counter is automated
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 0.293333);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
};
}

#undef getT
#undef connectT
#undef setParameterT
#undef setParameterWT
#undef getParameterT
// =====================================| Public Definition |=====================================

namespace project
{
// polyphonic template declaration

template <int NV>
using Degrade = wrap::node<Degrade_impl::instance<NV>>;
}


