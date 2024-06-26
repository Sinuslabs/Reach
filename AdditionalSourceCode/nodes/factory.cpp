/** Autogenerated Main.cpp. */

// ================================| Include only the DSP files  |================================

#include <AppConfig.h>
#include <hi_dsp_library/hi_dsp_library.h>
#include <hi_faust/hi_faust.h>
#include "includes.h"
// ==========================| Now we can add the rest of the codebase |==========================

#include <JuceHeader.h>

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wreturn-type-c-linkage"

// ======================================| Project Factory |======================================

namespace project
{

struct Factory: public scriptnode::dll::StaticLibraryHostFactory
{
	Factory()
	{
		TempoSyncer::initTempoData();
		// Node registrations -------------------------------------------------------------------
		
		registerPolyNode<project::Flanger<1>, project::Flanger<NUM_POLYPHONIC_VOICES>>();
		registerPolyNode<project::FaustReverb<1>, project::FaustReverb<NUM_POLYPHONIC_VOICES>>();
		registerPolyNode<project::Distortion<1>, project::Distortion<NUM_POLYPHONIC_VOICES>>();
		registerPolyNode<project::Delay2<1>, project::Delay2<NUM_POLYPHONIC_VOICES>>();
		registerPolyNode<project::Chorus2<1>, wrap::illegal_poly<project::Chorus2<1>>>();
		registerPolyNode<project::Degrade<1>, wrap::illegal_poly<project::Degrade<1>>>();
		registerPolyNode<project::Flair<1>, wrap::illegal_poly<project::Flair<1>>>();
		registerPolyNode<project::Reverb<1>, wrap::illegal_poly<project::Reverb<1>>>();
		registerPolyNode<project::Waveshaper<1>, wrap::illegal_poly<project::Waveshaper<1>>>();
		registerDataNode<project::ReverbParameters_networkdata>();
		registerDataNode<project::test_networkdata>();
	}
};
}

scriptnode::dll::FactoryBase* scriptnode::DspNetwork::createStaticFactory()
{
	return new project::Factory();
}

#pragma clang diagnostic pop


