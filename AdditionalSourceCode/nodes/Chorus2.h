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

namespace Chorus2_impl
{
// ==============================| Node & Parameter type declarations |==============================

template <int NV>
using smoothed_parameter_unscaled_t = wrap::mod<parameter::plain<jdsp::jchorus, 0>, 
                                                control::smoothed_parameter_unscaled<NV, smoothers::linear_ramp<NV>>>;

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
using wet_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, jdsp::jchorus>, 
                                    core::gain<NV>>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Chorus2_impl::dry_wet_mixer_t<NV>, 0>, 
                                    wrap::fix<2, dry_path_t<NV>>, 
                                    wet_path_t<NV>>;

namespace Chorus2_t_parameters
{
// Parameter list for Chorus2_impl::Chorus2_t ------------------------------------------------------

using Chorus = parameter::empty;
template <int NV>
using CentreDelay = parameter::plain<Chorus2_impl::smoothed_parameter_unscaled_t<NV>, 
                                     0>;
using Depth = parameter::plain<jdsp::jchorus, 1>;
using Feedback = parameter::plain<jdsp::jchorus, 2>;
using Rate = parameter::plain<jdsp::jchorus, 3>;
template <int NV>
using Mix = parameter::plain<Chorus2_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using Chorus2_t_plist = parameter::list<Chorus, 
                                        CentreDelay<NV>, 
                                        Depth, 
                                        Feedback, 
                                        Rate, 
                                        Mix<NV>>;
}

template <int NV>
using Chorus2_t_ = container::chain<Chorus2_t_parameters::Chorus2_t_plist<NV>, 
                                    wrap::fix<2, smoothed_parameter_unscaled_t<NV>>, 
                                    dry_wet1_t<NV>>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public Chorus2_impl::Chorus2_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(Chorus2);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(98)
		{
			0x005B, 0x0000, 0x4300, 0x6F68, 0x7572, 0x0073, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x015B, 0x0000, 0x4300, 0x6E65, 0x7274, 0x4465, 0x6C65, 0x7961, 
            0x0000, 0x0000, 0x0000, 0xC800, 0xCD42, 0x5054, 0x0042, 0x8000, 
            0x003F, 0x0000, 0x5B00, 0x0002, 0x0000, 0x6544, 0x7470, 0x0068, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x3852, 0x3F08, 0x0000, 0x3F80, 
            0x0000, 0x0000, 0x035B, 0x0000, 0x4600, 0x6565, 0x6264, 0x6361, 
            0x006B, 0x0000, 0xBF80, 0x0000, 0x3F80, 0x353F, 0x3F08, 0x0000, 
            0x3F80, 0x0000, 0x0000, 0x045B, 0x0000, 0x5200, 0x7461, 0x0065, 
            0x0000, 0x0000, 0x0000, 0x42C8, 0x234C, 0x3DB3, 0x209B, 0x3E9A, 
            0x0000, 0x0000, 0x055B, 0x0000, 0x4D00, 0x7869, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& smoothed_parameter_unscaled = this->getT(0);   // Chorus2_impl::smoothed_parameter_unscaled_t<NV>
		auto& dry_wet1 = this->getT(1);                      // Chorus2_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(1).getT(0);              // Chorus2_impl::dry_path_t<NV>
		auto& dry_wet_mixer = this->getT(1).getT(0).getT(0); // Chorus2_impl::dry_wet_mixer_t<NV>
		auto& dry_gain = this->getT(1).getT(0).getT(1);      // core::gain<NV>
		auto& wet_path = this->getT(1).getT(1);              // Chorus2_impl::wet_path_t<NV>
		auto& jchorus = this->getT(1).getT(1).getT(0);       // jdsp::jchorus
		auto& wet_gain = this->getT(1).getT(1).getT(1);      // core::gain<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, smoothed_parameter_unscaled); // CentreDelay -> smoothed_parameter_unscaled::Value
		
		this->getParameterT(2).connectT(0, jchorus); // Depth -> jchorus::Depth
		
		this->getParameterT(3).connectT(0, jchorus); // Feedback -> jchorus::Feedback
		
		this->getParameterT(4).connectT(0, jchorus); // Rate -> jchorus::Rate
		
		this->getParameterT(5).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		// Modulation Connections ------------------------------------------------------------------
		
		smoothed_parameter_unscaled.getParameter().connectT(0, jchorus); // smoothed_parameter_unscaled -> jchorus::CentreDelay
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain); // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain); // dry_wet_mixer -> wet_gain::Gain
		
		// Default Values --------------------------------------------------------------------------
		
		;                                                    // smoothed_parameter_unscaled::Value is automated
		smoothed_parameter_unscaled.setParameterT(1, 100.1); // control::smoothed_parameter_unscaled::SmoothingTime
		smoothed_parameter_unscaled.setParameterT(2, 1.);    // control::smoothed_parameter_unscaled::Enabled
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		;                             // jchorus::CentreDelay is automated
		;                             // jchorus::Depth is automated
		;                             // jchorus::Feedback is automated
		;                             // jchorus::Rate is automated
		jchorus.setParameterT(4, 1.); // jdsp::jchorus::Mix
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 52.0828);
		this->setParameterT(2, 0.532109);
		this->setParameterT(3, 0.532063);
		this->setParameterT(4, 0.0874697);
		this->setParameterT(5, 1.);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
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
using Chorus2 = wrap::node<Chorus2_impl::instance<NV>>;
}


