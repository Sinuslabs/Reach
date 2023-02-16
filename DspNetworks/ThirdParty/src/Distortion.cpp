/* ------------------------------------------------------------
author: "Oskar Schachtschneider Sinuslabs"
name: "fuzz -- a simple distortion effect"
version: "1.0"
Code generated with Faust 2.50.6 (https://faust.grame.fr)
Compilation options: -lang cpp -rui -cn _Distortion -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0
------------------------------------------------------------ */

#ifndef  ___Distortion_H__
#define  ___Distortion_H__

#ifndef FAUSTFLOAT
#define FAUSTFLOAT float
#endif 

#include <algorithm>
#include <cmath>
#include <cstdint>

#ifndef FAUSTCLASS 
#define FAUSTCLASS _Distortion
#endif

#ifdef __APPLE__ 
#define exp10f __exp10f
#define exp10 __exp10
#endif

#if defined(_WIN32)
#define RESTRICT __restrict
#else
#define RESTRICT __restrict__
#endif

static float _Distortion_faustpower2_f(float value) {
	return value * value;
}

class _Distortion final : public ::faust::dsp {
	
 public:
	
	FAUSTFLOAT fHslider0;
	FAUSTFLOAT fHslider1;
	int fSampleRate;
	
 public:
	
	void metadata(Meta* m) { 
		m->declare("author", "Oskar Schachtschneider Sinuslabs");
		m->declare("compile_options", "-lang cpp -rui -cn _Distortion -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0");
		m->declare("filename", "Distortion.dsp");
		m->declare("math.lib/author", "GRAME");
		m->declare("math.lib/copyright", "GRAME");
		m->declare("math.lib/deprecated", "This library is deprecated and is not maintained anymore. It will be removed in August 2017.");
		m->declare("math.lib/license", "LGPL with exception");
		m->declare("math.lib/name", "Math Library");
		m->declare("math.lib/version", "1.0");
		m->declare("music.lib/author", "GRAME");
		m->declare("music.lib/copyright", "GRAME");
		m->declare("music.lib/deprecated", "This library is deprecated and is not maintained anymore. It will be removed in August 2017.");
		m->declare("music.lib/license", "LGPL with exception");
		m->declare("music.lib/name", "Music Library");
		m->declare("music.lib/version", "1.0");
		m->declare("name", "fuzz -- a simple distortion effect");
		m->declare("version", "1.0");
	}

	static constexpr int getStaticNumInputs() {
		return 2;
	}
	static constexpr int getStaticNumOutputs() {
		return 2;
	}
	int getNumInputs() {
		return 2;
	}
	int getNumOutputs() {
		return 2;
	}
	
	static void classInit(int sample_rate) {
	}
	
	void instanceConstants(int sample_rate) {
		fSampleRate = sample_rate;
	}
	
	void instanceResetUserInterface() {
		fHslider0 = FAUSTFLOAT(12.0f);
		fHslider1 = FAUSTFLOAT(2.0f);
	}
	
	void instanceClear() {
	}
	
	void init(int sample_rate) {
		classInit(sample_rate);
		instanceInit(sample_rate);
	}
	void instanceInit(int sample_rate) {
		instanceConstants(sample_rate);
		instanceResetUserInterface();
		instanceClear();
	}
	
	_Distortion* clone() {
		return new _Distortion();
	}
	
	int getSampleRate() {
		return fSampleRate;
	}
	
	void buildUserInterface(UI* ui_interface) {
		ui_interface->openVerticalBox("dist");
		ui_interface->addHorizontalSlider("distortion", &fHslider0, FAUSTFLOAT(12.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1e+02f), FAUSTFLOAT(0.1f));
		ui_interface->addHorizontalSlider("gain", &fHslider1, FAUSTFLOAT(2.0f), FAUSTFLOAT(-96.0f), FAUSTFLOAT(3.0f), FAUSTFLOAT(0.1f));
		ui_interface->closeBox();
	}
	
	void compute(int count, FAUSTFLOAT** RESTRICT inputs, FAUSTFLOAT** RESTRICT outputs) {
		FAUSTFLOAT* input0 = inputs[0];
		FAUSTFLOAT* input1 = inputs[1];
		FAUSTFLOAT* output0 = outputs[0];
		FAUSTFLOAT* output1 = outputs[1];
		float fSlow0 = std::max<float>(0.0f, std::min<float>(1e+02f, float(fHslider0)));
		float fSlow1 = std::pow(1e+01f, 0.05f * fSlow0);
		float fSlow2 = fSlow1 + -1.0f;
		float fSlow3 = std::pow(1e+01f, 0.05f * std::max<float>(-96.0f, std::min<float>(3.0f, float(fHslider1)))) / std::sqrt(fSlow0 + 1.0f);
		for (int i0 = 0; i0 < count; i0 = i0 + 1) {
			float fTemp0 = float(input0[i0]);
			float fTemp1 = std::fabs(fTemp0);
			output0[i0] = FAUSTFLOAT(fSlow3 * (fTemp0 * (fSlow1 + fTemp1) / (_Distortion_faustpower2_f(fTemp0) + fSlow2 * fTemp1 + 1.0f)));
			float fTemp2 = float(input1[i0]);
			float fTemp3 = std::fabs(fTemp2);
			output1[i0] = FAUSTFLOAT(fSlow3 * (fTemp2 * (fSlow1 + fTemp3) / (_Distortion_faustpower2_f(fTemp2) + fSlow2 * fTemp3 + 1.0f)));
		}
	}

};

#ifdef FAUST_UIMACROS
	
	#define FAUST_FILE_NAME "Distortion.dsp"
	#define FAUST_CLASS_NAME "_Distortion"
	#define FAUST_COMPILATION_OPIONS "-lang cpp -rui -cn _Distortion -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0"
	#define FAUST_INPUTS 2
	#define FAUST_OUTPUTS 2
	#define FAUST_ACTIVES 2
	#define FAUST_PASSIVES 0

	FAUST_ADDHORIZONTALSLIDER("dist/distortion", fHslider0, 12.0f, 0.0f, 1e+02f, 0.1f);
	FAUST_ADDHORIZONTALSLIDER("dist/gain", fHslider1, 2.0f, -96.0f, 3.0f, 0.1f);

	#define FAUST_LIST_ACTIVES(p) \
		p(HORIZONTALSLIDER, distortion, "dist/distortion", fHslider0, 12.0f, 0.0f, 1e+02f, 0.1f) \
		p(HORIZONTALSLIDER, gain, "dist/gain", fHslider1, 2.0f, -96.0f, 3.0f, 0.1f) \

	#define FAUST_LIST_PASSIVES(p) \

#endif

#endif
