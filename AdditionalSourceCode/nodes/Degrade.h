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
using converter1_t = control::converter<parameter::plain<core::gain<NV>, 0>, 
                                        conversion_logic::gain2db>;
template <int NV>
using smoothed_parameter_t = wrap::mod<parameter::plain<converter1_t<NV>, 0>, 
                                       control::smoothed_parameter<NV, smoothers::linear_ramp<NV>>>;

struct cable_table_t_data
{
	span<float, 512> data =
	{
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.f, 0.f, 0.f, 0.f,
		0.f, 0.f, 0.0638292f, 0.192491f, 0.321153f, 0.449814f,
		0.578476f, 0.707138f, 0.835803f, 0.899082f, 0.899486f, 0.89989f,
		0.900293f, 0.900697f, 0.901101f, 0.901504f, 0.901908f, 0.902312f,
		0.902715f, 0.903119f, 0.903523f, 0.903926f, 0.90433f, 0.904734f,
		0.905137f, 0.905541f, 0.905945f, 0.906348f, 0.906752f, 0.907156f,
		0.907559f, 0.907963f, 0.908367f, 0.90877f, 0.909174f, 0.909578f,
		0.909981f, 0.910385f, 0.910789f, 0.911192f, 0.911596f, 0.912f,
		0.912403f, 0.912807f, 0.913211f, 0.913614f, 0.914018f, 0.914422f,
		0.914825f, 0.915229f, 0.915633f, 0.916036f, 0.91644f, 0.916844f,
		0.917247f, 0.917651f, 0.918055f, 0.918458f, 0.918862f, 0.919266f,
		0.919669f, 0.920073f, 0.920477f, 0.92088f, 0.921284f, 0.921688f,
		0.922091f, 0.922495f, 0.922899f, 0.923302f, 0.923706f, 0.92411f,
		0.924514f, 0.924917f, 0.925321f, 0.925725f, 0.926128f, 0.926532f,
		0.926935f, 0.927339f, 0.927743f, 0.928147f, 0.92855f, 0.928954f,
		0.929358f, 0.929761f, 0.930165f, 0.930569f, 0.930972f, 0.931376f,
		0.93178f, 0.932183f, 0.932587f, 0.932991f, 0.933394f, 0.933798f,
		0.934202f, 0.934605f, 0.935009f, 0.935413f, 0.935816f, 0.93622f,
		0.936624f, 0.937027f, 0.937431f, 0.937835f, 0.938238f, 0.938642f,
		0.939046f, 0.939449f, 0.939853f, 0.940257f, 0.94066f, 0.941064f,
		0.941468f, 0.941871f, 0.942275f, 0.942679f, 0.943082f, 0.943486f,
		0.94389f, 0.944293f, 0.944697f, 0.945101f, 0.945504f, 0.945908f,
		0.946312f, 0.946715f, 0.947119f, 0.947523f, 0.947926f, 0.94833f,
		0.948734f, 0.949137f, 0.949541f, 0.949945f, 0.950348f, 0.950752f,
		0.951156f, 0.951559f, 0.951963f, 0.952367f, 0.95277f, 0.953174f,
		0.953578f, 0.953982f, 0.954385f, 0.954789f, 0.955193f, 0.955596f,
		0.956f, 0.956403f, 0.956807f, 0.957211f, 0.957615f, 0.958018f,
		0.958422f, 0.958826f, 0.959229f, 0.959633f, 0.960037f, 0.96044f,
		0.960844f, 0.961248f, 0.961651f, 0.962055f, 0.962459f, 0.962862f,
		0.963266f, 0.96367f, 0.964073f, 0.964477f, 0.964881f, 0.965284f,
		0.965688f, 0.966092f, 0.966495f, 0.966899f, 0.967303f, 0.967706f,
		0.96811f, 0.968514f, 0.968917f, 0.969321f, 0.969725f, 0.970128f,
		0.970532f, 0.970936f, 0.971339f, 0.971743f, 0.972147f, 0.97255f,
		0.972954f, 0.973358f, 0.973761f, 0.974165f, 0.974569f, 0.974972f,
		0.975376f, 0.97578f, 0.976183f, 0.976587f, 0.976991f, 0.977394f,
		0.977798f, 0.978202f, 0.978605f, 0.979009f, 0.979413f, 0.979816f,
		0.98022f, 0.980624f, 0.981027f, 0.981431f, 0.981835f, 0.982238f,
		0.982642f, 0.983046f, 0.983449f, 0.983853f, 0.984257f, 0.984661f,
		0.985064f, 0.985468f, 0.985871f, 0.986275f, 0.986679f, 0.987083f,
		0.987486f, 0.98789f, 0.988294f, 0.988697f, 0.989101f, 0.989505f,
		0.989908f, 0.990312f, 0.990716f, 0.991119f, 0.991523f, 0.991927f,
		0.99233f, 0.992734f, 0.993138f, 0.993541f, 0.993945f, 0.994349f,
		0.994752f, 0.995156f, 0.99556f, 0.995963f, 0.996367f, 0.996771f,
		0.997174f, 0.997578f, 0.997982f, 0.998385f, 0.998789f, 0.999193f,
		0.999596f, 1.f
	};
};

template <int NV>
using cable_table_t = wrap::data<control::cable_table<parameter::plain<smoothed_parameter_t<NV>, 0>>, 
                                 data::embedded::table<cable_table_t_data>>;
template <int NV>
using pma_t = control::pma<NV, 
                           parameter::plain<cable_table_t<NV>, 0>>;
template <int NV>
using envelope_follower_t = wrap::mod<parameter::plain<pma_t<NV>, 0>, 
                                      wrap::no_data<dynamics::envelope_follower>>;

template <int NV>
using chain_t = container::chain<parameter::empty, 
                                 wrap::fix<2, envelope_follower_t<NV>>, 
                                 pma_t<NV>, 
                                 cable_table_t<NV>, 
                                 smoothed_parameter_t<NV>, 
                                 converter1_t<NV>, 
                                 fx::bitcrush<NV>, 
                                 core::gain<NV>>;
template <int NV>
using branch_t = container::branch<parameter::empty, 
                                   wrap::fix<2, fx::sampleandhold<NV>>, 
                                   chain_t<NV>>;

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
            0x7470, 0x0068, 0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x0000, 
            0x0000, 0x3F80, 0x0000, 0x0000, 0x055B, 0x0000, 0x4D00, 0x646F, 
            0x6C75, 0x7461, 0x6F69, 0x536E, 0x6570, 0x6465, 0x0000, 0x0000, 
            0x0000, 0xF000, 0x3D41, 0xD70A, 0x1A3E, 0x6B6C, 0x0A3E, 0x23D7, 
            0x5B3C, 0x0006, 0x0000, 0x6D41, 0x756F, 0x746E, 0x0000, 0x8000, 
            0x003F, 0xC600, 0x3C42, 0xB8A5, 0x0041, 0x8000, 0x003F, 0x0000, 
            0x5B00, 0x0007, 0x0000, 0x7243, 0x7375, 0x4D68, 0x646F, 0x0065, 
            0x0000, 0x0000, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 
            0x0000, 0x3F80, 0x085B, 0x0000, 0x4200, 0x7469, 0x6544, 0x7470, 
            0x0068, 0x0000, 0x4080, 0x0000, 0x4180, 0x17F6, 0x410D, 0x0000, 
            0x3F80, 0x0000, 0x0000, 0x095B, 0x0000, 0x4200, 0x7469, 0x7263, 
            0x7375, 0x4D68, 0x646F, 0x0065, 0x0000, 0x0000, 0x0000, 0x3F80, 
            0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x3F80, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------------------------------
		
		auto& dry_wet1 = this->getT(0);                                           // Degrade_impl::dry_wet1_t<NV>
		auto& dry_path = this->getT(0).getT(0);                                   // Degrade_impl::dry_path_t<NV>
		auto& dry_wet_mixer = this->getT(0).getT(0).getT(0);                      // Degrade_impl::dry_wet_mixer_t<NV>
		auto& dry_gain = this->getT(0).getT(0).getT(1);                           // core::gain<NV>
		auto& wet_path = this->getT(0).getT(1);                                   // Degrade_impl::wet_path_t<NV>
		auto& branch = this->getT(0).getT(1).getT(0);                             // Degrade_impl::branch_t<NV>
		auto& sampleandhold = this->getT(0).getT(1).getT(0).getT(0);              // fx::sampleandhold<NV>
		auto& chain = this->getT(0).getT(1).getT(0).getT(1);                      // Degrade_impl::chain_t<NV>
		auto& envelope_follower = this->getT(0).getT(1).getT(0).getT(1).getT(0);  // Degrade_impl::envelope_follower_t<NV>
		auto& pma = this->getT(0).getT(1).getT(0).getT(1).getT(1);                // Degrade_impl::pma_t<NV>
		auto& cable_table = this->getT(0).getT(1).getT(0).getT(1).getT(2);        // Degrade_impl::cable_table_t<NV>
		auto& smoothed_parameter = this->getT(0).getT(1).getT(0).getT(1).getT(3); // Degrade_impl::smoothed_parameter_t<NV>
		auto& converter1 = this->getT(0).getT(1).getT(0).getT(1).getT(4);         // Degrade_impl::converter1_t<NV>
		auto& bitcrush = this->getT(0).getT(1).getT(0).getT(1).getT(5);           // fx::bitcrush<NV>
		auto& gain = this->getT(0).getT(1).getT(0).getT(1).getT(6);               // core::gain<NV>
		auto& one_pole = this->getT(0).getT(1).getT(1);                           // filters::one_pole<NV>
		auto& one_pole1 = this->getT(0).getT(1).getT(2);                          // filters::one_pole<NV>
		auto& wet_gain = this->getT(0).getT(1).getT(3);                           // core::gain<NV>
		auto& modchain = this->getT(0).getT(2);                                   // Degrade_impl::modchain_t<NV>
		auto& converter = this->getT(0).getT(2).getT(0);                          // Degrade_impl::converter_t<NV>
		auto& ramp = this->getT(0).getT(2).getT(1);                               // Degrade_impl::ramp_t<NV>
		auto& pi = this->getT(0).getT(2).getT(2);                                 // math::pi<NV>
		auto& sin = this->getT(0).getT(2).getT(3);                                // math::sin<NV>
		auto& mul = this->getT(0).getT(2).getT(4);                                // math::mul<NV>
		auto& sig2mod = this->getT(0).getT(2).getT(5);                            // math::sig2mod<NV>
		auto& peak = this->getT(0).getT(2).getT(6);                               // Degrade_impl::peak_t<NV>
		auto& crush = this->getT(0).getT(2).getT(7);                              // Degrade_impl::crush_t<NV>
		auto& samplehold = this->getT(0).getT(2).getT(8);                         // Degrade_impl::samplehold_t<NV>
		
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
		dry_wet_mixer_p.getParameterT(0).connectT(0, dry_gain);                        // dry_wet_mixer -> dry_gain::Gain
		dry_wet_mixer_p.getParameterT(1).connectT(0, wet_gain);                        // dry_wet_mixer -> wet_gain::Gain
		converter1.getWrappedObject().getParameter().connectT(0, gain);                // converter1 -> gain::Gain
		smoothed_parameter.getParameter().connectT(0, converter1);                     // smoothed_parameter -> converter1::Value
		cable_table.getWrappedObject().getParameter().connectT(0, smoothed_parameter); // cable_table -> smoothed_parameter::Value
		pma.getWrappedObject().getParameter().connectT(0, cable_table);                // pma -> cable_table::Value
		envelope_follower.getParameter().connectT(0, pma);                             // envelope_follower -> pma::Value
		converter.getWrappedObject().getParameter().connectT(0, ramp);                 // converter -> ramp::PeriodTime
		crush.getWrappedObject().getParameter().connectT(0, bitcrush);                 // crush -> bitcrush::BitDepth
		samplehold.getWrappedObject().getParameter().connectT(0, sampleandhold);       // samplehold -> sampleandhold::Counter
		peak.getParameter().connectT(0, crush);                                        // peak -> crush::Value
		peak.getParameter().connectT(1, samplehold);                                   // peak -> samplehold::Value
		
		// Default Values --------------------------------------------------------------------------
		
		; // dry_wet1::DryWet is automated
		
		; // dry_wet_mixer::Value is automated
		
		;                               // dry_gain::Gain is automated
		dry_gain.setParameterT(1, 20.); // core::gain::Smoothing
		dry_gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
		; // branch::Index is automated
		
		; // sampleandhold::Counter is automated
		
		envelope_follower.setParameterT(0, 0.);    // dynamics::envelope_follower::Attack
		envelope_follower.setParameterT(1, 525.7); // dynamics::envelope_follower::Release
		envelope_follower.setParameterT(2, 0.);    // dynamics::envelope_follower::ProcessSignal
		
		;                               // pma::Value is automated
		pma.setParameterT(1, 7.43797);  // control::pma::Multiply
		pma.setParameterT(2, 0.448394); // control::pma::Add
		
		; // cable_table::Value is automated
		
		;                                         // smoothed_parameter::Value is automated
		smoothed_parameter.setParameterT(1, 0.1); // control::smoothed_parameter::SmoothingTime
		smoothed_parameter.setParameterT(2, 1.);  // control::smoothed_parameter::Enabled
		
		; // converter1::Value is automated
		
		; // bitcrush::BitDepth is automated
		; // bitcrush::Mode is automated
		
		;                           // gain::Gain is automated
		gain.setParameterT(1, 20.); // core::gain::Smoothing
		gain.setParameterT(2, 0.);  // core::gain::ResetValue
		
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
		this->setParameterT(4, 0.);
		this->setParameterT(5, 0.42);
		this->setParameterT(6, 23.0807);
		this->setParameterT(7, 1.);
		this->setParameterT(8, 8.81835);
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
		
		this->getT(0).getT(1).getT(0).getT(1).getT(0).setExternalData(b, index); // Degrade_impl::envelope_follower_t<NV>
		this->getT(0).getT(1).getT(0).getT(1).getT(2).setExternalData(b, index); // Degrade_impl::cable_table_t<NV>
		this->getT(0).getT(2).getT(1).setExternalData(b, index);                 // Degrade_impl::ramp_t<NV>
		this->getT(0).getT(2).getT(6).setExternalData(b, index);                 // Degrade_impl::peak_t<NV>
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


