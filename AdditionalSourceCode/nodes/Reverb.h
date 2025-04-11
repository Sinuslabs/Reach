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

namespace Reverb_impl
{
// ==============================| Node & Parameter type declarations |==============================

DECLARE_PARAMETER_RANGE_SKEW(pma_modRange, 
                             -100., 
                             0., 
                             5.42227);

template <int NV>
using pma_mod = parameter::from0To1<core::gain<NV>, 
                                    0, 
                                    pma_modRange>;

template <int NV>
using pma_t = control::pma<NV, pma_mod<NV>>;
template <int NV>
using smoothed_parameter1_t = wrap::mod<parameter::plain<pma_t<NV>, 0>, 
                                        control::smoothed_parameter<NV, smoothers::linear_ramp<NV>>>;
template <int NV>
using peak_t = wrap::mod<parameter::plain<smoothed_parameter1_t<NV>, 0>, 
                         wrap::no_data<core::peak>>;

DECLARE_PARAMETER_RANGE_STEP(bipolar_modRange, 
                             -15., 
                             0., 
                             0.01);

template <int NV>
using bipolar_mod = parameter::from0To1<pma_t<NV>, 
                                        1, 
                                        bipolar_modRange>;

template <int NV>
using bipolar_t = control::bipolar<NV, bipolar_mod<NV>>;

template <int NV>
using fix8_block_t_ = container::chain<parameter::empty, 
                                       wrap::fix<2, peak_t<NV>>, 
                                       smoothed_parameter1_t<NV>, 
                                       bipolar_t<NV>>;

template <int NV>
using fix8_block_t = wrap::fix_block<8, fix8_block_t_<NV>>;

template <int NV> using dry_wet_mixer1_c0 = pma_mod<NV>;

template <int NV> using dry_wet_mixer1_c1 = pma_mod<NV>;

template <int NV>
using dry_wet_mixer1_multimod = parameter::list<dry_wet_mixer1_c0<NV>, dry_wet_mixer1_c1<NV>>;

template <int NV>
using dry_wet_mixer1_t = control::xfader<dry_wet_mixer1_multimod<NV>, 
                                         faders::cosine_half>;

template <int NV>
using dry_path1_t = container::chain<parameter::empty, 
                                     wrap::fix<2, dry_wet_mixer1_t<NV>>, 
                                     core::gain<NV>>;

template <int NV> using dry_wet_mixer2_c0 = pma_mod<NV>;

template <int NV> using dry_wet_mixer2_c1 = pma_mod<NV>;

template <int NV>
using dry_wet_mixer2_multimod = parameter::list<dry_wet_mixer2_c0<NV>, dry_wet_mixer2_c1<NV>>;

template <int NV>
using dry_wet_mixer2_t = control::xfader<dry_wet_mixer2_multimod<NV>, 
                                         faders::cosine_half>;

template <int NV>
using dry_path2_t = container::chain<parameter::empty, 
                                     wrap::fix<2, dry_wet_mixer2_t<NV>>, 
                                     core::gain<NV>>;

template <int NV>
using tempo_sync_t = wrap::mod<parameter::plain<project::Delay2<NV>, 0>, 
                               control::tempo_sync<NV>>;
using stereo_cable = cable::block<2>;
using limiter_t = wrap::no_data<dynamics::limiter>;

template <int NV>
using fix32_block_t_ = container::chain<parameter::empty, 
                                        wrap::fix<2, routing::receive<stereo_cable>>, 
                                        project::Delay2<NV>, 
                                        limiter_t, 
                                        routing::send<stereo_cable>>;

template <int NV>
using fix32_block_t = wrap::fix_block<32, fix32_block_t_<NV>>;

template <int NV>
using chain1_t = container::chain<parameter::empty, 
                                  wrap::fix<2, tempo_sync_t<NV>>, 
                                  fix32_block_t<NV>>;

template <int NV>
using wet_path2_t = container::chain<parameter::empty, 
                                     wrap::fix<2, chain1_t<NV>>, 
                                     core::gain<NV>>;

namespace dry_wet3_t_parameters
{
}

template <int NV>
using dry_wet3_t = container::split<parameter::plain<Reverb_impl::dry_wet_mixer2_t<NV>, 0>, 
                                    wrap::fix<2, dry_path2_t<NV>>, 
                                    wet_path2_t<NV>>;

template <int NV>
using wet_path1_t = container::chain<parameter::empty, 
                                     wrap::fix<2, dry_wet3_t<NV>>, 
                                     project::FaustReverb<NV>, 
                                     pma_t<NV>, 
                                     core::gain<NV>, 
                                     core::gain<NV>>;

namespace dry_wet2_t_parameters
{
}

template <int NV>
using dry_wet2_t = container::split<parameter::plain<Reverb_impl::dry_wet_mixer1_t<NV>, 0>, 
                                    wrap::fix<2, dry_path1_t<NV>>, 
                                    wet_path1_t<NV>>;

namespace Reverb_t_parameters
{
// Parameter list for Reverb_impl::Reverb_t --------------------------------------------------------

DECLARE_PARAMETER_RANGE(ReverbTime_InputRange, 
                        0., 
                        16.);
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

template <int NV>
using Damping = parameter::plain<project::FaustReverb<NV>, 
                                 0>;
template <int NV>
using Diffusion = parameter::plain<project::FaustReverb<NV>, 
                                   1>;
template <int NV>
using HFGain = parameter::plain<project::FaustReverb<NV>, 
                                2>;
template <int NV>
using HighCrossover = parameter::plain<project::FaustReverb<NV>, 
                                       3>;
template <int NV>
using LFGain = parameter::plain<project::FaustReverb<NV>, 
                                4>;
template <int NV>
using LowCrossover = parameter::plain<project::FaustReverb<NV>, 
                                      5>;
template <int NV>
using MidGain = parameter::plain<project::FaustReverb<NV>, 
                                 6>;
template <int NV>
using ModDepth = parameter::plain<project::FaustReverb<NV>, 
                                  7>;
template <int NV>
using ModFrequency = parameter::plain<project::FaustReverb<NV>, 
                                      8>;
template <int NV>
using Size = parameter::plain<project::FaustReverb<NV>, 
                              10>;
template <int NV>
using Mix = parameter::plain<Reverb_impl::dry_wet2_t<NV>, 
                             0>;
template <int NV>
using preDelay = parameter::plain<Reverb_impl::tempo_sync_t<NV>, 
                                  3>;
using Feedback = parameter::plain<routing::receive<stereo_cable>, 
                                  0>;
template <int NV>
using Smoothing = parameter::plain<Reverb_impl::bipolar_t<NV>, 
                                   0>;
template <int NV>
using DelayMix = parameter::plain<Reverb_impl::dry_wet3_t<NV>, 
                                  0>;
template <int NV>
using Reverb_t_plist = parameter::list<Damping<NV>, 
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
                                       Mix<NV>, 
                                       preDelay<NV>, 
                                       Feedback, 
                                       Smoothing<NV>, 
                                       DelayMix<NV>>;
}

template <int NV>
using Reverb_t_ = container::chain<Reverb_t_parameters::Reverb_t_plist<NV>, 
                                   wrap::fix<2, fix8_block_t<NV>>, 
                                   dry_wet2_t<NV>>;

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
		SNEX_METADATA_ENCODED_PARAMETERS(274)
		{
			0x005B, 0x0000, 0x4400, 0x6D61, 0x6970, 0x676E, 0x0000, 0x0000, 
            0x0000, 0x8000, 0xB83F, 0x051E, 0x003F, 0x8000, 0x0A3F, 0x23D7, 
            0x5B3C, 0x0001, 0x0000, 0x6944, 0x6666, 0x7375, 0x6F69, 0x006E, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0xD70A, 0x3C23, 0x025B, 0x0000, 0x4800, 0x4746, 0x6961, 0x006E, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0xD70A, 0x3C23, 0x035B, 0x0000, 0x4800, 0x6769, 0x4368, 0x6F72, 
            0x7373, 0x766F, 0x7265, 0x0000, 0x7A00, 0x0044, 0x1C40, 0x0046, 
            0x14F0, 0x0045, 0x8000, 0x003F, 0x8000, 0x5B3F, 0x0004, 0x0000, 
            0x464C, 0x6147, 0x6E69, 0x0000, 0x0000, 0x0000, 0x8000, 0x003F, 
            0x8000, 0x003F, 0x8000, 0x0A3F, 0x23D7, 0x5B3C, 0x0005, 0x0000, 
            0x6F4C, 0x4377, 0x6F72, 0x7373, 0x766F, 0x7265, 0x0000, 0xC800, 
            0x0042, 0xBB80, 0x0045, 0x2350, 0x0045, 0x8000, 0x003F, 0x8000, 
            0x5B3F, 0x0006, 0x0000, 0x694D, 0x4764, 0x6961, 0x006E, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0xD70A, 
            0x3C23, 0x075B, 0x0000, 0x4D00, 0x646F, 0x6544, 0x7470, 0x0068, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0000, 0x3F80, 
            0xD70A, 0x3C23, 0x085B, 0x0000, 0x4D00, 0x646F, 0x7246, 0x7165, 
            0x6575, 0x636E, 0x0079, 0x0000, 0x0000, 0x0000, 0x4120, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0xD70A, 0x3C23, 0x095B, 0x0000, 0x5200, 
            0x7665, 0x7265, 0x5462, 0x6D69, 0x0065, 0x0000, 0x0000, 0x0000, 
            0x4180, 0xF8C5, 0x4036, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0A5B, 
            0x0000, 0x5300, 0x7A69, 0x0065, 0x0000, 0x3F00, 0x0000, 0x40A0, 
            0x5C29, 0x3FCF, 0x0000, 0x3F80, 0xD70A, 0x3C23, 0x0B5B, 0x0000, 
            0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 0x003F, 0x8000, 
            0x003F, 0x8000, 0x003F, 0x0000, 0x5B00, 0x000C, 0x0000, 0x7270, 
            0x4465, 0x6C65, 0x7961, 0x0000, 0x0000, 0x0000, 0xFA00, 0x9A44, 
            0x8849, 0x0044, 0x0000, 0xCD3F, 0xCCCC, 0x5B3D, 0x000D, 0x0000, 
            0x6546, 0x6465, 0x6162, 0x6B63, 0x0000, 0x0000, 0x0000, 0x8000, 
            0xB83F, 0x399B, 0x003F, 0x8000, 0x003F, 0x0000, 0x5B00, 0x000E, 
            0x0000, 0x6D53, 0x6F6F, 0x6874, 0x6E69, 0x0067, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x0F5B, 0x0000, 0x4400, 0x6C65, 0x7961, 0x694D, 0x0078, 0x0000, 
            0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 
            0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& fix8_block = this->getT(0);                                              // Reverb_impl::fix8_block_t<NV>
		auto& peak = this->getT(0).getT(0);                                            // Reverb_impl::peak_t<NV>
		auto& smoothed_parameter1 = this->getT(0).getT(1);                             // Reverb_impl::smoothed_parameter1_t<NV>
		auto& bipolar = this->getT(0).getT(2);                                         // Reverb_impl::bipolar_t<NV>
		auto& dry_wet2 = this->getT(1);                                                // Reverb_impl::dry_wet2_t<NV>
		auto& dry_path1 = this->getT(1).getT(0);                                       // Reverb_impl::dry_path1_t<NV>
		auto& dry_wet_mixer1 = this->getT(1).getT(0).getT(0);                          // Reverb_impl::dry_wet_mixer1_t<NV>
		auto& dry_gain1 = this->getT(1).getT(0).getT(1);                               // core::gain<NV>
		auto& wet_path1 = this->getT(1).getT(1);                                       // Reverb_impl::wet_path1_t<NV>
		auto& dry_wet3 = this->getT(1).getT(1).getT(0);                                // Reverb_impl::dry_wet3_t<NV>
		auto& dry_path2 = this->getT(1).getT(1).getT(0).getT(0);                       // Reverb_impl::dry_path2_t<NV>
		auto& dry_wet_mixer2 = this->getT(1).getT(1).getT(0).getT(0).getT(0);          // Reverb_impl::dry_wet_mixer2_t<NV>
		auto& dry_gain2 = this->getT(1).getT(1).getT(0).getT(0).getT(1);               // core::gain<NV>
		auto& wet_path2 = this->getT(1).getT(1).getT(0).getT(1);                       // Reverb_impl::wet_path2_t<NV>
		auto& chain1 = this->getT(1).getT(1).getT(0).getT(1).getT(0);                  // Reverb_impl::chain1_t<NV>
		auto& tempo_sync = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(0);      // Reverb_impl::tempo_sync_t<NV>
		auto& fix32_block = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1);     // Reverb_impl::fix32_block_t<NV>
		auto& receive = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1).getT(0); // routing::receive<stereo_cable>
		auto& faust2 = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1).getT(1);  // project::Delay2<NV>
		auto& limiter = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1).getT(2); // Reverb_impl::limiter_t
		auto& send = this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1).getT(3);    // routing::send<stereo_cable>
		auto& wet_gain2 = this->getT(1).getT(1).getT(0).getT(1).getT(1);               // core::gain<NV>
		auto& faust = this->getT(1).getT(1).getT(1);                                   // project::FaustReverb<NV>
		auto& pma = this->getT(1).getT(1).getT(2);                                     // Reverb_impl::pma_t<NV>
		auto& gain = this->getT(1).getT(1).getT(3);                                    // core::gain<NV>
		auto& wet_gain1 = this->getT(1).getT(1).getT(4);                               // core::gain<NV>
		
		// Parameter Connections -------------------------------------------------------------------
		
		dry_wet3.getParameterT(0).connectT(0, dry_wet_mixer2); // DryWet -> dry_wet_mixer2::Value
		dry_wet2.getParameterT(0).connectT(0, dry_wet_mixer1); // DryWet -> dry_wet_mixer1::Value
		this->getParameterT(0).connectT(0, faust);             // Damping -> faust::Damping
		
		this->getParameterT(1).connectT(0, faust); // Diffusion -> faust::Diffusion
		
		this->getParameterT(2).connectT(0, faust); // HFGain -> faust::HFGain
		
		this->getParameterT(3).connectT(0, faust); // HighCrossover -> faust::HighCrossover
		
		this->getParameterT(4).connectT(0, faust); // LFGain -> faust::LFGain
		
		this->getParameterT(5).connectT(0, faust); // LowCrossover -> faust::LowCrossover
		
		this->getParameterT(6).connectT(0, faust); // MidGain -> faust::MIDGain
		
		this->getParameterT(7).connectT(0, faust); // ModDepth -> faust::ModDepth
		
		this->getParameterT(8).connectT(0, faust); // ModFrequency -> faust::ModFrequency
		
		this->getParameterT(9).connectT(0, faust); // ReverbTime -> faust::ReverbTime
		
		this->getParameterT(10).connectT(0, faust); // Size -> faust::Size
		
		this->getParameterT(11).connectT(0, dry_wet2); // Mix -> dry_wet2::DryWet
		
		this->getParameterT(12).connectT(0, tempo_sync); // preDelay -> tempo_sync::UnsyncedTime
		
		this->getParameterT(13).connectT(0, receive); // Feedback -> receive::Feedback
		
		this->getParameterT(14).connectT(0, bipolar); // Smoothing -> bipolar::Value
		
		this->getParameterT(15).connectT(0, dry_wet3); // DelayMix -> dry_wet3::DryWet
		
		// Modulation Connections ------------------------------------------------------------------
		
		pma.getWrappedObject().getParameter().connectT(0, gain);    // pma -> gain::Gain
		smoothed_parameter1.getParameter().connectT(0, pma);        // smoothed_parameter1 -> pma::Value
		peak.getParameter().connectT(0, smoothed_parameter1);       // peak -> smoothed_parameter1::Value
		bipolar.getWrappedObject().getParameter().connectT(0, pma); // bipolar -> pma::Multiply
		auto& dry_wet_mixer1_p = dry_wet_mixer1.getWrappedObject().getParameter();
		dry_wet_mixer1_p.getParameterT(0).connectT(0, dry_gain1); // dry_wet_mixer1 -> dry_gain1::Gain
		dry_wet_mixer1_p.getParameterT(1).connectT(0, wet_gain1); // dry_wet_mixer1 -> wet_gain1::Gain
		auto& dry_wet_mixer2_p = dry_wet_mixer2.getWrappedObject().getParameter();
		dry_wet_mixer2_p.getParameterT(0).connectT(0, dry_gain2); // dry_wet_mixer2 -> dry_gain2::Gain
		dry_wet_mixer2_p.getParameterT(1).connectT(0, wet_gain2); // dry_wet_mixer2 -> wet_gain2::Gain
		tempo_sync.getParameter().connectT(0, faust2);            // tempo_sync -> faust2::delay
		
		// Send Connections ------------------------------------------------------------------------
		
		send.connect(receive);
		
		// Default Values --------------------------------------------------------------------------
		
		;                                           // smoothed_parameter1::Value is automated
		smoothed_parameter1.setParameterT(1, 84.7); // control::smoothed_parameter::SmoothingTime
		smoothed_parameter1.setParameterT(2, 1.);   // control::smoothed_parameter::Enabled
		
		;                                   // bipolar::Value is automated
		bipolar.setParameterT(1, -1.);      // control::bipolar::Scale
		bipolar.setParameterT(2, 0.531143); // control::bipolar::Gamma
		
		; // dry_wet2::DryWet is automated
		
		; // dry_wet_mixer1::Value is automated
		
		;                                // dry_gain1::Gain is automated
		dry_gain1.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain1.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // dry_wet3::DryWet is automated
		
		; // dry_wet_mixer2::Value is automated
		
		;                                // dry_gain2::Gain is automated
		dry_gain2.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain2.setParameterT(2, 0.);  // core::gain::ResetValue
		
		tempo_sync.setParameterT(0, 0.); // control::tempo_sync::Tempo
		tempo_sync.setParameterT(1, 1.); // control::tempo_sync::Multiplier
		tempo_sync.setParameterT(2, 0.); // control::tempo_sync::Enabled
		;                                // tempo_sync::UnsyncedTime is automated
		
		; // receive::Feedback is automated
		
		;                              // faust2::delay is automated
		faust2.setParameterT(1, 0.);   // core::faust::feedback
		faust2.setParameterT(2, 29.5); // core::faust::interpolation
		
		limiter.setParameterT(0, 0.);  // dynamics::limiter::Threshhold
		limiter.setParameterT(1, 50.); // dynamics::limiter::Attack
		limiter.setParameterT(2, 50.); // dynamics::limiter::Release
		limiter.setParameterT(3, 1.);  // dynamics::limiter::Ratio
		limiter.setParameterT(4, 0.);  // dynamics::limiter::Sidechain
		
		;                                // wet_gain2::Gain is automated
		wet_gain2.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain2.setParameterT(2, 0.);  // core::gain::ResetValue
		
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
		
		;                         // pma::Value is automated
		;                         // pma::Multiply is automated
		pma.setParameterT(2, 1.); // control::pma::Add
		
		;                            // gain::Gain is automated
		gain.setParameterT(1, 10.3); // core::gain::Smoothing
		gain.setParameterT(2, 0.);   // core::gain::ResetValue
		
		;                                // wet_gain1::Gain is automated
		wet_gain1.setParameterT(1, 20.); // core::gain::Smoothing
		wet_gain1.setParameterT(2, 0.);  // core::gain::ResetValue
		
		this->setParameterT(0, 0.52);
		this->setParameterT(1, 1);
		this->setParameterT(2, 1);
		this->setParameterT(3, 2383.);
		this->setParameterT(4, 1);
		this->setParameterT(5, 2613.);
		this->setParameterT(6, 1);
		this->setParameterT(7, 0.);
		this->setParameterT(8, 0.);
		this->setParameterT(9, 2.85893);
		this->setParameterT(10, 1.62);
		this->setParameterT(11, 1.);
		this->setParameterT(12, 1090.3);
		this->setParameterT(13, 0.725032);
		this->setParameterT(14, 0.);
		this->setParameterT(15, 1.);
		this->setExternalData({}, -1);
	}
	~instance() override
	{
		// Cleanup external data references --------------------------------------------------------
		
		this->setExternalData({}, -1);
	}
	
	static constexpr bool isPolyphonic() { return NV > 1; };
	
	static constexpr bool isProcessingHiseEvent() { return true; };
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------------------------------
		
		this->getT(0).getT(0).setExternalData(b, index);                                         // Reverb_impl::peak_t<NV>
		this->getT(1).getT(1).getT(0).getT(1).getT(0).getT(1).getT(2).setExternalData(b, index); // Reverb_impl::limiter_t
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
using Reverb = wrap::node<Reverb_impl::instance<NV>>;
}


