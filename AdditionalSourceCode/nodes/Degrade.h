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

namespace Degrade_impl
{
// ==============================| Node & Parameter type declarations |==============================

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
                                    wrap::fix<2, wrap::no_process<filters::allpass<NV>>>, 
                                    fx::sampleandhold<NV>, 
                                    filters::one_pole<NV>, 
                                    filters::one_pole<NV>, 
                                    core::gain>;
template <int NV>
using oscillator_t = wrap::no_data<core::oscillator<NV>>;

DECLARE_PARAMETER_RANGE_STEP(pma_modRange, 
                             0., 
                             64., 
                             1.);

template <int NV>
using pma_mod = parameter::from0To1<fx::sampleandhold<NV>, 
                                    0, 
                                    pma_modRange>;

template <int NV>
using pma_t = control::pma<NV, pma_mod<NV>>;
template <int NV>
using peak_t = wrap::mod<parameter::plain<pma_t<NV>, 0>, 
                         wrap::no_data<core::peak>>;

template <int NV>
using modchain_t_ = container::chain<parameter::empty, 
                                     wrap::fix<1, oscillator_t<NV>>, 
                                     math::mul<NV>, 
                                     math::sig2mod<NV>, 
                                     peak_t<NV>, 
                                     pma_t<NV>>;

template <int NV>
using modchain_t = wrap::control_rate<modchain_t_<NV>>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Degrade_impl::dry_wet_mixer_t, 0>, 
                                    wrap::fix<2, dry_path_t>, 
                                    wet_path_t<NV>, 
                                    modchain_t<NV>>;

namespace Degrade_t_parameters
{
// Parameter list for Degrade_impl::Degrade_t ------------------------------------------------------

DECLARE_PARAMETER_RANGE(HighCut_InputRange, 
                        20., 
                        20000.);
DECLARE_PARAMETER_RANGE_SKEW(HighCut_0Range, 
                             20., 
                             20000., 
                             0.229905);

template <int NV>
using HighCut_0 = parameter::from0To1<filters::one_pole<NV>, 
                                      0, 
                                      HighCut_0Range>;

template <int NV>
using HighCut = parameter::chain<HighCut_InputRange, HighCut_0<NV>>;

DECLARE_PARAMETER_RANGE(LowCut_InputRange, 
                        20., 
                        20000.);
template <int NV> using LowCut_0 = HighCut_0<NV>;

template <int NV>
using LowCut = parameter::chain<LowCut_InputRange, LowCut_0<NV>>;

DECLARE_PARAMETER_RANGE_SKEW(ModulationSpeedRange, 
                             1, 
                             200., 
                             0.229905);

template <int NV>
using ModulationSpeed = parameter::from0To1<Degrade_impl::oscillator_t<NV>, 
                                            1, 
                                            ModulationSpeedRange>;

DECLARE_PARAMETER_RANGE_STEP(Amount_InputRange, 
                             0., 
                             61., 
                             1.);
DECLARE_PARAMETER_RANGE(Amount_0Range, 
                        -1., 
                        1.);

template <int NV>
using Amount_0 = parameter::from0To1<Degrade_impl::pma_t<NV>, 
                                     2, 
                                     Amount_0Range>;

template <int NV>
using Amount = parameter::chain<Amount_InputRange, Amount_0<NV>>;

using Degrade = parameter::empty;
template <int NV>
using Mix = parameter::plain<Degrade_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using ModulationDepth = parameter::plain<math::mul<NV>, 0>;
template <int NV>
using Degrade_t_plist = parameter::list<Degrade, 
                                        Mix<NV>, 
                                        HighCut<NV>, 
                                        LowCut<NV>, 
                                        ModulationDepth<NV>, 
                                        ModulationSpeed<NV>, 
                                        Amount<NV>>;
}

template <int NV>
using Degrade_t_ = container::chain<Degrade_t_parameters::Degrade_t_plist<NV>, 
                                    wrap::fix<2, dry_wet1_t<NV>>>;

// =================================| Root node initialiser class |=================================

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
		SNEX_METADATA_ENCODED_PARAMETERS(122)
		{
			0x005B, 0x0000, 0x4400, 0x6765, 0x6172, 0x6564, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0001, 0x0000, 0x694D, 0x0078, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x025B, 
            0x0000, 0x4800, 0x6769, 0x4368, 0x7475, 0x0000, 0xA000, 0x0041, 
            0x9C40, 0x6746, 0x83D5, 0x0046, 0x8000, 0x003F, 0x0000, 0x5B00, 
            0x0003, 0x0000, 0x6F4C, 0x4377, 0x7475, 0x0000, 0xA000, 0x0041, 
            0x9C40, 0xBF46, 0x9B17, 0x0045, 0x8000, 0x003F, 0x0000, 0x5B00, 
            0x0004, 0x0000, 0x6F4D, 0x7564, 0x616C, 0x6974, 0x6E6F, 0x6544, 
            0x7470, 0x0068, 0x0000, 0x0000, 0x0000, 0x3F80, 0x1EB8, 0x3D26, 
            0x0000, 0x3F80, 0x0000, 0x0000, 0x055B, 0x0000, 0x4D00, 0x646F, 
            0x6C75, 0x7461, 0x6F69, 0x536E, 0x6570, 0x6465, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x0000, 0x0000, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0006, 0x0000, 0x6D41, 0x756F, 0x746E, 0x0000, 0x0000, 
            0x0000, 0x7400, 0x0042, 0x7400, 0x0042, 0x8000, 0x003F, 0x8000, 
            0x003F, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                      // Degrade_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);              // Degrade_impl::dry_path_t
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0); // Degrade_impl::dry_wet_mixer_t
		auto& dry_gain = this->getT(0).getT(0).getT(1);      // core::gain
		auto& wet_path = this->getT(0).getT(1);              // Degrade_impl::wet_path_t<NV>
		auto& allpass = this->getT(0).getT(1).getT(0);       // wrap::no_process<filters::allpass<NV>>
		auto& sampleandhold = this->getT(0).getT(1).getT(1); // fx::sampleandhold<NV>
		auto& one_pole = this->getT(0).getT(1).getT(2);      // filters::one_pole<NV>
		auto& one_pole1 = this->getT(0).getT(1).getT(3);     // filters::one_pole<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(4);      // core::gain
		auto& modchain = this->getT(0).getT(2);              // Degrade_impl::modchain_t<NV>
		auto& oscillator = this->getT(0).getT(2).getT(0);    // Degrade_impl::oscillator_t<NV>
		auto& mul = this->getT(0).getT(2).getT(1);           // math::mul<NV>
		auto& sig2mod = this->getT(0).getT(2).getT(2);       // math::sig2mod<NV>
		auto& peak = this->getT(0).getT(2).getT(3);          // Degrade_impl::peak_t<NV>
		auto& pma = this->getT(0).getT(2).getT(4);           // Degrade_impl::pma_t<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		this->getParameterT(2).connectT(0, one_pole); // HighCut -> one_pole::Frequency
		
		this->getParameterT(3).connectT(0, one_pole1); // LowCut -> one_pole1::Frequency
		
		this->getParameterT(4).connectT(0, mul); // ModulationDepth -> mul::Value
		
		this->getParameterT(5).connectT(0, oscillator); // ModulationSpeed -> oscillator::Frequency
		
		this->getParameterT(6).connectT(0, pma); // Amount -> pma::Add
		
		// Modulation Connections ------------------------------------------------------------------
		
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain);           // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain);           // dry_wet_mixer -> wet_gain::Gain
		pma.getWrappedObject().getParameter().connectT(0, sampleandhold); // pma -> sampleandhold::Counter
		peak.getParameter().connectT(0, pma);                             // peak -> pma::Value
		
		// Default Values --------------------------------------------------------------------------
		
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
		
		;                               // wet_gain::Gain is automated
		wet_gain.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		oscillator.setParameterT(0, 0.); // core::oscillator::Mode
		;                                // oscillator::Frequency is automated
		oscillator.setParameterT(2, 1.); // core::oscillator::FreqRatio
		oscillator.setParameterT(3, 1.); // core::oscillator::Gate
		oscillator.setParameterT(4, 0.); // core::oscillator::Phase
		oscillator.setParameterT(5, 1.); // core::oscillator::Gain
		
		; // mul::Value is automated
		
		sig2mod.setParameterT(0, 0.0176331); // math::sig2mod::Value
		
		;                         // pma::Value is automated
		pma.setParameterT(1, 1.); // control::pma::Multiply
		;                         // pma::Add is automated
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 16874.7);
		this->setParameterT(3, 4962.97);
		this->setParameterT(4, 0.0405566);
		this->setParameterT(5, 0.);
		this->setParameterT(6, 61.);
		this->setExternalData({}, -1);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool isProcessingHiseEvent() { return true; };
	
	static constexpr bool hasTail() { return true; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------------------------------
		
		this->getT(0).getT(2).getT(0).setExternalData(b, index); // Degrade_impl::oscillator_t<NV>
		this->getT(0).getT(2).getT(3).setExternalData(b, index); // Degrade_impl::peak_t<NV>
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
using Degrade = wrap::node<Degrade_impl::instance<NV>>;
}


