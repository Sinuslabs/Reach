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
// =================| Node & Parameter type declarations |=================

template <int NV>
using Reverb_t_ = container::chain<parameter::empty, 
                                   wrap::fix<2, project::FaustReverb<NV>>>;

// =====================| Root node initialiser class |=====================

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
		SNEX_METADATA_ENCODED_PARAMETERS(2)
		{
			0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References ------------------------------------------------
		
		auto& faust = this->getT(0); // project::FaustReverb<NV>
		
		// Default Values -------------------------------------------------
		
		faust.setParameterT(0, 0.); // core::faust::Damping
		faust.setParameterT(1, 0.); // core::faust::Diffusion
		faust.setParameterT(2, 1.); // core::faust::HFGain
		faust.setParameterT(3, 1.); // core::faust::LFGain
		faust.setParameterT(4, 0.); // core::faust::ModDepth
		faust.setParameterT(5, 0.); // core::faust::ModFrequency
		faust.setParameterT(6, 0.); // core::faust::ReverbTime
		faust.setParameterT(7, 0.); // core::faust::Size
		
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
// ==========================| Public Definition |==========================

namespace project
{
// polyphonic template declaration

template <int NV>
using Reverb = wrap::node<Reverb_impl::instance<NV>>;
}


