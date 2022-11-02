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
// ==================| Node & Parameter type declarations |==================

namespace Flair_t_parameters
{
// Parameter list for Flair_impl::Flair_t ----------------------------------

using Mix = parameter::chain<ranges::Identity, 
                             parameter::plain<jdsp::jchorus, 4>, 
                             parameter::plain<jdsp::jchorus, 4>>;

using Depth = parameter::chain<ranges::Identity, 
                               parameter::plain<jdsp::jchorus, 1>, 
                               parameter::plain<jdsp::jchorus, 1>>;

using Flair_t_plist = parameter::list<Mix, Depth>;
}

using Flair_t_ = container::chain<Flair_t_parameters::Flair_t_plist, 
                                  wrap::fix<2, jdsp::jchorus>, 
                                  jdsp::jchorus>;

// =====================| Root node initialiser class |=====================

struct instance: public Flair_impl::Flair_t_
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
		SNEX_METADATA_ENCODED_PARAMETERS(32)
		{
			0x005B, 0x0000, 0x4D00, 0x7869, 0x0000, 0x0000, 0x0000, 0x8000, 
            0x003F, 0x0000, 0x0000, 0x8000, 0x003F, 0x0000, 0x5B00, 0x0001, 
            0x0000, 0x6544, 0x7470, 0x0068, 0x0000, 0x0000, 0x0000, 0x3F80, 
            0xA5DB, 0x3E1B, 0x0000, 0x3F80, 0x0000, 0x0000, 0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------
		
		auto& jchorus1 = this->getT(0); // jdsp::jchorus
		auto& jchorus = this->getT(1);  // jdsp::jchorus
		
		// Parameter Connections -------------------------------------------
		
		auto& Mix_p = this->getParameterT(0);
		Mix_p.connectT(0, jchorus1); // Mix -> jchorus1::Mix
		Mix_p.connectT(1, jchorus);  // Mix -> jchorus::Mix
		
		auto& Depth_p = this->getParameterT(1);
		Depth_p.connectT(0, jchorus);  // Depth -> jchorus::Depth
		Depth_p.connectT(1, jchorus1); // Depth -> jchorus1::Depth
		
		// Default Values --------------------------------------------------
		
		jchorus1.setParameterT(0, 57.4);     // jdsp::jchorus::CentreDelay
		;                                    // jchorus1::Depth is automated
		jchorus1.setParameterT(2, 0.149333); // jdsp::jchorus::Feedback
		jchorus1.setParameterT(3, 0.138913); // jdsp::jchorus::Rate
		;                                    // jchorus1::Mix is automated
		
		jchorus.setParameterT(0, 7.);       // jdsp::jchorus::CentreDelay
		;                                   // jchorus::Depth is automated
		jchorus.setParameterT(2, 0.437334); // jdsp::jchorus::Feedback
		jchorus.setParameterT(3, 1.);       // jdsp::jchorus::Rate
		;                                   // jchorus::Mix is automated
		
		this->setParameterT(0, 0.);
		this->setParameterT(1, 0.152);
	}
	
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
using Flair = wrap::node<Flair_impl::instance>;
}


