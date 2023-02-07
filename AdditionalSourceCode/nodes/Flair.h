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

namespace Flair_impl
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

using faust_multimod = parameter::list<parameter::empty>;

template <int NV>
using faust_t = project::Flanger<NV, faust_multimod>;

template <int NV>
using wet_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, faust_t<NV>>, 
                                    core::gain>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Flair_impl::dry_wet_mixer_t, 0>, 
                                    wrap::fix<2, dry_path_t>, 
                                    wet_path_t<NV>>;

namespace Flair_t_parameters
{
// Parameter list for Flair_impl::Flair_t --------------------------------------------------------

DECLARE_PARAMETER_RANGE_STEP(SpeedRange, 
                             0., 
                             10., 
                             0.01);

template <int NV>
using Speed = parameter::from0To1<Flair_impl::faust_t<NV>, 
                                  2, 
                                  SpeedRange>;

DECLARE_PARAMETER_RANGE_STEP(FeedbackRange, 
                             -0.999, 
                             0.999, 
                             0.001);

template <int NV>
using Feedback = parameter::from0To1<Flair_impl::faust_t<NV>, 
                                     4, 
                                     FeedbackRange>;

DECLARE_PARAMETER_RANGE_STEP(DelayRange, 
                             0., 
                             20., 
                             0.001);

template <int NV>
using Delay = parameter::from0To1<Flair_impl::faust_t<NV>, 
                                  5, 
                                  DelayRange>;

template <int NV>
using Offset = parameter::from0To1<Flair_impl::faust_t<NV>, 
                                   6, 
                                   DelayRange>;

using Flanger = parameter::empty;
template <int NV>
using Depth = parameter::plain<Flair_impl::faust_t<NV>, 
                               3>;
template <int NV>
using Mix = parameter::plain<Flair_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using Flair_t_plist = parameter::list<Flanger, 
                                      Speed<NV>, 
                                      Depth<NV>, 
                                      Feedback<NV>, 
                                      Delay<NV>, 
                                      Offset<NV>, 
                                      Mix<NV>>;
}

template <int NV>
using Flair_t_ = container::chain<Flair_t_parameters::Flair_t_plist<NV>, 
                                  wrap::fix<2, dry_wet1_t<NV>>>;

// ================================| Root node initialiser class |================================

template <int NV> struct instance: public Flair_impl::Flair_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(Flair);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(112)
		{
			0x005B, 0x0000, 0x4600, 0x616C, 0x676E, 0x7265, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0001, 0x0000, 0x7053, 0x6565, 0x0064, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x025B, 0x0000, 0x4400, 0x7065, 0x6874, 0x0000, 0x0000, 0x0000, 
            0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 0x5B00, 
            0x0003, 0x0000, 0x6546, 0x6465, 0x6162, 0x6B63, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0004, 0x0000, 0x6544, 0x616C, 0x0079, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x055B, 0x0000, 0x4F00, 0x6666, 0x6573, 0x0074, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x065B, 0x0000, 0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 
            0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -----------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                      // Flair_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);              // Flair_impl::dry_path_t
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0); // Flair_impl::dry_wet_mixer_t
		auto& dry_gain = this->getT(0).getT(0).getT(1);      // core::gain
		auto& wet_path = this->getT(0).getT(1);              // Flair_impl::wet_path_t<NV>
		auto& faust = this->getT(0).getT(1).getT(0);         // Flair_impl::faust_t<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(1);      // core::gain
		
		// Parameter Connections -----------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, faust); // Speed -> faust::Speed
		
		this->getParameterT(2).connectT(0, faust); // Depth -> faust::Depth
		
		this->getParameterT(3).connectT(0, faust); // Feedback -> faust::Feedback
		
		this->getParameterT(4).connectT(0, faust); // Delay -> faust::FlangeDelay
		
		this->getParameterT(5).connectT(0, faust); // Offset -> faust::DelayOffset
		
		this->getParameterT(6).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		// Modulation Connections ----------------------------------------------------------------
		
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain); // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain); // dry_wet_mixer -> wet_gain::Gain
		auto& faust_p = faust.getWrappedObject().getParameter();
		
		// Default Values ------------------------------------------------------------------------
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		faust.setParameterT(0, 0.); // core::faust::Bypass
		faust.setParameterT(1, 0.); // core::faust::InvertFlangeSum
		;                           // faust::Speed is automated
		;                           // faust::Depth is automated
		;                           // faust::Feedback is automated
		;                           // faust::FlangeDelay is automated
		;                           // faust::DelayOffset is automated
		faust.setParameterT(7, 0.); // core::faust::FlangerOutputLevel
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 1.);
		this->setParameterT(3, 1.);
		this->setParameterT(4, 1.);
		this->setParameterT(5, 1.);
		this->setParameterT(6, 1.);
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
using Flair = wrap::node<Flair_impl::instance<NV>>;
}


