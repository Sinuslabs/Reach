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

namespace Analyser_impl
{
// ==================| Node & Parameter type declarations |==================

using fft_t = wrap::data<analyse::fft, 
                         data::external::displaybuffer<0>>;

using Analyser_t_ = container::chain<parameter::empty, wrap::fix<2, fft_t>>;

// =====================| Root node initialiser class |=====================

struct instance: public Analyser_impl::Analyser_t_
{
	
	struct metadata
	{
		static const int NumTables = 0;
		static const int NumSliderPacks = 0;
		static const int NumAudioFiles = 0;
		static const int NumFilters = 0;
		static const int NumDisplayBuffers = 1;
		
		SNEX_METADATA_ID(Analyser);
		SNEX_METADATA_NUM_CHANNELS(2);
		SNEX_METADATA_ENCODED_PARAMETERS(2)
		{
			0x0000, 0x0000
		};
	};
	
	instance()
	{
		// Node References -------------------------------------------------
		
		auto& fft = this->getT(0); // Analyser_impl::fft_t
		
		// Default Values --------------------------------------------------
		
		this->setExternalData({}, -1);
	}
	~instance() override
	{
		// Cleanup external data references --------------------------------
		
		this->setExternalData({}, -1);
	}
	
	static constexpr bool hasTail() { return true; };
	
	static constexpr bool isSuspendedOnSilence() { return false; };
	
	void setExternalData(const ExternalData& b, int index)
	{
		// External Data Connections ---------------------------------------
		
		this->getT(0).setExternalData(b, index); // Analyser_impl::fft_t
	}
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
using Analyser = wrap::node<Analyser_impl::instance>;
}


