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
                                    wrap::fix<2, filters::one_pole<NV>>, 
                                    filters::one_pole<NV>, 
                                    project::Distortion<NV>, 
                                    filters::one_pole<NV>, 
                                    filters::one_pole<NV>, 
                                    core::gain>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Waveshaper_impl::dry_wet_mixer_t, 0>, 
                                    wrap::fix<2, dry_path_t>, 
                                    wet_path_t<NV>>;

namespace Waveshaper_t_parameters
{
// Parameter list for Waveshaper_impl::Waveshaper_t ----------------------------------------------

DECLARE_PARAMETER_RANGE_STEP(AmountRange, 
                             0., 
                             100., 
                             0.1);

template <int NV>
using Amount = parameter::from0To1<project::Distortion<NV>, 
                                   0, 
                                   AmountRange>;

DECLARE_PARAMETER_RANGE_STEP(GainRange, 
                             -96., 
                             3., 
                             0.1);

template <int NV>
using Gain = parameter::from0To1<project::Distortion<NV>, 
                                 1, 
                                 GainRange>;

using Distort = parameter::empty;
template <int NV>
using Mix = parameter::plain<Waveshaper_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using lp = parameter::plain<filters::one_pole<NV>, 0>;
template <int NV> using hp = lp<NV>;
template <int NV> using postlp = lp<NV>;
template <int NV> using posthp = lp<NV>;
template <int NV>
using Waveshaper_t_plist = parameter::list<Distort, 
                                           Mix<NV>, 
                                           Amount<NV>, 
                                           Gain<NV>, 
                                           lp<NV>, 
                                           hp<NV>, 
                                           postlp<NV>, 
                                           posthp<NV>>;
}

template <int NV>
using Waveshaper_t_ = container::chain<Waveshaper_t_parameters::Waveshaper_t_plist<NV>, 
                                       wrap::fix<2, dry_wet1_t<NV>>>;

// ================================| Root node initialiser class |================================

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
		SNEX_METADATA_ENCODED_PARAMETERS(124)
		{
			0x005B, 0x0000, 0x4400, 0x7369, 0x6F74, 0x7472, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0001, 0x0000, 0x694D, 0x0078, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x025B, 
            0x0000, 0x4100, 0x6F6D, 0x6E75, 0x0074, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x5C29, 0x3E8F, 0x0000, 0x3F80, 0x0000, 0x0000, 0x035B, 
            0x0000, 0x4700, 0x6961, 0x006E, 0x0000, 0x0000, 0x0000, 0x3F80, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x045B, 0x0000, 
            0x6C00, 0x0070, 0x0000, 0x41A0, 0x4000, 0x469C, 0x12C1, 0x45E8, 
            0x6C1A, 0x3E6B, 0x0000, 0x0000, 0x055B, 0x0000, 0x6800, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0x0000, 0x41A0, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x065B, 0x0000, 0x7000, 0x736F, 0x6C74, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0x0000, 0x3F80, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x075B, 0x0000, 0x7000, 0x736F, 0x6874, 0x0070, 
            0x0000, 0x41A0, 0x4000, 0x469C, 0x4000, 0x469C, 0x6C1A, 0x3E6B, 
            0x0000, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -----------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                      // Waveshaper_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);              // Waveshaper_impl::dry_path_t
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0); // Waveshaper_impl::dry_wet_mixer_t
		auto& dry_gain = this->getT(0).getT(0).getT(1);      // core::gain
		auto& wet_path = this->getT(0).getT(1);              // Waveshaper_impl::wet_path_t<NV>
		auto& one_pole = this->getT(0).getT(1).getT(0);      // filters::one_pole<NV>
		auto& one_pole1 = this->getT(0).getT(1).getT(1);     // filters::one_pole<NV>
		auto& faust = this->getT(0).getT(1).getT(2);         // project::Distortion<NV>
		auto& one_pole2 = this->getT(0).getT(1).getT(3);     // filters::one_pole<NV>
		auto& one_pole3 = this->getT(0).getT(1).getT(4);     // filters::one_pole<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(5);      // core::gain
		
		// Parameter Connections -----------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		this->getParameterT(2).connectT(0, faust); // Amount -> faust::distortion
		
		this->getParameterT(3).connectT(0, faust); // Gain -> faust::gain
		
		this->getParameterT(4).connectT(0, one_pole); // lp -> one_pole::Frequency
		
		this->getParameterT(5).connectT(0, one_pole1); // hp -> one_pole1::Frequency
		
		this->getParameterT(6).connectT(0, one_pole2); // postlp -> one_pole2::Frequency
		
		this->getParameterT(7).connectT(0, one_pole3); // posthp -> one_pole3::Frequency
		
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
		
		;                                // one_pole::Frequency is automated
		one_pole.setParameterT(1, 1.);   // filters::one_pole::Q
		one_pole.setParameterT(2, 0.);   // filters::one_pole::Gain
		one_pole.setParameterT(3, 0.01); // filters::one_pole::Smoothing
		one_pole.setParameterT(4, 0.);   // filters::one_pole::Mode
		one_pole.setParameterT(5, 1.);   // filters::one_pole::Enabled
		
		;                                 // one_pole1::Frequency is automated
		one_pole1.setParameterT(1, 1.);   // filters::one_pole::Q
		one_pole1.setParameterT(2, 0.);   // filters::one_pole::Gain
		one_pole1.setParameterT(3, 0.01); // filters::one_pole::Smoothing
		one_pole1.setParameterT(4, 1.);   // filters::one_pole::Mode
		one_pole1.setParameterT(5, 1.);   // filters::one_pole::Enabled
		
		; // faust::distortion is automated
		; // faust::gain is automated
		
		;                                 // one_pole2::Frequency is automated
		one_pole2.setParameterT(1, 1.);   // filters::one_pole::Q
		one_pole2.setParameterT(2, 0.);   // filters::one_pole::Gain
		one_pole2.setParameterT(3, 0.01); // filters::one_pole::Smoothing
		one_pole2.setParameterT(4, 0.);   // filters::one_pole::Mode
		one_pole2.setParameterT(5, 1.);   // filters::one_pole::Enabled
		
		;                                 // one_pole3::Frequency is automated
		one_pole3.setParameterT(1, 1.);   // filters::one_pole::Q
		one_pole3.setParameterT(2, 0.);   // filters::one_pole::Gain
		one_pole3.setParameterT(3, 0.01); // filters::one_pole::Smoothing
		one_pole3.setParameterT(4, 1.);   // filters::one_pole::Mode
		one_pole3.setParameterT(5, 1.);   // filters::one_pole::Enabled
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 0.28);
		this->setParameterT(3, 1.);
		this->setParameterT(4, 7426.34);
		this->setParameterT(5, 20.);
		this->setParameterT(6, 1.);
		this->setParameterT(7, 20000.);
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
using Waveshaper = wrap::node<Waveshaper_impl::instance<NV>>;
}


