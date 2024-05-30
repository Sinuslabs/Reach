/* ------------------------------------------------------------
author: "Yann Orlarey"
copyright: "Grame"
license: "STK-4.3"
name: "smoothDelay"
version: "1.0"
Code generated with Faust 2.69.3 (https://faust.grame.fr)
Compilation options: -lang cpp -rui -nvi -ct 1 -cn _Delay2 -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0
------------------------------------------------------------ */

#ifndef  ___Delay2_H__
#define  ___Delay2_H__

#ifndef FAUSTFLOAT
#define FAUSTFLOAT float
#endif 

#include <algorithm>
#include <cmath>
#include <cstdint>
#include <math.h>

#ifndef FAUSTCLASS 
#define FAUSTCLASS _Delay2
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


class _Delay2 final : public ::faust::dsp {
	
 public:
	
	FAUSTFLOAT fHslider0;
	int IOTA0;
	float fVec0[1048576];
	int fSampleRate;
	float fConst1;
	FAUSTFLOAT fHslider1;
	float fConst2;
	FAUSTFLOAT fHslider2;
	float fRec1[2];
	float fRec2[2];
	float fRec3[2];
	float fRec4[2];
	float fRec0[2];
	float fVec1[1048576];
	float fRec5[2];
	
 public:
	_Delay2() {}

	void metadata(Meta* m) { 
		m->declare("author", "Yann Orlarey");
		m->declare("basics.lib/name", "Faust Basic Element Library");
		m->declare("basics.lib/tabulateNd", "Copyright (C) 2023 Bart Brouns <bart@magnetophon.nl>");
		m->declare("basics.lib/version", "1.11.1");
		m->declare("compile_options", "-lang cpp -rui -nvi -ct 1 -cn _Delay2 -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0");
		m->declare("copyright", "Grame");
		m->declare("delays.lib/name", "Faust Delay Library");
		m->declare("delays.lib/version", "1.1.0");
		m->declare("filename", "Delay2.dsp");
		m->declare("license", "STK-4.3");
		m->declare("maths.lib/author", "GRAME");
		m->declare("maths.lib/copyright", "GRAME");
		m->declare("maths.lib/license", "LGPL with exception");
		m->declare("maths.lib/name", "Faust Math Library");
		m->declare("maths.lib/version", "2.7.0");
		m->declare("name", "smoothDelay");
		m->declare("platform.lib/name", "Generic Platform Library");
		m->declare("platform.lib/version", "1.3.0");
		m->declare("signals.lib/name", "Faust Signal Routing Library");
		m->declare("signals.lib/version", "1.5.0");
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
		float fConst0 = std::min<float>(1.92e+05f, std::max<float>(1.0f, float(fSampleRate)));
		fConst1 = 0.001f * fConst0;
		fConst2 = 1e+03f / fConst0;
	}
	
	void instanceResetUserInterface() {
		fHslider0 = FAUSTFLOAT(0.0f);
		fHslider1 = FAUSTFLOAT(0.0f);
		fHslider2 = FAUSTFLOAT(1e+01f);
	}
	
	void instanceClear() {
		IOTA0 = 0;
		for (int l0 = 0; l0 < 1048576; l0 = l0 + 1) {
			fVec0[l0] = 0.0f;
		}
		for (int l1 = 0; l1 < 2; l1 = l1 + 1) {
			fRec1[l1] = 0.0f;
		}
		for (int l2 = 0; l2 < 2; l2 = l2 + 1) {
			fRec2[l2] = 0.0f;
		}
		for (int l3 = 0; l3 < 2; l3 = l3 + 1) {
			fRec3[l3] = 0.0f;
		}
		for (int l4 = 0; l4 < 2; l4 = l4 + 1) {
			fRec4[l4] = 0.0f;
		}
		for (int l5 = 0; l5 < 2; l5 = l5 + 1) {
			fRec0[l5] = 0.0f;
		}
		for (int l6 = 0; l6 < 1048576; l6 = l6 + 1) {
			fVec1[l6] = 0.0f;
		}
		for (int l7 = 0; l7 < 2; l7 = l7 + 1) {
			fRec5[l7] = 0.0f;
		}
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
	
	_Delay2* clone() {
		return new _Delay2();
	}
	
	int getSampleRate() {
		return fSampleRate;
	}
	
	void buildUserInterface(UI* ui_interface) {
		ui_interface->openVerticalBox("smoothDelay");
		ui_interface->declare(&fHslider1, "style", "knob");
		ui_interface->declare(&fHslider1, "unit", "ms");
		ui_interface->addHorizontalSlider("delay", &fHslider1, FAUSTFLOAT(0.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(5e+03f), FAUSTFLOAT(0.1f));
		ui_interface->declare(&fHslider0, "style", "knob");
		ui_interface->addHorizontalSlider("feedback", &fHslider0, FAUSTFLOAT(0.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1e+02f), FAUSTFLOAT(0.1f));
		ui_interface->declare(&fHslider2, "style", "knob");
		ui_interface->declare(&fHslider2, "unit", "ms");
		ui_interface->addHorizontalSlider("interpolation", &fHslider2, FAUSTFLOAT(1e+01f), FAUSTFLOAT(1.0f), FAUSTFLOAT(1e+02f), FAUSTFLOAT(0.1f));
		ui_interface->closeBox();
	}
	
	void compute(int count, FAUSTFLOAT** RESTRICT inputs, FAUSTFLOAT** RESTRICT outputs) {
		FAUSTFLOAT* input0 = inputs[0];
		FAUSTFLOAT* input1 = inputs[1];
		FAUSTFLOAT* output0 = outputs[0];
		FAUSTFLOAT* output1 = outputs[1];
		float fSlow0 = 0.01f * std::max<float>(0.0f, std::min<float>(1e+02f, float(fHslider0)));
		float fSlow1 = fConst1 * std::max<float>(0.0f, std::min<float>(5e+03f, float(fHslider1)));
		float fSlow2 = fConst2 / std::max<float>(1.0f, std::min<float>(1e+02f, float(fHslider2)));
		for (int i0 = 0; i0 < count; i0 = i0 + 1) {
			float fTemp0 = float(input0[i0]) + fSlow0 * fRec0[1];
			fVec0[IOTA0 & 1048575] = fTemp0;
			float fTemp1 = ((fRec1[1] != 0.0f) ? (((fRec2[1] > 0.0f) & (fRec2[1] < 1.0f)) ? fRec1[1] : 0.0f) : (((fRec2[1] == 0.0f) & (fSlow1 != fRec3[1])) ? fSlow2 : (((fRec2[1] == 1.0f) & (fSlow1 != fRec4[1])) ? -fSlow2 : 0.0f)));
			fRec1[0] = fTemp1;
			fRec2[0] = std::max<float>(0.0f, std::min<float>(1.0f, fRec2[1] + fTemp1));
			fRec3[0] = (((fRec2[1] >= 1.0f) & (fRec4[1] != fSlow1)) ? fSlow1 : fRec3[1]);
			fRec4[0] = (((fRec2[1] <= 0.0f) & (fRec3[1] != fSlow1)) ? fSlow1 : fRec4[1]);
			int iTemp2 = int(std::min<float>(524288.0f, std::max<float>(0.0f, fRec3[0])));
			float fTemp3 = fVec0[(IOTA0 - iTemp2) & 1048575];
			int iTemp4 = int(std::min<float>(524288.0f, std::max<float>(0.0f, fRec4[0])));
			fRec0[0] = fTemp3 + fRec2[0] * (fVec0[(IOTA0 - iTemp4) & 1048575] - fTemp3);
			output0[i0] = FAUSTFLOAT(fRec0[0]);
			float fTemp5 = float(input1[i0]) + fSlow0 * fRec5[1];
			fVec1[IOTA0 & 1048575] = fTemp5;
			float fTemp6 = fVec1[(IOTA0 - iTemp2) & 1048575];
			fRec5[0] = fTemp6 + fRec2[0] * (fVec1[(IOTA0 - iTemp4) & 1048575] - fTemp6);
			output1[i0] = FAUSTFLOAT(fRec5[0]);
			IOTA0 = IOTA0 + 1;
			fRec1[1] = fRec1[0];
			fRec2[1] = fRec2[0];
			fRec3[1] = fRec3[0];
			fRec4[1] = fRec4[0];
			fRec0[1] = fRec0[0];
			fRec5[1] = fRec5[0];
		}
	}

};

#ifdef FAUST_UIMACROS
	
	#define FAUST_FILE_NAME "Delay2.dsp"
	#define FAUST_CLASS_NAME "_Delay2"
	#define FAUST_COMPILATION_OPIONS "-lang cpp -rui -nvi -ct 1 -cn _Delay2 -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0"
	#define FAUST_INPUTS 2
	#define FAUST_OUTPUTS 2
	#define FAUST_ACTIVES 3
	#define FAUST_PASSIVES 0

	FAUST_ADDHORIZONTALSLIDER("delay", fHslider1, 0.0f, 0.0f, 5e+03f, 0.1f);
	FAUST_ADDHORIZONTALSLIDER("feedback", fHslider0, 0.0f, 0.0f, 1e+02f, 0.1f);
	FAUST_ADDHORIZONTALSLIDER("interpolation", fHslider2, 1e+01f, 1.0f, 1e+02f, 0.1f);

	#define FAUST_LIST_ACTIVES(p) \
		p(HORIZONTALSLIDER, delay, "delay", fHslider1, 0.0f, 0.0f, 5e+03f, 0.1f) \
		p(HORIZONTALSLIDER, feedback, "feedback", fHslider0, 0.0f, 0.0f, 1e+02f, 0.1f) \
		p(HORIZONTALSLIDER, interpolation, "interpolation", fHslider2, 1e+01f, 1.0f, 1e+02f, 0.1f) \

	#define FAUST_LIST_PASSIVES(p) \

#endif

#endif
