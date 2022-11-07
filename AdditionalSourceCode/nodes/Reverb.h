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

namespace Reverb_impl
{
// ==============================| Node & Parameter type declarations |==============================

DECLARE_PARAMETER_RANGE_SKEW(dry_wet_mixer1_c0Range, 
                             -100., 
                             0., 
                             5.42227);

using dry_wet_mixer1_c0 = parameter::from0To1<core::gain, 
                                              0, 
                                              dry_wet_mixer1_c0Range>;

using dry_wet_mixer1_c1 = dry_wet_mixer1_c0;

using dry_wet_mixer1_multimod = parameter::list<dry_wet_mixer1_c0, dry_wet_mixer1_c1>;

using dry_wet_mixer1_t = control::xfader<dry_wet_mixer1_multimod, 
                                         faders::linear>;

using dry_path1_t = container::chain<parameter::empty, 
                                     wrap::fix<2, dry_wet_mixer1_t>, 
                                     core::gain>;

template <int NV>
using wet_path1_t = container::chain<parameter::empty, 
                                     wrap::fix<2, project::FaustReverb<NV>>, 
                                     core::gain>;

namespace dry_wet2_t_parameters
{
}

template <int NV>
using dry_wet2_t = container::split<parameter::plain<Reverb_impl::dry_wet_mixer1_t, 0>, 
                                    wrap::fix<2, dry_path1_t>, 
                                    wet_path1_t<NV>>;

namespace Reverb_t_parameters
{
// Parameter list for Reverb_impl::Reverb_t --------------------------------------------------------

DECLARE_PARAMETER_RANGE_STEP(DampingRange, 
                             0., 
                             1, 
                             0.01);

template <int NV>
using Damping = parameter::from0To1<project::FaustReverb<NV>, 
                                    0, 
                                    DampingRange>;

template <int NV>
using Diffusion = parameter::from0To1<project::FaustReverb<NV>, 
                                      1, 
                                      DampingRange>;

template <int NV>
using HFGain = parameter::from0To1<project::FaustReverb<NV>, 
                                   2, 
                                   DampingRange>;

DECLARE_PARAMETER_RANGE(HighCrossover_InputRange, 
                        1000., 
                        10000.);
DECLARE_PARAMETER_RANGE_STEP(HighCrossover_0Range, 
                             1000., 
                             10000., 
                             1.);

template <int NV>
using HighCrossover_0 = parameter::from0To1<project::FaustReverb<NV>, 
                                            3, 
                                            HighCrossover_0Range>;

template <int NV>
using HighCrossover = parameter::chain<HighCrossover_InputRange, 
                                       HighCrossover_0<NV>>;

template <int NV>
using LFGain = parameter::from0To1<project::FaustReverb<NV>, 
                                   4, 
                                   DampingRange>;

DECLARE_PARAMETER_RANGE(LowCrossover_InputRange, 
                        100., 
                        6000.);
DECLARE_PARAMETER_RANGE_STEP(LowCrossover_0Range, 
                             100., 
                             6000., 
                             1.);

template <int NV>
using LowCrossover_0 = parameter::from0To1<project::FaustReverb<NV>, 
                                           5, 
                                           LowCrossover_0Range>;

template <int NV>
using LowCrossover = parameter::chain<LowCrossover_InputRange, 
                                      LowCrossover_0<NV>>;

template <int NV>
using MidGain = parameter::from0To1<project::FaustReverb<NV>, 
                                    6, 
                                    DampingRange>;

template <int NV>
using ModDepth = parameter::from0To1<project::FaustReverb<NV>, 
                                     7, 
                                     DampingRange>;

DECLARE_PARAMETER_RANGE_STEP(ModFrequencyRange, 
                             0., 
                             1, 
                             0.01);

template <int NV>
using ModFrequency = parameter::from0To1<project::FaustReverb<NV>, 
                                         8, 
                                         ModFrequencyRange>;

DECLARE_PARAMETER_RANGE(ReverbTime_InputRange, 
                        0., 
                        12.);
DECLARE_PARAMETER_RANGE_STEP(ReverbTime_0Range, 
                             0.1, 
                             60., 
                             0.1);

template <int NV>
using ReverbTime_0 = parameter::from0To1<project::FaustReverb<NV>, 
                                         9, 
                                         ReverbTime_0Range>;

template <int NV>
using ReverbTime = parameter::chain<ReverbTime_InputRange, ReverbTime_0<NV>>;

DECLARE_PARAMETER_RANGE(Size_InputRange, 
                        0.5, 
                        5.);
DECLARE_PARAMETER_RANGE_STEP(Size_0Range, 
                             0.5, 
                             5, 
                             0.01);

template <int NV>
using Size_0 = parameter::from0To1<project::FaustReverb<NV>, 
                                   10, 
                                   Size_0Range>;

template <int NV>
using Size = parameter::chain<Size_InputRange, Size_0<NV>>;

using Reverb = parameter::empty;
template <int NV>
using Mix = parameter::plain<Reverb_impl::dry_wet2_t<NV>, 
                             0>;
template <int NV>
using Reverb_t_plist = parameter::list<Reverb, 
                                       Damping<NV>, 
                                       Diffusion<NV>, 
                                       HFGain<NV>, 
                                       HighCrossover<NV>, 
                                       LFGain<NV>, 
                                       LowCrossover<NV>, 
                                       MidGain<NV>, 
                                       ModDepth<NV>, 
                                       ModFrequency<NV>, 
                                       ReverbTime<NV>, 
                                       Size<NV>, 
                                       Mix<NV>>;
}

template <int NV>
using Reverb_t_ = container::chain<Reverb_t_parameters::Reverb_t_plist<NV>, 
                                   wrap::fix<2, dry_wet2_t<NV>>>;

// =================================| Root node initialiser class |=================================

template <int NV> struct instance: public Reverb_impl::Reverb_t_<NV>
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 0;
		
		SNEX_METADATA_ID(Reverb);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(222)
		{
			0x005B, 0x0000, 0x5200, 0x7665, 0x7265, 0x0062, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x015B, 0x0000, 0x4400, 0x6D61, 0x6970, 0x676E, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0002, 0x0000, 0x6944, 0x6666, 0x7375, 0x6F69, 0x006E, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x0000, 0x0000, 0x035B, 0x0000, 0x4800, 0x4746, 0x6961, 0x006E, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x0000, 0x0000, 0x045B, 0x0000, 0x4800, 0x6769, 0x4368, 0x6F72, 
            0x7373, 0x766F, 0x7265, 0x0000, 0x7A00, 0x0044, 0x1C40, 0x0046, 
            0x7A00, 0x0044, 0x8000, 0x003F, 0x0000, 0x5B00, 0x0005, 0x0000, 
            0x464C, 0x6147, 0x6E69, 0x0000, 0x0000, 0x0000, 0x8000, 0x003F, 
            0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 0x5B00, 0x0006, 0x0000, 
            0x6F4C, 0x4377, 0x6F72, 0x7373, 0x766F, 0x7265, 0x0000, 0xC800, 
            0x0042, 0xBB80, 0x0045, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0007, 0x0000, 0x694D, 0x4764, 0x6961, 0x006E, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 
            0x0000, 0x085B, 0x0000, 0x4D00, 0x646F, 0x6544, 0x7470, 0x0068, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x0000, 0x0000, 0x095B, 0x0000, 0x4D00, 0x646F, 0x7246, 0x7165, 
            0x6575, 0x636E, 0x0079, 0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 
            0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0A5B, 0x0000, 0x5200, 
            0x7665, 0x7265, 0x5462, 0x6D69, 0x0065, 0x0000, 0x0000, 0x0000, 
            0x4140, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0B5B, 
            0x0000, 0x5300, 0x7A69, 0x0065, 0x0000, 0x3F00, 0x0000, 0x40A0, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0C5B, 0x0000, 
            0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 0x003F, 0x8000, 
            0x003F, 0x8000, 0x003F, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& dry_wet2 = this->getT(0);                       // Reverb_impl::dry_wet2_t<NV>
		auto& dry_path1 = this->getT(0).getT(0);              // Reverb_impl::dry_path1_t
		auto& dry_wet_mixer1 = this->getT(0).getT(0).getT(0); // Reverb_impl::dry_wet_mixer1_t
		auto& dry_gain1 = this->getT(0).getT(0).getT(1);      // core::gain
		auto& wet_path1 = this->getT(0).getT(1);              // Reverb_impl::wet_path1_t<NV>
		auto& faust = this->getT(0).getT(1).getT(0);          // project::FaustReverb<NV>
		auto& wet_gain1 = this->getT(0).getT(1).getT(1);      // core::gain
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet2.getParameterT(0).connectT(0, dry_wet_mixer1); // DryWet -> dry_wet_mixer1::Value
		
		this->getParameterT(1).connectT(0, faust); // Damping -> faust::Damping
		
		this->getParameterT(2).connectT(0, faust); // Diffusion -> faust::Diffusion
		
		this->getParameterT(3).connectT(0, faust); // HFGain -> faust::HFGain
		
		this->getParameterT(4).connectT(0, faust); // HighCrossover -> faust::HighCrossover
		
		this->getParameterT(5).connectT(0, faust); // LFGain -> faust::LFGain
		
		this->getParameterT(6).connectT(0, faust); // LowCrossover -> faust::LowCrossover
		
		this->getParameterT(7).connectT(0, faust); // MidGain -> faust::MIDGain
		
		this->getParameterT(8).connectT(0, faust); // ModDepth -> faust::ModDepth
		
		this->getParameterT(9).connectT(0, faust); // ModFrequency -> faust::ModFrequency
		
		this->getParameterT(10).connectT(0, faust); // ReverbTime -> faust::ReverbTime
		
		this->getParameterT(11).connectT(0, faust); // Size -> faust::Size
		
		this->getParameterT(12).connectT(0, dry_wet2); // Mix -> dry_wet2::DryWet
		
		// Modulation Connections ------------------------------------------------------------------
		
		auto& dry_wet_mixer1_p = dry_wet_mixer1.getWrappedObject().getParameter();
		dry_wet_mixer1_p.getParameterT(0).connectT(0, dry_gain1); // dry_wet_mixer1 -> dry_gain1::Gain
		dry_wet_mixer1_p.getParameterT(1).connectT(0, wet_gain1); // dry_wet_mixer1 -> wet_gain1::Gain
		
		// Default Values --------------------------------------------------------------------------
		
		; // dry_wet2::DryWet is automated
		
		; // dry_wet_mixer1::Value is automated
		
		;                                // dry_gain1::Gain is automated
		dry_gain1.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain1.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // faust::Damping is automated
		; // faust::Diffusion is automated
		; // faust::HFGain is automated
		; // faust::HighCrossover is automated
		; // faust::LFGain is automated
		; // faust::LowCrossover is automated
		; // faust::MIDGain is automated
		; // faust::ModDepth is automated
		; // faust::ModFrequency is automated
		; // faust::ReverbTime is automated
		; // faust::Size is automated
		
		;                                // wet_gain1::Gain is automated
		wet_gain1.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain1.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 1.);
		this->setParameterT(3, 1.);
		this->setParameterT(4, 1000.);
		this->setParameterT(5, 1.);
		this->setParameterT(6, 1.);
		this->setParameterT(7, 1.);
		this->setParameterT(8, 1.);
		this->setParameterT(9, 1.);
		this->setParameterT(10, 1.);
		this->setParameterT(11, 1.);
		this->setParameterT(12, 1.);
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
// ======================================| Public Definition |======================================

namespace project
{
// polyphonic template declaration

template <int NV>
using Reverb = wrap::node<Reverb_impl::instance<NV>>;
}


