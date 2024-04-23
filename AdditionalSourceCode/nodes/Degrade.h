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
using branch_t = container::branch<parameter::empty, 
                                   wrap::fix<2, fx::sampleandhold<NV>>, 
                                   fx::bitcrush<NV>>;

template <int NV>
using wet_path_t = container::chain<parameter::empty, 
                                    wrap::fix<2, branch_t<NV>>, 
                                    filters::one_pole<NV>, 
                                    filters::one_pole<NV>, 
                                    core::gain<NV>>;

template <int NV>
using ramp_t = wrap::no_data<core::ramp<NV, false>>;
template <int NV>
using converter_t = control::converter<parameter::plain<ramp_t<NV>, 0>, 
                                       conversion_logic::freq2ms>;

template <int NV>
using crush_t = control::pma_unscaled<NV, 
                                      parameter::plain<fx::bitcrush<NV>, 0>>;

template <int NV>
using samplehold_t = control::pma_unscaled<NV, 
                                           parameter::plain<fx::sampleandhold<NV>, 0>>;

template <int NV>
using peak_mod = parameter::chain<ranges::Identity, 
                                  parameter::plain<crush_t<NV>, 0>, 
                                  parameter::plain<samplehold_t<NV>, 0>>;

template <int NV>
using peak_t = wrap::mod<peak_mod<NV>, 
                         wrap::data<core::peak, data::external::displaybuffer<0>>>;

template <int NV>
using modchain_t_ = container::chain<parameter::empty, 
                                     wrap::fix<1, converter_t<NV>>, 
                                     ramp_t<NV>, 
                                     math::pi<NV>, 
                                     math::sin<NV>, 
                                     math::mul<NV>, 
                                     math::sig2mod<NV>, 
                                     peak_t<NV>, 
                                     crush_t<NV>, 
                                     samplehold_t<NV>>;

template <int NV>
using modchain_t = wrap::control_rate<modchain_t_<NV>>;

namespace dry_wet1_t_parameters
{
}

template <int NV>
using dry_wet1_t = container::split<parameter::plain<Degrade_impl::dry_wet_mixer_t<NV>, 0>, 
                                    wrap::fix<2, dry_path_t<NV>>, 
                                    wet_path_t<NV>, 
                                    modchain_t<NV>>;

namespace Degrade_t_parameters
{
// Parameter list for Degrade_impl::Degrade_t ------------------------------------------------------

using Degrade = parameter::empty;
template <int NV>
using Mix = parameter::plain<Degrade_impl::dry_wet1_t<NV>, 
                             0>;
template <int NV>
using HighCut = parameter::plain<filters::one_pole<NV>, 0>;
template <int NV> using LowCut = HighCut<NV>;
template <int NV>
using ModulationDepth = parameter::plain<math::mul<NV>, 0>;
template <int NV>
using ModulationSpeed = parameter::plain<Degrade_impl::converter_t<NV>, 
                                         0>;
template <int NV>
using Amount = parameter::plain<Degrade_impl::samplehold_t<NV>, 
                                2>;
template <int NV>
using CrushMode = parameter::plain<Degrade_impl::branch_t<NV>, 
                                   0>;
template <int NV>
using BitDepth = parameter::plain<Degrade_impl::crush_t<NV>, 
                                  2>;
template <int NV>
using BitcrushMode = parameter::plain<fx::bitcrush<NV>, 1>;
template <int NV>
using Degrade_t_plist = parameter::list<Degrade, 
                                        Mix<NV>, 
                                        HighCut<NV>, 
                                        LowCut<NV>, 
                                        ModulationDepth<NV>, 
                                        ModulationSpeed<NV>, 
                                        Amount<NV>, 
                                        CrushMode<NV>, 
                                        BitDepth<NV>, 
                                        BitcrushMode<NV>>;
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
		static const int NumDisplayBuffers = 1;
		
		SNEX_METADATA_ID(Degrade);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(176)
		{
			0x005B, 0x0000, 0x4400, 0x6765, 0x6172, 0x6564, 0x0000, 0x0000, 
            0x0000, 0x8000, 0x003F, 0x8000, 0x003F, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0001, 0x0000, 0x694D, 0x0078, 0x0000, 0x0000, 0x0000, 
            0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000, 0x025B, 
            0x0000, 0x4800, 0x6769, 0x4368, 0x7475, 0x0000, 0xA000, 0x0041, 
            0x9C40, 0x0046, 0x9C40, 0x1A46, 0x6B6C, 0x003E, 0x0000, 0x5B00, 
            0x0003, 0x0000, 0x6F4C, 0x4377, 0x7475, 0x0000, 0xA000, 0x0041, 
            0x9C40, 0x0046, 0xA000, 0x1A41, 0x6B6C, 0x003E, 0x0000, 0x5B00, 
            0x0004, 0x0000, 0x6F4D, 0x7564, 0x616C, 0x6974, 0x6E6F, 0x6544, 
            0x7470, 0x0068, 0x0000, 0x0000, 0x0000, 0x3F80, 0x891F, 0x3E82, 
            0x0000, 0x3F80, 0x0000, 0x0000, 0x055B, 0x0000, 0x4D00, 0x646F, 
            0x6C75, 0x7461, 0x6F69, 0x536E, 0x6570, 0x6465, 0x0000, 0x0000, 
            0x0000, 0xF000, 0xEC41, 0x1851, 0x1A40, 0x6B6C, 0x0A3E, 0x23D7, 
            0x5B3C, 0x0006, 0x0000, 0x6D41, 0x756F, 0x746E, 0x0000, 0x8000, 
            0x003F, 0xC600, 0x6742, 0x1B03, 0x0042, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0007, 0x0000, 0x7243, 0x7375, 0x4D68, 0x646F, 0x0065, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x0000, 0x3F80, 0x085B, 0x0000, 0x4200, 0x7469, 0x6544, 0x7470, 
            0x0068, 0x0000, 0x4080, 0x0000, 0x4180, 0x6666, 0x40B6, 0x0000, 
            0x3F80, 0x0000, 0x0000, 0x095B, 0x0000, 0x4200, 0x7469, 0x7263, 
            0x7375, 0x4D68, 0x646F, 0x0065, 0x0000, 0x0000, 0x0000, 0x3F80, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                              // Degrade_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);                      // Degrade_impl::dry_path_t<NV>
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0);         // Degrade_impl::dry_wet_mixer_t<NV>
		auto& dry_gain = this->getT(0).getT(0).getT(1);              // core::gain<NV>
		auto& wet_path = this->getT(0).getT(1);                      // Degrade_impl::wet_path_t<NV>
		auto& branch = this->getT(0).getT(1).getT(0);                // Degrade_impl::branch_t<NV>
		auto& sampleandhold = this->getT(0).getT(1).getT(0).getT(0); // fx::sampleandhold<NV>
		auto& bitcrush = this->getT(0).getT(1).getT(0).getT(1);      // fx::bitcrush<NV>
		auto& one_pole = this->getT(0).getT(1).getT(1);              // filters::one_pole<NV>
		auto& one_pole1 = this->getT(0).getT(1).getT(2);             // filters::one_pole<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(3);              // core::gain<NV>
		auto& modchain = this->getT(0).getT(2);                      // Degrade_impl::modchain_t<NV>
		auto& converter = this->getT(0).getT(2).getT(0);             // Degrade_impl::converter_t<NV>
		auto& ramp = this->getT(0).getT(2).getT(1);                  // Degrade_impl::ramp_t<NV>
		auto& pi = this->getT(0).getT(2).getT(2);                    // math::pi<NV>
		auto& sin = this->getT(0).getT(2).getT(3);                   // math::sin<NV>
		auto& mul = this->getT(0).getT(2).getT(4);                   // math::mul<NV>
		auto& sig2mod = this->getT(0).getT(2).getT(5);               // math::sig2mod<NV>
		auto& peak = this->getT(0).getT(2).getT(6);                  // Degrade_impl::peak_t<NV>
		auto& crush = this->getT(0).getT(2).getT(7);                 // Degrade_impl::crush_t<NV>
		auto& samplehold = this->getT(0).getT(2).getT(8);            // Degrade_impl::samplehold_t<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet1.getParameterT(0).connectT(0, dry_wet_mixer); // DryWet -> dry_wet_mixer::Value
		
		this->getParameterT(1).connectT(0, dry_wet1); // Mix -> dry_wet1::DryWet
		
		this->getParameterT(2).connectT(0, one_pole); // HighCut -> one_pole::Frequency
		
		this->getParameterT(3).connectT(0, one_pole1); // LowCut -> one_pole1::Frequency
		
		this->getParameterT(4).connectT(0, mul); // ModulationDepth -> mul::Value
		
		this->getParameterT(5).connectT(0, converter); // ModulationSpeed -> converter::Value
		
		this->getParameterT(6).connectT(0, samplehold); // Amount -> samplehold::Add
		
		this->getParameterT(7).connectT(0, branch); // CrushMode -> branch::Index
		
		this->getParameterT(8).connectT(0, crush); // BitDepth -> crush::Add
		
		this->getParameterT(9).connectT(0, bitcrush); // BitcrushMode -> bitcrush::Mode
		
		// Modulation Connections ------------------------------------------------------------------
		
		auto& dry_wet_mixer_p = dry_wet_mixer.getWrappedObject().getParameter();
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain);                  // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain);                  // dry_wet_mixer -> wet_gain::Gain
		converter.getWrappedObject().getParameter().connectT(0, ramp);           // converter -> ramp::PeriodTime
		crush.getWrappedObject().getParameter().connectT(0, bitcrush);           // crush -> bitcrush::BitDepth
		samplehold.getWrappedObject().getParameter().connectT(0, sampleandhold); // samplehold -> sampleandhold::Counter
		peak.getParameter().connectT(0, crush);                                  // peak -> crush::Value
		peak.getParameter().connectT(1, samplehold);                             // peak -> samplehold::Value
		
		// Default Values --------------------------------------------------------------------------
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // branch::Index is automated
		
		; // sampleandhold::Counter is automated
		
		; // bitcrush::BitDepth is automated
		; // bitcrush::Mode is automated
		
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
		
		; // converter::Value is automated
		
		;                          // ramp::PeriodTime is automated
		ramp.setParameterT(1, 0.); // core::ramp::LoopStart
		ramp.setParameterT(2, 1.); // core::ramp::Gate
		
		pi.setParameterT(0, 2.); // math::pi::Value
		
		sin.setParameterT(0, 2.); // math::sin::Value
		
		; // mul::Value is automated
		
		sig2mod.setParameterT(0, 0.0176331); // math::sig2mod::Value
		
		;                           // crush::Value is automated
		crush.setParameterT(1, 3.); // control::pma_unscaled::Multiply
		;                           // crush::Add is automated
		
		;                                // samplehold::Value is automated
		samplehold.setParameterT(1, 3.); // control::pma_unscaled::Multiply
		;                                // samplehold::Add is automated
		
		this->setParameterT(0, 1.);
		this->setParameterT(1, 1.);
		this->setParameterT(2, 20000.);
		this->setParameterT(3, 20.);
		this->setParameterT(4, 0.254952);
		this->setParameterT(5, 2.38);
		this->setParameterT(6, 38.7533);
		this->setParameterT(7, 1.);
		this->setParameterT(8, 5.7);
		this->setParameterT(9, 1.);
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
		
		this->getT(0).getT(2).getT(1).setExternalData(b, index); // Degrade_impl::ramp_t<NV>
		this->getT(0).getT(2).getT(6).setExternalData(b, index); // Degrade_impl::peak_t<NV>
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


