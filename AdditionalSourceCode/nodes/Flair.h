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

namespace Flair_impl
{
// ==============================| Node & Parameter type declarations |==============================

using faust_multimod = parameter::list<parameter::empty>;

template <int NV>
using faust_t = project::Flanger<NV, faust_multimod>;

template <int NV>
using smooth_delay2_t = wrap::mod<parameter::plain<faust_t<NV>, 5>, 
                                  control::smoothed_parameter_unscaled<NV, smoothers::linear_ramp<NV>>>;

template <int NV>
using smooth_delay1_mod = parameter::chain<ranges::Identity, 
                                           parameter::plain<faust_t<NV>, 5>, 
                                           parameter::plain<smooth_delay2_t<NV>, 0>>;

template <int NV>
using smooth_delay1_t = wrap::mod<smooth_delay1_mod<NV>, 
                                  control::smoothed_parameter_unscaled<NV, smoothers::low_pass<NV>>>;

template <int NV>
using feedback_smooth_t = wrap::mod<parameter::plain<faust_t<NV>, 4>, 
                                    control::smoothed_parameter_unscaled<NV, smoothers::linear_ramp<NV>>>;

template <int NV>
using smoothedoffset_t = wrap::mod<parameter::plain<faust_t<NV>, 6>, 
                                   control::smoothed_parameter_unscaled<NV, smoothers::linear_ramp<NV>>>;

template <int NV>
using smoothed_parameter_unscaled_t = wrap::mod<parameter::plain<faust_t<NV>, 3>, 
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
                                    wrap::fix<2, faust_t<NV>>, 
                                    core::gain<NV>>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Flair_impl::dry_wet_mixer_t<NV>, 0>, 
                                    wrap::fix<2, dry_path_t<NV>>, 
                                    wet_path_t<NV>>;

namespace Flair_t_parameters
{
// Parameter list for Flair_impl::Flair_t ----------------------------------------------------------

using Flanger = parameter::empty;
template <int NV>
using Speed = parameter::plain<Flair_impl::faust_t<NV>, 
                               2>;
template <int NV>
using Depth = parameter::plain<Flair_impl::smoothed_parameter_unscaled_t<NV>, 
                               0>;
template <int NV>
using Feedback = parameter::plain<Flair_impl::feedback_smooth_t<NV>, 
                                  0>;
template <int NV>
using Delay = parameter::plain<Flair_impl::smooth_delay1_t<NV>, 
                               0>;
template <int NV>
using Offset = parameter::plain<Flair_impl::smoothedoffset_t<NV>, 
                                0>;
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
                                  wrap::fix<2, smooth_delay1_t<NV>>, 
                                  smooth_delay2_t<NV>, 
                                  feedback_smooth_t<NV>, 
                                  smoothedoffset_t<NV>, 
                                  smoothed_parameter_unscaled_t<NV>, 
                                  dry_wet1_t<NV>>;

// =================================| Root node initialiser class |=================================

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
            0x0000, 0x4120, 0x0000, 0x4120, 0x0000, 0x3F80, 0xD70A, 0x3C23, 
            0x025B, 0x0000, 0x4400, 0x7065, 0x6874, 0x0000, 0x0000, 0x0000, 
            0x8000, 0x593F, 0x3439, 0x003F, 0x8000, 0x6F3F, 0x8312, 0x5B3A, 
            0x0003, 0x0000, 0x6546, 0x6465, 0x6162, 0x6B63, 0x0000, 0x8000, 
            0x00BF, 0x8000, 0x733F, 0xC8A8, 0x003D, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0004, 0x0000, 0x6544, 0x616C, 0x0079, 0x0000, 0x0000, 
            0x0000, 0x41A0, 0xB443, 0x4184, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x055B, 0x0000, 0x4F00, 0x6666, 0x6573, 0x0074, 0x0000, 0x0000, 
            0x0000, 0x41A0, 0x28C8, 0x419A, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x065B, 0x0000, 0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 
            0x1D3F, 0xF81C, 0x003E, 0x8000, 0x003F, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& smooth_delay1 = this->getT(0);                 // Flair_impl::smooth_delay1_t<NV>
		auto& smooth_delay2 = this->getT(1);                 // Flair_impl::smooth_delay2_t<NV>
		auto& feedback_smooth = this->getT(2);               // Flair_impl::feedback_smooth_t<NV>
		auto& smoothedoffset = this->getT(3);                // Flair_impl::smoothedoffset_t<NV>
		auto& smoothed_parameter_unscaled = this->getT(4);   // Flair_impl::smoothed_parameter_unscaled_t<NV>
		auto& dry_wet1 = this->getT(5);                      // Flair_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(5).getT(0);              // Flair_impl::dry_path_t<NV>
		auto& dry_wet_mixer = this->getT(5).getT(0).getT(0); // Flair_impl::dry_wet_mixer_t<NV>
		auto& dry_gain = this->getT(5).getT(0).getT(1);      // core::gain<NV>
		auto& wet_path = this->getT(5).getT(1);              // Flair_impl::wet_path_t<NV>
		auto& faust = this->getT(5).getT(1).getT(0);         // Flair_impl::faust_t<NV>
		auto& wet_gain = this->getT(5).getT(1).getT(1);      // core::gain<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, faust); // Speed -> faust::Speed
		
		this->getParameterT(2).connectT(0, smoothed_parameter_unscaled); // Depth -> smoothed_parameter_unscaled::Value
		
		this->getParameterT(3).connectT(0, feedback_smooth); // Feedback -> feedback_smooth::Value
		
		this->getParameterT(4).connectT(0, smooth_delay1); // Delay -> smooth_delay1::Value
		
		this->getParameterT(5).connectT(0, smoothedoffset); // Offset -> smoothedoffset::Value
		
		this->getParameterT(6).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		// Modulation Connections ------------------------------------------------------------------
		
		auto& faust_p = faust.getWrappedObject().getParameter();
		smooth_delay2.getParameter().connectT(0, faust);               // smooth_delay2 -> faust::FlangeDelay
		smooth_delay1.getParameter().connectT(0, faust);               // smooth_delay1 -> faust::FlangeDelay
		smooth_delay1.getParameter().connectT(1, smooth_delay2);       // smooth_delay1 -> smooth_delay2::Value
		feedback_smooth.getParameter().connectT(0, faust);             // feedback_smooth -> faust::Feedback
		smoothedoffset.getParameter().connectT(0, faust);              // smoothedoffset -> faust::DelayOffset
		smoothed_parameter_unscaled.getParameter().connectT(0, faust); // smoothed_parameter_unscaled -> faust::Depth
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain); // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain); // dry_wet_mixer -> wet_gain::Gain
		
		// Default Values --------------------------------------------------------------------------
		
		;                                      // smooth_delay1::Value is automated
		smooth_delay1.setParameterT(1, 1000.); // control::smoothed_parameter_unscaled::SmoothingTime
		smooth_delay1.setParameterT(2, 1.);    // control::smoothed_parameter_unscaled::Enabled
		
		;                                      // smooth_delay2::Value is automated
		smooth_delay2.setParameterT(1, 1000.); // control::smoothed_parameter_unscaled::SmoothingTime
		smooth_delay2.setParameterT(2, 1.);    // control::smoothed_parameter_unscaled::Enabled
		
		;                                       // feedback_smooth::Value is automated
		feedback_smooth.setParameterT(1, 200.); // control::smoothed_parameter_unscaled::SmoothingTime
		feedback_smooth.setParameterT(2, 1.);   // control::smoothed_parameter_unscaled::Enabled
		
		;                                       // smoothedoffset::Value is automated
		smoothedoffset.setParameterT(1, 1000.); // control::smoothed_parameter_unscaled::SmoothingTime
		smoothedoffset.setParameterT(2, 1.);    // control::smoothed_parameter_unscaled::Enabled
		
		;                                                   // smoothed_parameter_unscaled::Value is automated
		smoothed_parameter_unscaled.setParameterT(1, 100.); // control::smoothed_parameter_unscaled::SmoothingTime
		smoothed_parameter_unscaled.setParameterT(2, 1.);   // control::smoothed_parameter_unscaled::Enabled
		
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
		this->setParameterT(1, 1);
		this->setParameterT(2, 0.704);
		this->setParameterT(3, 0.0979775);
		this->setParameterT(4, 16.588);
		this->setParameterT(5, 19.2699);
		this->setParameterT(6, 0.484589);
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
using Flair = wrap::node<Flair_impl::instance<NV>>;
}


