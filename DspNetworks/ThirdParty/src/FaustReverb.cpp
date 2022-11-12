/* ------------------------------------------------------------
name: "FaustReverb"
Code generated with Faust 2.52.6 (https://faust.grame.fr)
Compilation options: -lang cpp -rui -cn _FaustReverb -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0
------------------------------------------------------------ */

#ifndef  ___FaustReverb_H__
#define  ___FaustReverb_H__

#ifndef FAUSTFLOAT
#define FAUSTFLOAT float
#endif 

#include <algorithm>
#include <cmath>
#include <cstdint>
#include <math.h>

#ifndef FAUSTCLASS 
#define FAUSTCLASS _FaustReverb
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

const static int i_FaustReverbSIG0Wave0[1302] = {2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179,2203,2207,2213,2221,2237,2239,2243,2251,2267,2269,2273,2281,2287,2293,2297,2309,2311,2333,2339,2341,2347,2351,2357,2371,2377,2381,2383,2389,2393,2399,2411,2417,2423,2437,2441,2447,2459,2467,2473,2477,2503,2521,2531,2539,2543,2549,2551,2557,2579,2591,2593,2609,2617,2621,2633,2647,2657,2659,2663,2671,2677,2683,2687,2689,2693,2699,2707,2711,2713,2719,2729,2731,2741,2749,2753,2767,2777,2789,2791,2797,2801,2803,2819,2833,2837,2843,2851,2857,2861,2879,2887,2897,2903,2909,2917,2927,2939,2953,2957,2963,2969,2971,2999,3001,3011,3019,3023,3037,3041,3049,3061,3067,3079,3083,3089,3109,3119,3121,3137,3163,3167,3169,3181,3187,3191,3203,3209,3217,3221,3229,3251,3253,3257,3259,3271,3299,3301,3307,3313,3319,3323,3329,3331,3343,3347,3359,3361,3371,3373,3389,3391,3407,3413,3433,3449,3457,3461,3463,3467,3469,3491,3499,3511,3517,3527,3529,3533,3539,3541,3547,3557,3559,3571,3581,3583,3593,3607,3613,3617,3623,3631,3637,3643,3659,3671,3673,3677,3691,3697,3701,3709,3719,3727,3733,3739,3761,3767,3769,3779,3793,3797,3803,3821,3823,3833,3847,3851,3853,3863,3877,3881,3889,3907,3911,3917,3919,3923,3929,3931,3943,3947,3967,3989,4001,4003,4007,4013,4019,4021,4027,4049,4051,4057,4073,4079,4091,4093,4099,4111,4127,4129,4133,4139,4153,4157,4159,4177,4201,4211,4217,4219,4229,4231,4241,4243,4253,4259,4261,4271,4273,4283,4289,4297,4327,4337,4339,4349,4357,4363,4373,4391,4397,4409,4421,4423,4441,4447,4451,4457,4463,4481,4483,4493,4507,4513,4517,4519,4523,4547,4549,4561,4567,4583,4591,4597,4603,4621,4637,4639,4643,4649,4651,4657,4663,4673,4679,4691,4703,4721,4723,4729,4733,4751,4759,4783,4787,4789,4793,4799,4801,4813,4817,4831,4861,4871,4877,4889,4903,4909,4919,4931,4933,4937,4943,4951,4957,4967,4969,4973,4987,4993,4999,5003,5009,5011,5021,5023,5039,5051,5059,5077,5081,5087,5099,5101,5107,5113,5119,5147,5153,5167,5171,5179,5189,5197,5209,5227,5231,5233,5237,5261,5273,5279,5281,5297,5303,5309,5323,5333,5347,5351,5381,5387,5393,5399,5407,5413,5417,5419,5431,5437,5441,5443,5449,5471,5477,5479,5483,5501,5503,5507,5519,5521,5527,5531,5557,5563,5569,5573,5581,5591,5623,5639,5641,5647,5651,5653,5657,5659,5669,5683,5689,5693,5701,5711,5717,5737,5741,5743,5749,5779,5783,5791,5801,5807,5813,5821,5827,5839,5843,5849,5851,5857,5861,5867,5869,5879,5881,5897,5903,5923,5927,5939,5953,5981,5987,6007,6011,6029,6037,6043,6047,6053,6067,6073,6079,6089,6091,6101,6113,6121,6131,6133,6143,6151,6163,6173,6197,6199,6203,6211,6217,6221,6229,6247,6257,6263,6269,6271,6277,6287,6299,6301,6311,6317,6323,6329,6337,6343,6353,6359,6361,6367,6373,6379,6389,6397,6421,6427,6449,6451,6469,6473,6481,6491,6521,6529,6547,6551,6553,6563,6569,6571,6577,6581,6599,6607,6619,6637,6653,6659,6661,6673,6679,6689,6691,6701,6703,6709,6719,6733,6737,6761,6763,6779,6781,6791,6793,6803,6823,6827,6829,6833,6841,6857,6863,6869,6871,6883,6899,6907,6911,6917,6947,6949,6959,6961,6967,6971,6977,6983,6991,6997,7001,7013,7019,7027,7039,7043,7057,7069,7079,7103,7109,7121,7127,7129,7151,7159,7177,7187,7193,7207,7211,7213,7219,7229,7237,7243,7247,7253,7283,7297,7307,7309,7321,7331,7333,7349,7351,7369,7393,7411,7417,7433,7451,7457,7459,7477,7481,7487,7489,7499,7507,7517,7523,7529,7537,7541,7547,7549,7559,7561,7573,7577,7583,7589,7591,7603,7607,7621,7639,7643,7649,7669,7673,7681,7687,7691,7699,7703,7717,7723,7727,7741,7753,7757,7759,7789,7793,7817,7823,7829,7841,7853,7867,7873,7877,7879,7883,7901,7907,7919,7927,7933,7937,7949,7951,7963,7993,8009,8011,8017,8039,8053,8059,8069,8081,8087,8089,8093,8101,8111,8117,8123,8147,8161,8167,8171,8179,8191,8209,8219,8221,8231,8233,8237,8243,8263,8269,8273,8287,8291,8293,8297,8311,8317,8329,8353,8363,8369,8377,8387,8389,8419,8423,8429,8431,8443,8447,8461,8467,8501,8513,8521,8527,8537,8539,8543,8563,8573,8581,8597,8599,8609,8623,8627,8629,8641,8647,8663,8669,8677,8681,8689,8693,8699,8707,8713,8719,8731,8737,8741,8747,8753,8761,8779,8783,8803,8807,8819,8821,8831,8837,8839,8849,8861,8863,8867,8887,8893,8923,8929,8933,8941,8951,8963,8969,8971,8999,9001,9007,9011,9013,9029,9041,9043,9049,9059,9067,9091,9103,9109,9127,9133,9137,9151,9157,9161,9173,9181,9187,9199,9203,9209,9221,9227,9239,9241,9257,9277,9281,9283,9293,9311,9319,9323,9337,9341,9343,9349,9371,9377,9391,9397,9403,9413,9419,9421,9431,9433,9437,9439,9461,9463,9467,9473,9479,9491,9497,9511,9521,9533,9539,9547,9551,9587,9601,9613,9619,9623,9629,9631,9643,9649,9661,9677,9679,9689,9697,9719,9721,9733,9739,9743,9749,9767,9769,9781,9787,9791,9803,9811,9817,9829,9833,9839,9851,9857,9859,9871,9883,9887,9901,9907,9923,9929,9931,9941,9949,9967,9973,10007,10009,10037,10039,10061,10067,10069,10079,10091,10093,10099,10103,10111,10133,10139,10141,10151,10159,10163,10169,10177,10181,10193,10211,10223,10243,10247,10253,10259,10267,10271,10273,10289,10301,10303,10313,10321,10331,10333,10337,10343,10357,10369,10391,10399,10427,10429,10433,10453,10457,10459,10463,10477,10487,10499,10501,10513,10529,10531,10559,10567,10589,10597,10601,10607,10613,10627,10631,10639,10651,10657,10663,10667};
class _FaustReverbSIG0 {
	
  public:
	
	int i_FaustReverbSIG0Wave0_idx;
	
  public:
	
	int getNumInputs_FaustReverbSIG0() {
		return 0;
	}
	int getNumOutputs_FaustReverbSIG0() {
		return 1;
	}
	
	void instanceInit_FaustReverbSIG0(int sample_rate) {
		i_FaustReverbSIG0Wave0_idx = 0;
	}
	
	void fill_FaustReverbSIG0(int count, int* table) {
		for (int i1 = 0; i1 < count; i1 = i1 + 1) {
			table[i1] = i_FaustReverbSIG0Wave0[i_FaustReverbSIG0Wave0_idx];
			i_FaustReverbSIG0Wave0_idx = (1 + i_FaustReverbSIG0Wave0_idx) % 1302;
		}
	}

};

static _FaustReverbSIG0* new_FaustReverbSIG0() { return (_FaustReverbSIG0*)new _FaustReverbSIG0(); }
static void delete_FaustReverbSIG0(_FaustReverbSIG0* dsp) { delete dsp; }

static float _FaustReverb_faustpower2_f(float value) {
	return value * value;
}
static int itbl0_FaustReverbSIG0[1302];

class _FaustReverb final : public ::faust::dsp {
	
 public:
	
	int iVec0[2];
	FAUSTFLOAT fHslider0;
	FAUSTFLOAT fHslider1;
	int fSampleRate;
	float fConst1;
	FAUSTFLOAT fHslider2;
	FAUSTFLOAT fHslider3;
	float fRec10[2];
	float fRec12[2];
	float fRec16[2];
	int IOTA0;
	float fVec1[16384];
	float fVec2[2];
	float fRec15[2];
	float fRec13[2];
	float fRec18[2];
	float fVec3[16384];
	float fVec4[2];
	float fRec17[2];
	float fRec14[2];
	float fRec22[2];
	float fVec5[16384];
	float fVec6[2];
	float fRec21[2];
	float fRec19[2];
	float fRec24[2];
	float fVec7[16384];
	float fVec8[2];
	float fRec23[2];
	float fRec20[2];
	float fRec28[2];
	float fVec9[16384];
	float fVec10[2];
	float fRec27[2];
	float fRec25[2];
	float fRec30[2];
	float fVec11[16384];
	float fVec12[2];
	float fRec29[2];
	float fRec26[2];
	float fRec34[2];
	float fVec13[16384];
	float fVec14[2];
	float fRec33[2];
	float fRec31[2];
	float fRec36[2];
	float fVec15[16384];
	float fVec16[2];
	float fRec35[2];
	float fRec32[2];
	float fRec40[2];
	float fVec17[16384];
	float fVec18[2];
	float fRec39[2];
	float fRec37[2];
	float fRec42[2];
	float fVec19[16384];
	float fVec20[2];
	float fRec41[2];
	float fRec38[2];
	float fVec21[1024];
	FAUSTFLOAT fHslider4;
	float fConst2;
	float fRec43[2];
	float fRec44[2];
	FAUSTFLOAT fHslider5;
	float fVec22[16384];
	float fVec23[2];
	float fRec11[2];
	float fRec48[2];
	float fRec50[2];
	float fVec24[1024];
	float fVec25[16384];
	float fVec26[2];
	float fRec49[2];
	float fVec27[16384];
	float fVec28[2];
	float fRec47[2];
	float fRec45[2];
	float fRec52[2];
	float fVec29[16384];
	float fVec30[2];
	float fRec51[2];
	float fRec46[2];
	float fRec56[2];
	float fVec31[16384];
	float fVec32[2];
	float fRec55[2];
	float fRec53[2];
	float fRec58[2];
	float fVec33[16384];
	float fVec34[2];
	float fRec57[2];
	float fRec54[2];
	float fRec62[2];
	float fVec35[16384];
	float fVec36[2];
	float fRec61[2];
	float fRec59[2];
	float fRec64[2];
	float fVec37[16384];
	float fVec38[2];
	float fRec63[2];
	float fRec60[2];
	float fRec68[2];
	float fVec39[16384];
	float fVec40[2];
	float fRec67[2];
	float fRec65[2];
	float fRec70[2];
	float fVec41[16384];
	float fVec42[2];
	float fRec69[2];
	float fRec66[2];
	float fRec74[2];
	float fVec43[16384];
	float fVec44[2];
	float fRec73[2];
	float fRec71[2];
	float fRec76[2];
	float fVec45[16384];
	float fVec46[2];
	float fRec75[2];
	float fRec72[2];
	float fVec47[16384];
	float fVec48[16384];
	float fVec49[2];
	float fRec9[2];
	float fRec8[2];
	float fRec7[3];
	float fRec6[3];
	float fVec50[2];
	float fRec5[2];
	float fRec4[3];
	float fRec3[3];
	FAUSTFLOAT fHslider6;
	float fRec79[2];
	float fRec78[3];
	float fRec77[3];
	FAUSTFLOAT fHslider7;
	float fRec83[2];
	float fRec82[3];
	float fRec81[3];
	float fRec80[3];
	FAUSTFLOAT fHslider8;
	FAUSTFLOAT fHslider9;
	float fVec51[1024];
	float fRec2[2];
	FAUSTFLOAT fHslider10;
	float fRec95[2];
	float fVec52[16384];
	float fVec53[16384];
	float fVec54[2];
	float fRec94[2];
	float fRec93[2];
	float fRec92[3];
	float fRec91[3];
	float fVec55[2];
	float fRec90[2];
	float fRec89[3];
	float fRec88[3];
	float fRec98[2];
	float fRec97[3];
	float fRec96[3];
	float fRec102[2];
	float fRec101[3];
	float fRec100[3];
	float fRec99[3];
	float fVec56[1024];
	float fRec87[2];
	float fVec57[16384];
	float fVec58[2];
	float fRec86[2];
	float fRec84[2];
	float fRec104[2];
	float fVec59[16384];
	float fVec60[2];
	float fRec103[2];
	float fRec85[2];
	float fVec61[16384];
	float fVec62[2];
	float fRec107[2];
	float fRec105[2];
	float fVec63[16384];
	float fVec64[2];
	float fRec108[2];
	float fRec106[2];
	float fVec65[16384];
	float fVec66[2];
	float fRec111[2];
	float fRec109[2];
	float fRec113[2];
	float fVec67[16384];
	float fVec68[2];
	float fRec112[2];
	float fRec110[2];
	float fRec117[2];
	float fVec69[16384];
	float fVec70[2];
	float fRec116[2];
	float fRec114[2];
	float fVec71[16384];
	float fVec72[2];
	float fRec118[2];
	float fRec115[2];
	float fRec0[2];
	float fRec1[2];
	
 public:
	
	void metadata(Meta* m) { 
		m->declare("analyzers.lib/name", "Faust Analyzer Library");
		m->declare("analyzers.lib/version", "0.2");
		m->declare("basics.lib/name", "Faust Basic Element Library");
		m->declare("basics.lib/version", "0.8");
		m->declare("compile_options", "-lang cpp -rui -cn _FaustReverb -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0");
		m->declare("delays.lib/fdelay1a:author", "Julius O. Smith III");
		m->declare("delays.lib/fdelay4:author", "Julius O. Smith III");
		m->declare("delays.lib/fdelayltv:author", "Julius O. Smith III");
		m->declare("delays.lib/name", "Faust Delay Library");
		m->declare("delays.lib/version", "0.1");
		m->declare("filename", "FaustReverb.dsp");
		m->declare("filters.lib/filterbank:author", "Julius O. Smith III");
		m->declare("filters.lib/filterbank:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/filterbank:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/fir:author", "Julius O. Smith III");
		m->declare("filters.lib/fir:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/fir:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/highpass:author", "Julius O. Smith III");
		m->declare("filters.lib/highpass:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/highpass_plus_lowpass:author", "Julius O. Smith III");
		m->declare("filters.lib/highpass_plus_lowpass:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/highpass_plus_lowpass:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/iir:author", "Julius O. Smith III");
		m->declare("filters.lib/iir:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/iir:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/lowpass0_highpass1", "MIT-style STK-4.3 license");
		m->declare("filters.lib/lowpass0_highpass1:author", "Julius O. Smith III");
		m->declare("filters.lib/lowpass:author", "Julius O. Smith III");
		m->declare("filters.lib/lowpass:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/lowpass:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/name", "Faust Filters Library");
		m->declare("filters.lib/nlf2:author", "Julius O. Smith III");
		m->declare("filters.lib/nlf2:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/nlf2:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/tf1:author", "Julius O. Smith III");
		m->declare("filters.lib/tf1:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/tf1:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/tf1s:author", "Julius O. Smith III");
		m->declare("filters.lib/tf1s:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/tf1s:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/tf2:author", "Julius O. Smith III");
		m->declare("filters.lib/tf2:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/tf2:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/tf2s:author", "Julius O. Smith III");
		m->declare("filters.lib/tf2s:copyright", "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>");
		m->declare("filters.lib/tf2s:license", "MIT-style STK-4.3 license");
		m->declare("filters.lib/version", "0.3");
		m->declare("maths.lib/author", "GRAME");
		m->declare("maths.lib/copyright", "GRAME");
		m->declare("maths.lib/license", "LGPL with exception");
		m->declare("maths.lib/name", "Faust Math Library");
		m->declare("maths.lib/version", "2.5");
		m->declare("name", "FaustReverb");
		m->declare("oscillators.lib/name", "Faust Oscillator Library");
		m->declare("oscillators.lib/version", "0.3");
		m->declare("platform.lib/name", "Generic Platform Library");
		m->declare("platform.lib/version", "0.2");
		m->declare("reverbs.lib/jpverb:author", "Julian Parker, bug fixes and minor interface changes by Till Bovermann");
		m->declare("reverbs.lib/jpverb:license", "GPL2+");
		m->declare("reverbs.lib/name", "Faust Reverb Library");
		m->declare("reverbs.lib/version", "0.2");
		m->declare("signals.lib/name", "Faust Signal Routing Library");
		m->declare("signals.lib/version", "0.3");
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
		_FaustReverbSIG0* sig0 = new_FaustReverbSIG0();
		sig0->instanceInit_FaustReverbSIG0(sample_rate);
		sig0->fill_FaustReverbSIG0(1302, itbl0_FaustReverbSIG0);
		delete_FaustReverbSIG0(sig0);
	}
	
	void instanceConstants(int sample_rate) {
		fSampleRate = sample_rate;
		float fConst0 = std::min<float>(1.92e+05f, std::max<float>(1.0f, float(fSampleRate)));
		fConst1 = 3.1415927f / fConst0;
		fConst2 = 6.2831855f / fConst0;
	}
	
	void instanceResetUserInterface() {
		fHslider0 = FAUSTFLOAT(0.5f);
		fHslider1 = FAUSTFLOAT(6e+02f);
		fHslider2 = FAUSTFLOAT(5e+03f);
		fHslider3 = FAUSTFLOAT(3.5f);
		fHslider4 = FAUSTFLOAT(0.1f);
		fHslider5 = FAUSTFLOAT(0.1f);
		fHslider6 = FAUSTFLOAT(1.0f);
		fHslider7 = FAUSTFLOAT(1.0f);
		fHslider8 = FAUSTFLOAT(1.0f);
		fHslider9 = FAUSTFLOAT(4.2f);
		fHslider10 = FAUSTFLOAT(0.707f);
	}
	
	void instanceClear() {
		for (int l0 = 0; l0 < 2; l0 = l0 + 1) {
			iVec0[l0] = 0;
		}
		for (int l1 = 0; l1 < 2; l1 = l1 + 1) {
			fRec10[l1] = 0.0f;
		}
		for (int l2 = 0; l2 < 2; l2 = l2 + 1) {
			fRec12[l2] = 0.0f;
		}
		for (int l3 = 0; l3 < 2; l3 = l3 + 1) {
			fRec16[l3] = 0.0f;
		}
		IOTA0 = 0;
		for (int l4 = 0; l4 < 16384; l4 = l4 + 1) {
			fVec1[l4] = 0.0f;
		}
		for (int l5 = 0; l5 < 2; l5 = l5 + 1) {
			fVec2[l5] = 0.0f;
		}
		for (int l6 = 0; l6 < 2; l6 = l6 + 1) {
			fRec15[l6] = 0.0f;
		}
		for (int l7 = 0; l7 < 2; l7 = l7 + 1) {
			fRec13[l7] = 0.0f;
		}
		for (int l8 = 0; l8 < 2; l8 = l8 + 1) {
			fRec18[l8] = 0.0f;
		}
		for (int l9 = 0; l9 < 16384; l9 = l9 + 1) {
			fVec3[l9] = 0.0f;
		}
		for (int l10 = 0; l10 < 2; l10 = l10 + 1) {
			fVec4[l10] = 0.0f;
		}
		for (int l11 = 0; l11 < 2; l11 = l11 + 1) {
			fRec17[l11] = 0.0f;
		}
		for (int l12 = 0; l12 < 2; l12 = l12 + 1) {
			fRec14[l12] = 0.0f;
		}
		for (int l13 = 0; l13 < 2; l13 = l13 + 1) {
			fRec22[l13] = 0.0f;
		}
		for (int l14 = 0; l14 < 16384; l14 = l14 + 1) {
			fVec5[l14] = 0.0f;
		}
		for (int l15 = 0; l15 < 2; l15 = l15 + 1) {
			fVec6[l15] = 0.0f;
		}
		for (int l16 = 0; l16 < 2; l16 = l16 + 1) {
			fRec21[l16] = 0.0f;
		}
		for (int l17 = 0; l17 < 2; l17 = l17 + 1) {
			fRec19[l17] = 0.0f;
		}
		for (int l18 = 0; l18 < 2; l18 = l18 + 1) {
			fRec24[l18] = 0.0f;
		}
		for (int l19 = 0; l19 < 16384; l19 = l19 + 1) {
			fVec7[l19] = 0.0f;
		}
		for (int l20 = 0; l20 < 2; l20 = l20 + 1) {
			fVec8[l20] = 0.0f;
		}
		for (int l21 = 0; l21 < 2; l21 = l21 + 1) {
			fRec23[l21] = 0.0f;
		}
		for (int l22 = 0; l22 < 2; l22 = l22 + 1) {
			fRec20[l22] = 0.0f;
		}
		for (int l23 = 0; l23 < 2; l23 = l23 + 1) {
			fRec28[l23] = 0.0f;
		}
		for (int l24 = 0; l24 < 16384; l24 = l24 + 1) {
			fVec9[l24] = 0.0f;
		}
		for (int l25 = 0; l25 < 2; l25 = l25 + 1) {
			fVec10[l25] = 0.0f;
		}
		for (int l26 = 0; l26 < 2; l26 = l26 + 1) {
			fRec27[l26] = 0.0f;
		}
		for (int l27 = 0; l27 < 2; l27 = l27 + 1) {
			fRec25[l27] = 0.0f;
		}
		for (int l28 = 0; l28 < 2; l28 = l28 + 1) {
			fRec30[l28] = 0.0f;
		}
		for (int l29 = 0; l29 < 16384; l29 = l29 + 1) {
			fVec11[l29] = 0.0f;
		}
		for (int l30 = 0; l30 < 2; l30 = l30 + 1) {
			fVec12[l30] = 0.0f;
		}
		for (int l31 = 0; l31 < 2; l31 = l31 + 1) {
			fRec29[l31] = 0.0f;
		}
		for (int l32 = 0; l32 < 2; l32 = l32 + 1) {
			fRec26[l32] = 0.0f;
		}
		for (int l33 = 0; l33 < 2; l33 = l33 + 1) {
			fRec34[l33] = 0.0f;
		}
		for (int l34 = 0; l34 < 16384; l34 = l34 + 1) {
			fVec13[l34] = 0.0f;
		}
		for (int l35 = 0; l35 < 2; l35 = l35 + 1) {
			fVec14[l35] = 0.0f;
		}
		for (int l36 = 0; l36 < 2; l36 = l36 + 1) {
			fRec33[l36] = 0.0f;
		}
		for (int l37 = 0; l37 < 2; l37 = l37 + 1) {
			fRec31[l37] = 0.0f;
		}
		for (int l38 = 0; l38 < 2; l38 = l38 + 1) {
			fRec36[l38] = 0.0f;
		}
		for (int l39 = 0; l39 < 16384; l39 = l39 + 1) {
			fVec15[l39] = 0.0f;
		}
		for (int l40 = 0; l40 < 2; l40 = l40 + 1) {
			fVec16[l40] = 0.0f;
		}
		for (int l41 = 0; l41 < 2; l41 = l41 + 1) {
			fRec35[l41] = 0.0f;
		}
		for (int l42 = 0; l42 < 2; l42 = l42 + 1) {
			fRec32[l42] = 0.0f;
		}
		for (int l43 = 0; l43 < 2; l43 = l43 + 1) {
			fRec40[l43] = 0.0f;
		}
		for (int l44 = 0; l44 < 16384; l44 = l44 + 1) {
			fVec17[l44] = 0.0f;
		}
		for (int l45 = 0; l45 < 2; l45 = l45 + 1) {
			fVec18[l45] = 0.0f;
		}
		for (int l46 = 0; l46 < 2; l46 = l46 + 1) {
			fRec39[l46] = 0.0f;
		}
		for (int l47 = 0; l47 < 2; l47 = l47 + 1) {
			fRec37[l47] = 0.0f;
		}
		for (int l48 = 0; l48 < 2; l48 = l48 + 1) {
			fRec42[l48] = 0.0f;
		}
		for (int l49 = 0; l49 < 16384; l49 = l49 + 1) {
			fVec19[l49] = 0.0f;
		}
		for (int l50 = 0; l50 < 2; l50 = l50 + 1) {
			fVec20[l50] = 0.0f;
		}
		for (int l51 = 0; l51 < 2; l51 = l51 + 1) {
			fRec41[l51] = 0.0f;
		}
		for (int l52 = 0; l52 < 2; l52 = l52 + 1) {
			fRec38[l52] = 0.0f;
		}
		for (int l53 = 0; l53 < 1024; l53 = l53 + 1) {
			fVec21[l53] = 0.0f;
		}
		for (int l54 = 0; l54 < 2; l54 = l54 + 1) {
			fRec43[l54] = 0.0f;
		}
		for (int l55 = 0; l55 < 2; l55 = l55 + 1) {
			fRec44[l55] = 0.0f;
		}
		for (int l56 = 0; l56 < 16384; l56 = l56 + 1) {
			fVec22[l56] = 0.0f;
		}
		for (int l57 = 0; l57 < 2; l57 = l57 + 1) {
			fVec23[l57] = 0.0f;
		}
		for (int l58 = 0; l58 < 2; l58 = l58 + 1) {
			fRec11[l58] = 0.0f;
		}
		for (int l59 = 0; l59 < 2; l59 = l59 + 1) {
			fRec48[l59] = 0.0f;
		}
		for (int l60 = 0; l60 < 2; l60 = l60 + 1) {
			fRec50[l60] = 0.0f;
		}
		for (int l61 = 0; l61 < 1024; l61 = l61 + 1) {
			fVec24[l61] = 0.0f;
		}
		for (int l62 = 0; l62 < 16384; l62 = l62 + 1) {
			fVec25[l62] = 0.0f;
		}
		for (int l63 = 0; l63 < 2; l63 = l63 + 1) {
			fVec26[l63] = 0.0f;
		}
		for (int l64 = 0; l64 < 2; l64 = l64 + 1) {
			fRec49[l64] = 0.0f;
		}
		for (int l65 = 0; l65 < 16384; l65 = l65 + 1) {
			fVec27[l65] = 0.0f;
		}
		for (int l66 = 0; l66 < 2; l66 = l66 + 1) {
			fVec28[l66] = 0.0f;
		}
		for (int l67 = 0; l67 < 2; l67 = l67 + 1) {
			fRec47[l67] = 0.0f;
		}
		for (int l68 = 0; l68 < 2; l68 = l68 + 1) {
			fRec45[l68] = 0.0f;
		}
		for (int l69 = 0; l69 < 2; l69 = l69 + 1) {
			fRec52[l69] = 0.0f;
		}
		for (int l70 = 0; l70 < 16384; l70 = l70 + 1) {
			fVec29[l70] = 0.0f;
		}
		for (int l71 = 0; l71 < 2; l71 = l71 + 1) {
			fVec30[l71] = 0.0f;
		}
		for (int l72 = 0; l72 < 2; l72 = l72 + 1) {
			fRec51[l72] = 0.0f;
		}
		for (int l73 = 0; l73 < 2; l73 = l73 + 1) {
			fRec46[l73] = 0.0f;
		}
		for (int l74 = 0; l74 < 2; l74 = l74 + 1) {
			fRec56[l74] = 0.0f;
		}
		for (int l75 = 0; l75 < 16384; l75 = l75 + 1) {
			fVec31[l75] = 0.0f;
		}
		for (int l76 = 0; l76 < 2; l76 = l76 + 1) {
			fVec32[l76] = 0.0f;
		}
		for (int l77 = 0; l77 < 2; l77 = l77 + 1) {
			fRec55[l77] = 0.0f;
		}
		for (int l78 = 0; l78 < 2; l78 = l78 + 1) {
			fRec53[l78] = 0.0f;
		}
		for (int l79 = 0; l79 < 2; l79 = l79 + 1) {
			fRec58[l79] = 0.0f;
		}
		for (int l80 = 0; l80 < 16384; l80 = l80 + 1) {
			fVec33[l80] = 0.0f;
		}
		for (int l81 = 0; l81 < 2; l81 = l81 + 1) {
			fVec34[l81] = 0.0f;
		}
		for (int l82 = 0; l82 < 2; l82 = l82 + 1) {
			fRec57[l82] = 0.0f;
		}
		for (int l83 = 0; l83 < 2; l83 = l83 + 1) {
			fRec54[l83] = 0.0f;
		}
		for (int l84 = 0; l84 < 2; l84 = l84 + 1) {
			fRec62[l84] = 0.0f;
		}
		for (int l85 = 0; l85 < 16384; l85 = l85 + 1) {
			fVec35[l85] = 0.0f;
		}
		for (int l86 = 0; l86 < 2; l86 = l86 + 1) {
			fVec36[l86] = 0.0f;
		}
		for (int l87 = 0; l87 < 2; l87 = l87 + 1) {
			fRec61[l87] = 0.0f;
		}
		for (int l88 = 0; l88 < 2; l88 = l88 + 1) {
			fRec59[l88] = 0.0f;
		}
		for (int l89 = 0; l89 < 2; l89 = l89 + 1) {
			fRec64[l89] = 0.0f;
		}
		for (int l90 = 0; l90 < 16384; l90 = l90 + 1) {
			fVec37[l90] = 0.0f;
		}
		for (int l91 = 0; l91 < 2; l91 = l91 + 1) {
			fVec38[l91] = 0.0f;
		}
		for (int l92 = 0; l92 < 2; l92 = l92 + 1) {
			fRec63[l92] = 0.0f;
		}
		for (int l93 = 0; l93 < 2; l93 = l93 + 1) {
			fRec60[l93] = 0.0f;
		}
		for (int l94 = 0; l94 < 2; l94 = l94 + 1) {
			fRec68[l94] = 0.0f;
		}
		for (int l95 = 0; l95 < 16384; l95 = l95 + 1) {
			fVec39[l95] = 0.0f;
		}
		for (int l96 = 0; l96 < 2; l96 = l96 + 1) {
			fVec40[l96] = 0.0f;
		}
		for (int l97 = 0; l97 < 2; l97 = l97 + 1) {
			fRec67[l97] = 0.0f;
		}
		for (int l98 = 0; l98 < 2; l98 = l98 + 1) {
			fRec65[l98] = 0.0f;
		}
		for (int l99 = 0; l99 < 2; l99 = l99 + 1) {
			fRec70[l99] = 0.0f;
		}
		for (int l100 = 0; l100 < 16384; l100 = l100 + 1) {
			fVec41[l100] = 0.0f;
		}
		for (int l101 = 0; l101 < 2; l101 = l101 + 1) {
			fVec42[l101] = 0.0f;
		}
		for (int l102 = 0; l102 < 2; l102 = l102 + 1) {
			fRec69[l102] = 0.0f;
		}
		for (int l103 = 0; l103 < 2; l103 = l103 + 1) {
			fRec66[l103] = 0.0f;
		}
		for (int l104 = 0; l104 < 2; l104 = l104 + 1) {
			fRec74[l104] = 0.0f;
		}
		for (int l105 = 0; l105 < 16384; l105 = l105 + 1) {
			fVec43[l105] = 0.0f;
		}
		for (int l106 = 0; l106 < 2; l106 = l106 + 1) {
			fVec44[l106] = 0.0f;
		}
		for (int l107 = 0; l107 < 2; l107 = l107 + 1) {
			fRec73[l107] = 0.0f;
		}
		for (int l108 = 0; l108 < 2; l108 = l108 + 1) {
			fRec71[l108] = 0.0f;
		}
		for (int l109 = 0; l109 < 2; l109 = l109 + 1) {
			fRec76[l109] = 0.0f;
		}
		for (int l110 = 0; l110 < 16384; l110 = l110 + 1) {
			fVec45[l110] = 0.0f;
		}
		for (int l111 = 0; l111 < 2; l111 = l111 + 1) {
			fVec46[l111] = 0.0f;
		}
		for (int l112 = 0; l112 < 2; l112 = l112 + 1) {
			fRec75[l112] = 0.0f;
		}
		for (int l113 = 0; l113 < 2; l113 = l113 + 1) {
			fRec72[l113] = 0.0f;
		}
		for (int l114 = 0; l114 < 16384; l114 = l114 + 1) {
			fVec47[l114] = 0.0f;
		}
		for (int l115 = 0; l115 < 16384; l115 = l115 + 1) {
			fVec48[l115] = 0.0f;
		}
		for (int l116 = 0; l116 < 2; l116 = l116 + 1) {
			fVec49[l116] = 0.0f;
		}
		for (int l117 = 0; l117 < 2; l117 = l117 + 1) {
			fRec9[l117] = 0.0f;
		}
		for (int l118 = 0; l118 < 2; l118 = l118 + 1) {
			fRec8[l118] = 0.0f;
		}
		for (int l119 = 0; l119 < 3; l119 = l119 + 1) {
			fRec7[l119] = 0.0f;
		}
		for (int l120 = 0; l120 < 3; l120 = l120 + 1) {
			fRec6[l120] = 0.0f;
		}
		for (int l121 = 0; l121 < 2; l121 = l121 + 1) {
			fVec50[l121] = 0.0f;
		}
		for (int l122 = 0; l122 < 2; l122 = l122 + 1) {
			fRec5[l122] = 0.0f;
		}
		for (int l123 = 0; l123 < 3; l123 = l123 + 1) {
			fRec4[l123] = 0.0f;
		}
		for (int l124 = 0; l124 < 3; l124 = l124 + 1) {
			fRec3[l124] = 0.0f;
		}
		for (int l125 = 0; l125 < 2; l125 = l125 + 1) {
			fRec79[l125] = 0.0f;
		}
		for (int l126 = 0; l126 < 3; l126 = l126 + 1) {
			fRec78[l126] = 0.0f;
		}
		for (int l127 = 0; l127 < 3; l127 = l127 + 1) {
			fRec77[l127] = 0.0f;
		}
		for (int l128 = 0; l128 < 2; l128 = l128 + 1) {
			fRec83[l128] = 0.0f;
		}
		for (int l129 = 0; l129 < 3; l129 = l129 + 1) {
			fRec82[l129] = 0.0f;
		}
		for (int l130 = 0; l130 < 3; l130 = l130 + 1) {
			fRec81[l130] = 0.0f;
		}
		for (int l131 = 0; l131 < 3; l131 = l131 + 1) {
			fRec80[l131] = 0.0f;
		}
		for (int l132 = 0; l132 < 1024; l132 = l132 + 1) {
			fVec51[l132] = 0.0f;
		}
		for (int l133 = 0; l133 < 2; l133 = l133 + 1) {
			fRec2[l133] = 0.0f;
		}
		for (int l134 = 0; l134 < 2; l134 = l134 + 1) {
			fRec95[l134] = 0.0f;
		}
		for (int l135 = 0; l135 < 16384; l135 = l135 + 1) {
			fVec52[l135] = 0.0f;
		}
		for (int l136 = 0; l136 < 16384; l136 = l136 + 1) {
			fVec53[l136] = 0.0f;
		}
		for (int l137 = 0; l137 < 2; l137 = l137 + 1) {
			fVec54[l137] = 0.0f;
		}
		for (int l138 = 0; l138 < 2; l138 = l138 + 1) {
			fRec94[l138] = 0.0f;
		}
		for (int l139 = 0; l139 < 2; l139 = l139 + 1) {
			fRec93[l139] = 0.0f;
		}
		for (int l140 = 0; l140 < 3; l140 = l140 + 1) {
			fRec92[l140] = 0.0f;
		}
		for (int l141 = 0; l141 < 3; l141 = l141 + 1) {
			fRec91[l141] = 0.0f;
		}
		for (int l142 = 0; l142 < 2; l142 = l142 + 1) {
			fVec55[l142] = 0.0f;
		}
		for (int l143 = 0; l143 < 2; l143 = l143 + 1) {
			fRec90[l143] = 0.0f;
		}
		for (int l144 = 0; l144 < 3; l144 = l144 + 1) {
			fRec89[l144] = 0.0f;
		}
		for (int l145 = 0; l145 < 3; l145 = l145 + 1) {
			fRec88[l145] = 0.0f;
		}
		for (int l146 = 0; l146 < 2; l146 = l146 + 1) {
			fRec98[l146] = 0.0f;
		}
		for (int l147 = 0; l147 < 3; l147 = l147 + 1) {
			fRec97[l147] = 0.0f;
		}
		for (int l148 = 0; l148 < 3; l148 = l148 + 1) {
			fRec96[l148] = 0.0f;
		}
		for (int l149 = 0; l149 < 2; l149 = l149 + 1) {
			fRec102[l149] = 0.0f;
		}
		for (int l150 = 0; l150 < 3; l150 = l150 + 1) {
			fRec101[l150] = 0.0f;
		}
		for (int l151 = 0; l151 < 3; l151 = l151 + 1) {
			fRec100[l151] = 0.0f;
		}
		for (int l152 = 0; l152 < 3; l152 = l152 + 1) {
			fRec99[l152] = 0.0f;
		}
		for (int l153 = 0; l153 < 1024; l153 = l153 + 1) {
			fVec56[l153] = 0.0f;
		}
		for (int l154 = 0; l154 < 2; l154 = l154 + 1) {
			fRec87[l154] = 0.0f;
		}
		for (int l155 = 0; l155 < 16384; l155 = l155 + 1) {
			fVec57[l155] = 0.0f;
		}
		for (int l156 = 0; l156 < 2; l156 = l156 + 1) {
			fVec58[l156] = 0.0f;
		}
		for (int l157 = 0; l157 < 2; l157 = l157 + 1) {
			fRec86[l157] = 0.0f;
		}
		for (int l158 = 0; l158 < 2; l158 = l158 + 1) {
			fRec84[l158] = 0.0f;
		}
		for (int l159 = 0; l159 < 2; l159 = l159 + 1) {
			fRec104[l159] = 0.0f;
		}
		for (int l160 = 0; l160 < 16384; l160 = l160 + 1) {
			fVec59[l160] = 0.0f;
		}
		for (int l161 = 0; l161 < 2; l161 = l161 + 1) {
			fVec60[l161] = 0.0f;
		}
		for (int l162 = 0; l162 < 2; l162 = l162 + 1) {
			fRec103[l162] = 0.0f;
		}
		for (int l163 = 0; l163 < 2; l163 = l163 + 1) {
			fRec85[l163] = 0.0f;
		}
		for (int l164 = 0; l164 < 16384; l164 = l164 + 1) {
			fVec61[l164] = 0.0f;
		}
		for (int l165 = 0; l165 < 2; l165 = l165 + 1) {
			fVec62[l165] = 0.0f;
		}
		for (int l166 = 0; l166 < 2; l166 = l166 + 1) {
			fRec107[l166] = 0.0f;
		}
		for (int l167 = 0; l167 < 2; l167 = l167 + 1) {
			fRec105[l167] = 0.0f;
		}
		for (int l168 = 0; l168 < 16384; l168 = l168 + 1) {
			fVec63[l168] = 0.0f;
		}
		for (int l169 = 0; l169 < 2; l169 = l169 + 1) {
			fVec64[l169] = 0.0f;
		}
		for (int l170 = 0; l170 < 2; l170 = l170 + 1) {
			fRec108[l170] = 0.0f;
		}
		for (int l171 = 0; l171 < 2; l171 = l171 + 1) {
			fRec106[l171] = 0.0f;
		}
		for (int l172 = 0; l172 < 16384; l172 = l172 + 1) {
			fVec65[l172] = 0.0f;
		}
		for (int l173 = 0; l173 < 2; l173 = l173 + 1) {
			fVec66[l173] = 0.0f;
		}
		for (int l174 = 0; l174 < 2; l174 = l174 + 1) {
			fRec111[l174] = 0.0f;
		}
		for (int l175 = 0; l175 < 2; l175 = l175 + 1) {
			fRec109[l175] = 0.0f;
		}
		for (int l176 = 0; l176 < 2; l176 = l176 + 1) {
			fRec113[l176] = 0.0f;
		}
		for (int l177 = 0; l177 < 16384; l177 = l177 + 1) {
			fVec67[l177] = 0.0f;
		}
		for (int l178 = 0; l178 < 2; l178 = l178 + 1) {
			fVec68[l178] = 0.0f;
		}
		for (int l179 = 0; l179 < 2; l179 = l179 + 1) {
			fRec112[l179] = 0.0f;
		}
		for (int l180 = 0; l180 < 2; l180 = l180 + 1) {
			fRec110[l180] = 0.0f;
		}
		for (int l181 = 0; l181 < 2; l181 = l181 + 1) {
			fRec117[l181] = 0.0f;
		}
		for (int l182 = 0; l182 < 16384; l182 = l182 + 1) {
			fVec69[l182] = 0.0f;
		}
		for (int l183 = 0; l183 < 2; l183 = l183 + 1) {
			fVec70[l183] = 0.0f;
		}
		for (int l184 = 0; l184 < 2; l184 = l184 + 1) {
			fRec116[l184] = 0.0f;
		}
		for (int l185 = 0; l185 < 2; l185 = l185 + 1) {
			fRec114[l185] = 0.0f;
		}
		for (int l186 = 0; l186 < 16384; l186 = l186 + 1) {
			fVec71[l186] = 0.0f;
		}
		for (int l187 = 0; l187 < 2; l187 = l187 + 1) {
			fVec72[l187] = 0.0f;
		}
		for (int l188 = 0; l188 < 2; l188 = l188 + 1) {
			fRec118[l188] = 0.0f;
		}
		for (int l189 = 0; l189 < 2; l189 = l189 + 1) {
			fRec115[l189] = 0.0f;
		}
		for (int l190 = 0; l190 < 2; l190 = l190 + 1) {
			fRec0[l190] = 0.0f;
		}
		for (int l191 = 0; l191 < 2; l191 = l191 + 1) {
			fRec1[l191] = 0.0f;
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
	
	_FaustReverb* clone() {
		return new _FaustReverb();
	}
	
	int getSampleRate() {
		return fSampleRate;
	}
	
	void buildUserInterface(UI* ui_interface) {
		ui_interface->openVerticalBox("FaustReverb");
		ui_interface->addHorizontalSlider("Damping", &fHslider0, FAUSTFLOAT(0.5f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("Diffusion", &fHslider10, FAUSTFLOAT(0.707f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("HF Gain", &fHslider8, FAUSTFLOAT(1.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("High Crossover", &fHslider2, FAUSTFLOAT(5e+03f), FAUSTFLOAT(1e+03f), FAUSTFLOAT(1e+04f), FAUSTFLOAT(1.0f));
		ui_interface->addHorizontalSlider("LF Gain", &fHslider6, FAUSTFLOAT(1.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("Low Crossover", &fHslider1, FAUSTFLOAT(6e+02f), FAUSTFLOAT(1e+02f), FAUSTFLOAT(6e+03f), FAUSTFLOAT(1.0f));
		ui_interface->addHorizontalSlider("MID Gain", &fHslider7, FAUSTFLOAT(1.0f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("Mod Depth", &fHslider5, FAUSTFLOAT(0.1f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1.0f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("Mod Frequency", &fHslider4, FAUSTFLOAT(0.1f), FAUSTFLOAT(0.0f), FAUSTFLOAT(1e+01f), FAUSTFLOAT(0.01f));
		ui_interface->addHorizontalSlider("ReverbTime", &fHslider9, FAUSTFLOAT(4.2f), FAUSTFLOAT(0.1f), FAUSTFLOAT(12.0f), FAUSTFLOAT(0.1f));
		ui_interface->addHorizontalSlider("Size", &fHslider3, FAUSTFLOAT(3.5f), FAUSTFLOAT(0.5f), FAUSTFLOAT(5.0f), FAUSTFLOAT(0.01f));
		ui_interface->closeBox();
	}
	
	void compute(int count, FAUSTFLOAT** RESTRICT inputs, FAUSTFLOAT** RESTRICT outputs) {
		FAUSTFLOAT* input0 = inputs[0];
		FAUSTFLOAT* input1 = inputs[1];
		FAUSTFLOAT* output0 = outputs[0];
		FAUSTFLOAT* output1 = outputs[1];
		float fSlow0 = std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider0)));
		float fSlow1 = std::tan(fConst1 * std::max<float>(1e+02f, std::min<float>(6e+03f, float(fHslider1))));
		float fSlow2 = _FaustReverb_faustpower2_f(fSlow1);
		float fSlow3 = 1.0f / fSlow2;
		float fSlow4 = 2.0f * (1.0f - fSlow3);
		float fSlow5 = 1.0f / fSlow1;
		float fSlow6 = (fSlow5 + -0.618034f) / fSlow1 + 1.0f;
		float fSlow7 = 1.0f / ((fSlow5 + 0.618034f) / fSlow1 + 1.0f);
		float fSlow8 = (fSlow5 + -1.618034f) / fSlow1 + 1.0f;
		float fSlow9 = 1.0f / ((fSlow5 + 1.618034f) / fSlow1 + 1.0f);
		float fSlow10 = std::tan(fConst1 * std::max<float>(1e+03f, std::min<float>(1e+04f, float(fHslider2))));
		float fSlow11 = _FaustReverb_faustpower2_f(fSlow10);
		float fSlow12 = 1.0f / fSlow11;
		float fSlow13 = 2.0f * (1.0f - fSlow12);
		float fSlow14 = 1.0f / fSlow10;
		float fSlow15 = (fSlow14 + -0.618034f) / fSlow10 + 1.0f;
		float fSlow16 = (fSlow14 + 0.618034f) / fSlow10 + 1.0f;
		float fSlow17 = 1.0f / fSlow16;
		float fSlow18 = (fSlow14 + -1.618034f) / fSlow10 + 1.0f;
		float fSlow19 = 1.0f / ((fSlow14 + 1.618034f) / fSlow10 + 1.0f);
		float fSlow20 = std::max<float>(0.5f, std::min<float>(5.0f, float(fHslider3)));
		int iSlow21 = itbl0_FaustReverbSIG0[int(134.0f * fSlow20)];
		float fSlow22 = 0.005f * float(iSlow21);
		int iSlow23 = itbl0_FaustReverbSIG0[int(54.0f * fSlow20)];
		float fSlow24 = 0.005f * float(iSlow23);
		int iSlow25 = itbl0_FaustReverbSIG0[int(1e+01f * fSlow20)];
		float fSlow26 = 0.0001f * float(iSlow25);
		int iSlow27 = itbl0_FaustReverbSIG0[int(1.1e+02f * fSlow20)];
		float fSlow28 = 0.0001f * float(iSlow27);
		int iSlow29 = itbl0_FaustReverbSIG0[int(4e+01f * fSlow20)];
		float fSlow30 = 0.0001f * float(iSlow29);
		int iSlow31 = itbl0_FaustReverbSIG0[int(1.4e+02f * fSlow20)];
		float fSlow32 = 0.0001f * float(iSlow31);
		int iSlow33 = itbl0_FaustReverbSIG0[int(7e+01f * fSlow20)];
		float fSlow34 = 0.0001f * float(iSlow33);
		int iSlow35 = itbl0_FaustReverbSIG0[int(1.7e+02f * fSlow20)];
		float fSlow36 = 0.0001f * float(iSlow35);
		int iSlow37 = itbl0_FaustReverbSIG0[int(1e+02f * fSlow20)];
		float fSlow38 = 0.0001f * float(iSlow37);
		int iSlow39 = itbl0_FaustReverbSIG0[int(2e+02f * fSlow20)];
		float fSlow40 = 0.0001f * float(iSlow39);
		int iSlow41 = itbl0_FaustReverbSIG0[int(1.3e+02f * fSlow20)];
		float fSlow42 = 0.0001f * float(iSlow41);
		int iSlow43 = itbl0_FaustReverbSIG0[int(2.3e+02f * fSlow20)];
		float fSlow44 = 0.0001f * float(iSlow43);
		float fSlow45 = fConst2 * std::max<float>(0.0f, std::min<float>(1e+01f, float(fHslider4)));
		float fSlow46 = std::cos(fSlow45);
		float fSlow47 = std::sin(fSlow45);
		float fSlow48 = 5e+01f * std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider5)));
		int iSlow49 = itbl0_FaustReverbSIG0[int(125.0f * fSlow20)];
		float fSlow50 = 0.0001f * float(iSlow49);
		int iSlow51 = itbl0_FaustReverbSIG0[int(204.0f * fSlow20)];
		float fSlow52 = 0.005f * float(iSlow51);
		float fSlow53 = 0.0f - fSlow48;
		int iSlow54 = itbl0_FaustReverbSIG0[int(25.0f * fSlow20)];
		float fSlow55 = 0.0001f * float(iSlow54);
		int iSlow56 = itbl0_FaustReverbSIG0[int(155.0f * fSlow20)];
		float fSlow57 = 0.0001f * float(iSlow56);
		int iSlow58 = itbl0_FaustReverbSIG0[int(55.0f * fSlow20)];
		float fSlow59 = 0.0001f * float(iSlow58);
		int iSlow60 = itbl0_FaustReverbSIG0[int(185.0f * fSlow20)];
		float fSlow61 = 0.0001f * float(iSlow60);
		int iSlow62 = itbl0_FaustReverbSIG0[int(85.0f * fSlow20)];
		float fSlow63 = 0.0001f * float(iSlow62);
		int iSlow64 = itbl0_FaustReverbSIG0[int(215.0f * fSlow20)];
		float fSlow65 = 0.0001f * float(iSlow64);
		int iSlow66 = itbl0_FaustReverbSIG0[int(115.0f * fSlow20)];
		float fSlow67 = 0.0001f * float(iSlow66);
		int iSlow68 = itbl0_FaustReverbSIG0[int(245.0f * fSlow20)];
		float fSlow69 = 0.0001f * float(iSlow68);
		int iSlow70 = itbl0_FaustReverbSIG0[int(145.0f * fSlow20)];
		float fSlow71 = 0.0001f * float(iSlow70);
		float fSlow72 = 1.0f - fSlow14;
		float fSlow73 = fSlow14 + 1.0f;
		float fSlow74 = 1.0f / fSlow73;
		float fSlow75 = 1.0f - fSlow5;
		float fSlow76 = fSlow5 + 1.0f;
		float fSlow77 = 1.0f / fSlow76;
		float fSlow78 = std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider6)));
		float fSlow79 = 1.0f / (fSlow16 * fSlow1);
		float fSlow80 = 0.0f - 1.0f / (fSlow1 * fSlow76);
		float fSlow81 = 0.0f - 2.0f / fSlow2;
		float fSlow82 = std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider7)));
		float fSlow83 = (fSlow5 + -1.618034f) / fSlow1 + 1.0f;
		float fSlow84 = 1.0f / ((fSlow5 + 1.618034f) / fSlow1 + 1.0f);
		float fSlow85 = 0.0f - 1.0f / (fSlow10 * fSlow73);
		float fSlow86 = 0.0f - 2.0f / fSlow11;
		float fSlow87 = std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider8)));
		float fSlow88 = std::pow(1e+01f, 0.0f - 0.51f * ((1.25f * fSlow20 + -0.25f) / std::max<float>(0.1f, std::min<float>(12.0f, float(fHslider9)))));
		float fSlow89 = 1.0f - fSlow0;
		float fSlow90 = std::max<float>(0.0f, std::min<float>(1.0f, float(fHslider10)));
		float fSlow91 = std::sin(fSlow90);
		int iSlow92 = itbl0_FaustReverbSIG0[int(34.0f * fSlow20)];
		float fSlow93 = 0.005f * float(iSlow92);
		float fSlow94 = std::cos(fSlow90);
		int iSlow95 = itbl0_FaustReverbSIG0[int(2.4e+02f * fSlow20)];
		float fSlow96 = 0.0001f * float(iSlow95);
		int iSlow97 = itbl0_FaustReverbSIG0[int(1.9e+02f * fSlow20)];
		float fSlow98 = 0.0001f * float(iSlow97);
		int iSlow99 = itbl0_FaustReverbSIG0[int(175.0f * fSlow20)];
		float fSlow100 = 0.0001f * float(iSlow99);
		for (int i0 = 0; i0 < count; i0 = i0 + 1) {
			iVec0[0] = 1;
			int iTemp0 = 1 - iVec0[1];
			fRec10[0] = 0.995f * (fRec10[1] + float(iTemp0 * iSlow21)) + fSlow22;
			float fTemp1 = fRec10[0] + -1.49999f;
			float fTemp2 = std::floor(fTemp1);
			fRec12[0] = 0.995f * (fRec12[1] + float(iTemp0 * iSlow23)) + fSlow24;
			float fTemp3 = fRec12[0] + -1.49999f;
			float fTemp4 = std::floor(fTemp3);
			fRec16[0] = 0.9999f * (fRec16[1] + float(iTemp0 * iSlow25)) + fSlow26;
			float fTemp5 = fRec16[0] + -1.49999f;
			float fTemp6 = std::floor(fTemp5);
			float fTemp7 = 0.760314f * fRec1[1] - 0.64955574f * fRec14[1];
			float fTemp8 = 0.760314f * fRec0[1] - 0.64955574f * fRec13[1];
			fVec1[IOTA0 & 16383] = 0.70710677f * fTemp8 - 0.70710677f * fTemp7;
			float fTemp9 = fVec1[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp5)))) & 16383];
			fVec2[0] = fTemp9;
			fRec15[0] = fVec2[1] - (fTemp6 + (2.0f - fRec16[0])) * (fRec15[1] - fTemp9) / (fRec16[0] - fTemp6);
			fRec13[0] = fRec15[0];
			fRec18[0] = 0.9999f * (fRec18[1] + float(iTemp0 * iSlow27)) + fSlow28;
			float fTemp10 = fRec18[0] + -1.49999f;
			float fTemp11 = std::floor(fTemp10);
			fVec3[IOTA0 & 16383] = 0.70710677f * fTemp8 + 0.70710677f * fTemp7;
			float fTemp12 = fVec3[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp10)))) & 16383];
			fVec4[0] = fTemp12;
			fRec17[0] = fVec4[1] - (fTemp11 + (2.0f - fRec18[0])) * (fRec17[1] - fTemp12) / (fRec18[0] - fTemp11);
			fRec14[0] = fRec17[0];
			float fTemp13 = 0.760314f * fRec13[1] + 0.64955574f * fRec0[1];
			fRec22[0] = 0.9999f * (fRec22[1] + float(iTemp0 * iSlow29)) + fSlow30;
			float fTemp14 = fRec22[0] + -1.49999f;
			float fTemp15 = std::floor(fTemp14);
			float fTemp16 = 0.760314f * fRec14[1] + 0.64955574f * fRec1[1];
			float fTemp17 = 0.760314f * fTemp16 - 0.64955574f * fRec20[1];
			float fTemp18 = 0.760314f * fTemp13 - 0.64955574f * fRec19[1];
			fVec5[IOTA0 & 16383] = 0.70710677f * fTemp18 - 0.70710677f * fTemp17;
			float fTemp19 = fVec5[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp14)))) & 16383];
			fVec6[0] = fTemp19;
			fRec21[0] = fVec6[1] - (fTemp15 + (2.0f - fRec22[0])) * (fRec21[1] - fTemp19) / (fRec22[0] - fTemp15);
			fRec19[0] = fRec21[0];
			fRec24[0] = 0.9999f * (fRec24[1] + float(iTemp0 * iSlow31)) + fSlow32;
			float fTemp20 = fRec24[0] + -1.49999f;
			float fTemp21 = std::floor(fTemp20);
			fVec7[IOTA0 & 16383] = 0.70710677f * fTemp18 + 0.70710677f * fTemp17;
			float fTemp22 = fVec7[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp20)))) & 16383];
			fVec8[0] = fTemp22;
			fRec23[0] = fVec8[1] - (fTemp21 + (2.0f - fRec24[0])) * (fRec23[1] - fTemp22) / (fRec24[0] - fTemp21);
			fRec20[0] = fRec23[0];
			float fTemp23 = 0.760314f * fRec19[1] + 0.64955574f * fTemp13;
			fRec28[0] = 0.9999f * (fRec28[1] + float(iTemp0 * iSlow33)) + fSlow34;
			float fTemp24 = fRec28[0] + -1.49999f;
			float fTemp25 = std::floor(fTemp24);
			float fTemp26 = 0.760314f * fRec20[1] + 0.64955574f * fTemp16;
			float fTemp27 = 0.760314f * fTemp26 - 0.64955574f * fRec26[1];
			float fTemp28 = 0.760314f * fTemp23 - 0.64955574f * fRec25[1];
			fVec9[IOTA0 & 16383] = 0.70710677f * fTemp28 - 0.70710677f * fTemp27;
			float fTemp29 = fVec9[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp24)))) & 16383];
			fVec10[0] = fTemp29;
			fRec27[0] = fVec10[1] - (fTemp25 + (2.0f - fRec28[0])) * (fRec27[1] - fTemp29) / (fRec28[0] - fTemp25);
			fRec25[0] = fRec27[0];
			fRec30[0] = 0.9999f * (fRec30[1] + float(iTemp0 * iSlow35)) + fSlow36;
			float fTemp30 = fRec30[0] + -1.49999f;
			float fTemp31 = std::floor(fTemp30);
			fVec11[IOTA0 & 16383] = 0.70710677f * fTemp28 + 0.70710677f * fTemp27;
			float fTemp32 = fVec11[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp30)))) & 16383];
			fVec12[0] = fTemp32;
			fRec29[0] = fVec12[1] - (fTemp31 + (2.0f - fRec30[0])) * (fRec29[1] - fTemp32) / (fRec30[0] - fTemp31);
			fRec26[0] = fRec29[0];
			float fTemp33 = 0.760314f * fRec25[1] + 0.64955574f * fTemp23;
			fRec34[0] = 0.9999f * (fRec34[1] + float(iTemp0 * iSlow37)) + fSlow38;
			float fTemp34 = fRec34[0] + -1.49999f;
			float fTemp35 = std::floor(fTemp34);
			float fTemp36 = 0.760314f * fRec26[1] + 0.64955574f * fTemp26;
			float fTemp37 = 0.760314f * fTemp36 - 0.64955574f * fRec32[1];
			float fTemp38 = 0.760314f * fTemp33 - 0.64955574f * fRec31[1];
			fVec13[IOTA0 & 16383] = 0.70710677f * fTemp38 - 0.70710677f * fTemp37;
			float fTemp39 = fVec13[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp34)))) & 16383];
			fVec14[0] = fTemp39;
			fRec33[0] = fVec14[1] - (fTemp35 + (2.0f - fRec34[0])) * (fRec33[1] - fTemp39) / (fRec34[0] - fTemp35);
			fRec31[0] = fRec33[0];
			fRec36[0] = 0.9999f * (fRec36[1] + float(iTemp0 * iSlow39)) + fSlow40;
			float fTemp40 = fRec36[0] + -1.49999f;
			float fTemp41 = std::floor(fTemp40);
			fVec15[IOTA0 & 16383] = 0.70710677f * fTemp38 + 0.70710677f * fTemp37;
			float fTemp42 = fVec15[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp40)))) & 16383];
			fVec16[0] = fTemp42;
			fRec35[0] = fVec16[1] - (fTemp41 + (2.0f - fRec36[0])) * (fRec35[1] - fTemp42) / (fRec36[0] - fTemp41);
			fRec32[0] = fRec35[0];
			float fTemp43 = 0.760314f * fRec31[1] + 0.64955574f * fTemp33;
			fRec40[0] = 0.9999f * (fRec40[1] + float(iTemp0 * iSlow41)) + fSlow42;
			float fTemp44 = fRec40[0] + -1.49999f;
			float fTemp45 = std::floor(fTemp44);
			float fTemp46 = 0.760314f * fRec32[1] + 0.64955574f * fTemp36;
			float fTemp47 = 0.760314f * fTemp46 - 0.64955574f * fRec38[1];
			float fTemp48 = 0.760314f * fTemp43 - 0.64955574f * fRec37[1];
			fVec17[IOTA0 & 16383] = 0.70710677f * fTemp48 - 0.70710677f * fTemp47;
			float fTemp49 = fVec17[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp44)))) & 16383];
			fVec18[0] = fTemp49;
			fRec39[0] = fVec18[1] - (fTemp45 + (2.0f - fRec40[0])) * (fRec39[1] - fTemp49) / (fRec40[0] - fTemp45);
			fRec37[0] = fRec39[0];
			fRec42[0] = 0.9999f * (fRec42[1] + float(iTemp0 * iSlow43)) + fSlow44;
			float fTemp50 = fRec42[0] + -1.49999f;
			float fTemp51 = std::floor(fTemp50);
			fVec19[IOTA0 & 16383] = 0.70710677f * fTemp48 + 0.70710677f * fTemp47;
			float fTemp52 = fVec19[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp50)))) & 16383];
			fVec20[0] = fTemp52;
			fRec41[0] = fVec20[1] - (fTemp51 + (2.0f - fRec42[0])) * (fRec41[1] - fTemp52) / (fRec42[0] - fTemp51);
			fRec38[0] = fRec41[0];
			float fTemp53 = 0.760314f * fRec37[1] + 0.64955574f * fTemp43;
			fVec21[IOTA0 & 1023] = fTemp53;
			fRec43[0] = fSlow47 * fRec44[1] + fSlow46 * fRec43[1];
			fRec44[0] = float(iTemp0) + fSlow46 * fRec44[1] - fSlow47 * fRec43[1];
			float fTemp54 = fSlow48 * (fRec44[0] + 1.0f);
			float fTemp55 = fTemp54 + 3.500005f;
			int iTemp56 = int(fTemp55);
			int iTemp57 = std::min<int>(512, std::max<int>(0, iTemp56 + 4));
			float fTemp58 = std::floor(fTemp55);
			float fTemp59 = fTemp54 + (2.0f - fTemp58);
			float fTemp60 = fTemp54 + (3.0f - fTemp58);
			float fTemp61 = fTemp54 + (4.0f - fTemp58);
			float fTemp62 = fTemp61 * fTemp60;
			float fTemp63 = fTemp62 * fTemp59;
			float fTemp64 = fTemp54 + (1.0f - fTemp58);
			float fTemp65 = 0.0f - fTemp64;
			int iTemp66 = std::min<int>(512, std::max<int>(0, iTemp56 + 3));
			float fTemp67 = 0.0f - 0.5f * fTemp64;
			float fTemp68 = 0.0f - fTemp59;
			int iTemp69 = std::min<int>(512, std::max<int>(0, iTemp56 + 2));
			float fTemp70 = 0.0f - 0.33333334f * fTemp64;
			float fTemp71 = 0.0f - 0.5f * fTemp59;
			float fTemp72 = 0.0f - fTemp60;
			int iTemp73 = std::min<int>(512, std::max<int>(0, iTemp56 + 1));
			float fTemp74 = fTemp54 + (5.0f - fTemp58);
			float fTemp75 = 0.0f - 0.25f * fTemp64;
			float fTemp76 = 0.0f - 0.33333334f * fTemp59;
			float fTemp77 = 0.0f - 0.5f * fTemp60;
			float fTemp78 = 0.0f - fTemp61;
			int iTemp79 = std::min<int>(512, std::max<int>(0, iTemp56));
			fVec22[IOTA0 & 16383] = fVec21[(IOTA0 - iTemp79) & 1023] * fTemp78 * fTemp77 * fTemp76 * fTemp75 + fTemp74 * (fVec21[(IOTA0 - iTemp73) & 1023] * fTemp72 * fTemp71 * fTemp70 + 0.5f * fTemp61 * fVec21[(IOTA0 - iTemp69) & 1023] * fTemp68 * fTemp67 + 0.16666667f * fTemp62 * fVec21[(IOTA0 - iTemp66) & 1023] * fTemp65 + 0.041666668f * fTemp63 * fVec21[(IOTA0 - iTemp57) & 1023]);
			float fTemp80 = fVec22[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp3)))) & 16383];
			fVec23[0] = fTemp80;
			fRec11[0] = fVec23[1] - (fTemp4 + (2.0f - fRec12[0])) * (fRec11[1] - fTemp80) / (fRec12[0] - fTemp4);
			fRec48[0] = 0.9999f * (fRec48[1] + float(iTemp0 * iSlow49)) + fSlow50;
			float fTemp81 = fRec48[0] + -1.49999f;
			float fTemp82 = std::floor(fTemp81);
			fRec50[0] = 0.995f * (fRec50[1] + float(iTemp0 * iSlow51)) + fSlow52;
			float fTemp83 = fRec50[0] + -1.49999f;
			float fTemp84 = std::floor(fTemp83);
			float fTemp85 = 0.760314f * fRec38[1] + 0.64955574f * fTemp46;
			fVec24[IOTA0 & 1023] = fTemp85;
			float fTemp86 = fSlow53 * fRec44[0];
			float fTemp87 = fSlow48 + fTemp86 + 3.500005f;
			int iTemp88 = int(fTemp87);
			float fTemp89 = std::floor(fTemp87);
			float fTemp90 = fSlow48 + fTemp86 + (2.0f - fTemp89);
			float fTemp91 = fSlow48 + fTemp86 + (3.0f - fTemp89);
			float fTemp92 = fSlow48 + fTemp86 + (4.0f - fTemp89);
			float fTemp93 = fTemp92 * fTemp91;
			float fTemp94 = fSlow48 + fTemp86 + (1.0f - fTemp89);
			fVec25[IOTA0 & 16383] = fVec24[(IOTA0 - std::min<int>(512, std::max<int>(0, iTemp88))) & 1023] * (0.0f - fTemp92) * (0.0f - 0.5f * fTemp91) * (0.0f - 0.33333334f * fTemp90) * (0.0f - 0.25f * fTemp94) + (fSlow48 + fTemp86 + (5.0f - fTemp89)) * (fVec24[(IOTA0 - std::min<int>(512, std::max<int>(0, iTemp88 + 1))) & 1023] * (0.0f - fTemp91) * (0.0f - 0.5f * fTemp90) * (0.0f - 0.33333334f * fTemp94) + 0.5f * fTemp92 * fVec24[(IOTA0 - std::min<int>(512, std::max<int>(0, iTemp88 + 2))) & 1023] * (0.0f - fTemp90) * (0.0f - 0.5f * fTemp94) + 0.16666667f * fTemp93 * fVec24[(IOTA0 - std::min<int>(512, std::max<int>(0, iTemp88 + 3))) & 1023] * (0.0f - fTemp94) + 0.041666668f * fTemp93 * fTemp90 * fVec24[(IOTA0 - std::min<int>(512, std::max<int>(0, iTemp88 + 4))) & 1023]);
			float fTemp95 = fVec25[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp83)))) & 16383];
			fVec26[0] = fTemp95;
			fRec49[0] = fVec26[1] - (fTemp84 + (2.0f - fRec50[0])) * (fRec49[1] - fTemp95) / (fRec50[0] - fTemp84);
			float fTemp96 = 0.760314f * fRec49[0] - 0.64955574f * fRec46[1];
			float fTemp97 = 0.760314f * fRec11[0] - 0.64955574f * fRec45[1];
			fVec27[IOTA0 & 16383] = 0.70710677f * fTemp97 - 0.70710677f * fTemp96;
			float fTemp98 = fVec27[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp81)))) & 16383];
			fVec28[0] = fTemp98;
			fRec47[0] = fVec28[1] - (fTemp82 + (2.0f - fRec48[0])) * (fRec47[1] - fTemp98) / (fRec48[0] - fTemp82);
			fRec45[0] = fRec47[0];
			fRec52[0] = 0.9999f * (fRec52[1] + float(iTemp0 * iSlow54)) + fSlow55;
			float fTemp99 = fRec52[0] + -1.49999f;
			float fTemp100 = std::floor(fTemp99);
			fVec29[IOTA0 & 16383] = 0.70710677f * fTemp97 + 0.70710677f * fTemp96;
			float fTemp101 = fVec29[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp99)))) & 16383];
			fVec30[0] = fTemp101;
			fRec51[0] = fVec30[1] - (fTemp100 + (2.0f - fRec52[0])) * (fRec51[1] - fTemp101) / (fRec52[0] - fTemp100);
			fRec46[0] = fRec51[0];
			float fTemp102 = 0.760314f * fRec45[1] + 0.64955574f * fRec11[0];
			fRec56[0] = 0.9999f * (fRec56[1] + float(iTemp0 * iSlow56)) + fSlow57;
			float fTemp103 = fRec56[0] + -1.49999f;
			float fTemp104 = std::floor(fTemp103);
			float fTemp105 = 0.760314f * fRec46[1] + 0.64955574f * fRec49[0];
			float fTemp106 = 0.760314f * fTemp105 - 0.64955574f * fRec54[1];
			float fTemp107 = 0.760314f * fTemp102 - 0.64955574f * fRec53[1];
			fVec31[IOTA0 & 16383] = 0.70710677f * fTemp107 - 0.70710677f * fTemp106;
			float fTemp108 = fVec31[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp103)))) & 16383];
			fVec32[0] = fTemp108;
			fRec55[0] = fVec32[1] - (fTemp104 + (2.0f - fRec56[0])) * (fRec55[1] - fTemp108) / (fRec56[0] - fTemp104);
			fRec53[0] = fRec55[0];
			fRec58[0] = 0.9999f * (fRec58[1] + float(iTemp0 * iSlow58)) + fSlow59;
			float fTemp109 = fRec58[0] + -1.49999f;
			float fTemp110 = std::floor(fTemp109);
			float fTemp111 = fRec58[0] - fTemp110;
			fVec33[IOTA0 & 16383] = 0.70710677f * fTemp107 + 0.70710677f * fTemp106;
			int iTemp112 = std::min<int>(8192, std::max<int>(0, int(fTemp109)));
			float fTemp113 = fVec33[(IOTA0 - iTemp112) & 16383];
			fVec34[0] = fTemp113;
			float fTemp114 = fTemp110 + (2.0f - fRec58[0]);
			fRec57[0] = fVec34[1] - fTemp114 * (fRec57[1] - fTemp113) / fTemp111;
			fRec54[0] = fRec57[0];
			float fTemp115 = 0.760314f * fRec53[1] + 0.64955574f * fTemp102;
			fRec62[0] = 0.9999f * (fRec62[1] + float(iTemp0 * iSlow60)) + fSlow61;
			float fTemp116 = fRec62[0] + -1.49999f;
			float fTemp117 = std::floor(fTemp116);
			float fTemp118 = 0.760314f * fRec54[1] + 0.64955574f * fTemp105;
			float fTemp119 = 0.760314f * fTemp118 - 0.64955574f * fRec60[1];
			float fTemp120 = 0.760314f * fTemp115 - 0.64955574f * fRec59[1];
			fVec35[IOTA0 & 16383] = 0.70710677f * fTemp120 - 0.70710677f * fTemp119;
			float fTemp121 = fVec35[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp116)))) & 16383];
			fVec36[0] = fTemp121;
			fRec61[0] = fVec36[1] - (fTemp117 + (2.0f - fRec62[0])) * (fRec61[1] - fTemp121) / (fRec62[0] - fTemp117);
			fRec59[0] = fRec61[0];
			fRec64[0] = 0.9999f * (fRec64[1] + float(iTemp0 * iSlow62)) + fSlow63;
			float fTemp122 = fRec64[0] + -1.49999f;
			float fTemp123 = std::floor(fTemp122);
			float fTemp124 = fRec64[0] - fTemp123;
			fVec37[IOTA0 & 16383] = 0.70710677f * fTemp120 + 0.70710677f * fTemp119;
			int iTemp125 = std::min<int>(8192, std::max<int>(0, int(fTemp122)));
			float fTemp126 = fVec37[(IOTA0 - iTemp125) & 16383];
			fVec38[0] = fTemp126;
			float fTemp127 = fTemp123 + (2.0f - fRec64[0]);
			fRec63[0] = fVec38[1] - fTemp127 * (fRec63[1] - fTemp126) / fTemp124;
			fRec60[0] = fRec63[0];
			float fTemp128 = 0.760314f * fRec59[1] + 0.64955574f * fTemp115;
			fRec68[0] = 0.9999f * (fRec68[1] + float(iTemp0 * iSlow64)) + fSlow65;
			float fTemp129 = fRec68[0] + -1.49999f;
			float fTemp130 = std::floor(fTemp129);
			float fTemp131 = fRec68[0] - fTemp130;
			float fTemp132 = 0.760314f * fRec60[1] + 0.64955574f * fTemp118;
			float fTemp133 = 0.760314f * fTemp132 - 0.64955574f * fRec66[1];
			float fTemp134 = 0.760314f * fTemp128 - 0.64955574f * fRec65[1];
			fVec39[IOTA0 & 16383] = 0.70710677f * fTemp134 - 0.70710677f * fTemp133;
			int iTemp135 = std::min<int>(8192, std::max<int>(0, int(fTemp129)));
			float fTemp136 = fVec39[(IOTA0 - iTemp135) & 16383];
			fVec40[0] = fTemp136;
			float fTemp137 = fTemp130 + (2.0f - fRec68[0]);
			fRec67[0] = fVec40[1] - fTemp137 * (fRec67[1] - fTemp136) / fTemp131;
			fRec65[0] = fRec67[0];
			fRec70[0] = 0.9999f * (fRec70[1] + float(iTemp0 * iSlow66)) + fSlow67;
			float fTemp138 = fRec70[0] + -1.49999f;
			float fTemp139 = std::floor(fTemp138);
			float fTemp140 = fRec70[0] - fTemp139;
			fVec41[IOTA0 & 16383] = 0.70710677f * fTemp134 + 0.70710677f * fTemp133;
			int iTemp141 = std::min<int>(8192, std::max<int>(0, int(fTemp138)));
			float fTemp142 = fVec41[(IOTA0 - iTemp141) & 16383];
			fVec42[0] = fTemp142;
			float fTemp143 = fTemp139 + (2.0f - fRec70[0]);
			fRec69[0] = fVec42[1] - fTemp143 * (fRec69[1] - fTemp142) / fTemp140;
			fRec66[0] = fRec69[0];
			float fTemp144 = 0.760314f * fRec65[1] + 0.64955574f * fTemp128;
			fRec74[0] = 0.9999f * (fRec74[1] + float(iTemp0 * iSlow68)) + fSlow69;
			float fTemp145 = fRec74[0] + -1.49999f;
			float fTemp146 = std::floor(fTemp145);
			float fTemp147 = 0.760314f * fRec66[1] + 0.64955574f * fTemp132;
			float fTemp148 = 0.760314f * fTemp147 - 0.64955574f * fRec72[1];
			float fTemp149 = 0.760314f * fTemp144 - 0.64955574f * fRec71[1];
			fVec43[IOTA0 & 16383] = 0.70710677f * fTemp149 - 0.70710677f * fTemp148;
			float fTemp150 = fVec43[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp145)))) & 16383];
			fVec44[0] = fTemp150;
			fRec73[0] = fVec44[1] - (fTemp146 + (2.0f - fRec74[0])) * (fRec73[1] - fTemp150) / (fRec74[0] - fTemp146);
			fRec71[0] = fRec73[0];
			fRec76[0] = 0.9999f * (fRec76[1] + float(iTemp0 * iSlow70)) + fSlow71;
			float fTemp151 = fRec76[0] + -1.49999f;
			float fTemp152 = std::floor(fTemp151);
			float fTemp153 = fRec76[0] - fTemp152;
			fVec45[IOTA0 & 16383] = 0.70710677f * fTemp149 + 0.70710677f * fTemp148;
			int iTemp154 = std::min<int>(8192, std::max<int>(0, int(fTemp151)));
			float fTemp155 = fVec45[(IOTA0 - iTemp154) & 16383];
			fVec46[0] = fTemp155;
			float fTemp156 = fTemp152 + (2.0f - fRec76[0]);
			fRec75[0] = fVec46[1] - fTemp156 * (fRec75[1] - fTemp155) / fTemp153;
			fRec72[0] = fRec75[0];
			float fTemp157 = 0.760314f * fRec71[1] + 0.64955574f * fTemp144;
			fVec47[IOTA0 & 16383] = fTemp157;
			float fTemp158 = fSlow48 * (fRec43[0] + 1.0f);
			float fTemp159 = fTemp158 + 3.500005f;
			int iTemp160 = int(fTemp159);
			int iTemp161 = std::max<int>(0, iTemp160 + 4);
			float fTemp162 = std::floor(fTemp159);
			float fTemp163 = fTemp158 + (2.0f - fTemp162);
			float fTemp164 = fTemp158 + (3.0f - fTemp162);
			float fTemp165 = fTemp158 + (4.0f - fTemp162);
			float fTemp166 = fTemp165 * fTemp164;
			float fTemp167 = fTemp166 * fTemp163;
			float fTemp168 = fTemp158 + (1.0f - fTemp162);
			float fTemp169 = 0.0f - fTemp168;
			int iTemp170 = std::max<int>(0, iTemp160 + 3);
			float fTemp171 = 0.0f - 0.5f * fTemp168;
			float fTemp172 = 0.0f - fTemp163;
			int iTemp173 = std::max<int>(0, iTemp160 + 2);
			float fTemp174 = 0.0f - 0.33333334f * fTemp168;
			float fTemp175 = 0.0f - 0.5f * fTemp163;
			float fTemp176 = 0.0f - fTemp164;
			int iTemp177 = std::max<int>(0, iTemp160 + 1);
			float fTemp178 = fTemp158 + (5.0f - fTemp162);
			float fTemp179 = 0.0f - 0.25f * fTemp168;
			float fTemp180 = 0.0f - 0.33333334f * fTemp163;
			float fTemp181 = 0.0f - 0.5f * fTemp164;
			float fTemp182 = 0.0f - fTemp165;
			int iTemp183 = std::max<int>(0, iTemp160);
			fVec48[IOTA0 & 16383] = fVec47[(IOTA0 - std::min<int>(8192, iTemp183)) & 16383] * fTemp182 * fTemp181 * fTemp180 * fTemp179 + fTemp178 * (fVec47[(IOTA0 - std::min<int>(8192, iTemp177)) & 16383] * fTemp176 * fTemp175 * fTemp174 + 0.5f * fTemp165 * fVec47[(IOTA0 - std::min<int>(8192, iTemp173)) & 16383] * fTemp172 * fTemp171 + 0.16666667f * fTemp166 * fVec47[(IOTA0 - std::min<int>(8192, iTemp170)) & 16383] * fTemp169 + 0.041666668f * fTemp167 * fVec47[(IOTA0 - std::min<int>(8192, iTemp161)) & 16383]);
			float fTemp184 = fVec48[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp1)))) & 16383];
			fVec49[0] = fTemp184;
			fRec9[0] = fVec49[1] - (fTemp2 + (2.0f - fRec10[0])) * (fRec9[1] - fTemp184) / (fRec10[0] - fTemp2);
			fRec8[0] = 0.0f - fSlow74 * (fSlow72 * fRec8[1] - (fRec9[0] + fRec9[1]));
			fRec7[0] = fRec8[0] - fSlow19 * (fSlow18 * fRec7[2] + fSlow13 * fRec7[1]);
			fRec6[0] = fSlow19 * (fRec7[2] + fRec7[0] + 2.0f * fRec7[1]) - fSlow17 * (fSlow15 * fRec6[2] + fSlow13 * fRec6[1]);
			float fTemp185 = fRec6[2] + fRec6[0] + 2.0f * fRec6[1];
			float fTemp186 = fSlow17 * fTemp185;
			fVec50[0] = fTemp186;
			fRec5[0] = 0.0f - fSlow77 * (fSlow75 * fRec5[1] - (fTemp186 + fVec50[1]));
			fRec4[0] = fRec5[0] - fSlow9 * (fSlow8 * fRec4[2] + fSlow4 * fRec4[1]);
			fRec3[0] = fSlow9 * (fRec4[2] + fRec4[0] + 2.0f * fRec4[1]) - fSlow7 * (fSlow6 * fRec3[2] + fSlow4 * fRec3[1]);
			fRec79[0] = fSlow80 * fVec50[1] - fSlow77 * (fSlow75 * fRec79[1] - fSlow79 * fTemp185);
			fRec78[0] = fRec79[0] - fSlow9 * (fSlow8 * fRec78[2] + fSlow4 * fRec78[1]);
			fRec77[0] = fSlow9 * (fSlow3 * fRec78[0] + fSlow81 * fRec78[1] + fSlow3 * fRec78[2]) - fSlow7 * (fSlow6 * fRec77[2] + fSlow4 * fRec77[1]);
			float fTemp187 = fSlow4 * fRec80[1];
			fRec83[0] = fSlow85 * fRec9[1] - fSlow74 * (fSlow72 * fRec83[1] - fSlow14 * fRec9[0]);
			fRec82[0] = fRec83[0] - fSlow19 * (fSlow18 * fRec82[2] + fSlow13 * fRec82[1]);
			fRec81[0] = fSlow19 * (fSlow12 * fRec82[0] + fSlow86 * fRec82[1] + fSlow12 * fRec82[2]) - fSlow17 * (fSlow15 * fRec81[2] + fSlow13 * fRec81[1]);
			fRec80[0] = fSlow17 * (fSlow12 * fRec81[0] + fSlow86 * fRec81[1] + fSlow12 * fRec81[2]) - fSlow84 * (fSlow83 * fRec80[2] + fTemp187);
			float fTemp188 = float(input0[i0]) + fSlow88 * (fSlow87 * (fRec80[2] + fSlow84 * (fTemp187 + fSlow83 * fRec80[0])) + fSlow7 * (fSlow82 * (fSlow3 * fRec77[0] + fSlow81 * fRec77[1] + fSlow3 * fRec77[2]) + fSlow78 * (fRec3[2] + fRec3[0] + 2.0f * fRec3[1])));
			fVec51[IOTA0 & 1023] = fTemp188;
			fRec2[0] = fSlow89 * (fTemp182 * fTemp181 * fTemp180 * fTemp179 * fVec51[(IOTA0 - std::min<int>(512, iTemp183)) & 1023] + fTemp178 * (fTemp176 * fTemp175 * fTemp174 * fVec51[(IOTA0 - std::min<int>(512, iTemp177)) & 1023] + 0.5f * fTemp165 * fTemp172 * fTemp171 * fVec51[(IOTA0 - std::min<int>(512, iTemp173)) & 1023] + 0.16666667f * fTemp166 * fTemp169 * fVec51[(IOTA0 - std::min<int>(512, iTemp170)) & 1023] + 0.041666668f * fTemp167 * fVec51[(IOTA0 - std::min<int>(512, iTemp161)) & 1023])) + fSlow0 * fRec2[1];
			fRec95[0] = 0.995f * (fRec95[1] + float(iTemp0 * iSlow92)) + fSlow93;
			float fTemp189 = fRec95[0] + -1.49999f;
			float fTemp190 = std::floor(fTemp189);
			float fTemp191 = 0.760314f * fRec72[1] + 0.64955574f * fTemp147;
			fVec52[IOTA0 & 16383] = fTemp191;
			float fTemp192 = fSlow53 * fRec43[0];
			float fTemp193 = fSlow48 + fTemp192 + 3.500005f;
			int iTemp194 = int(fTemp193);
			float fTemp195 = std::floor(fTemp193);
			float fTemp196 = fSlow48 + fTemp192 + (2.0f - fTemp195);
			float fTemp197 = fSlow48 + fTemp192 + (3.0f - fTemp195);
			float fTemp198 = fSlow48 + fTemp192 + (4.0f - fTemp195);
			float fTemp199 = fTemp198 * fTemp197;
			float fTemp200 = fSlow48 + fTemp192 + (1.0f - fTemp195);
			fVec53[IOTA0 & 16383] = fVec52[(IOTA0 - std::min<int>(8192, std::max<int>(0, iTemp194))) & 16383] * (0.0f - fTemp198) * (0.0f - 0.5f * fTemp197) * (0.0f - 0.33333334f * fTemp196) * (0.0f - 0.25f * fTemp200) + (fSlow48 + fTemp192 + (5.0f - fTemp195)) * (fVec52[(IOTA0 - std::min<int>(8192, std::max<int>(0, iTemp194 + 1))) & 16383] * (0.0f - fTemp197) * (0.0f - 0.5f * fTemp196) * (0.0f - 0.33333334f * fTemp200) + 0.5f * fTemp198 * fVec52[(IOTA0 - std::min<int>(8192, std::max<int>(0, iTemp194 + 2))) & 16383] * (0.0f - fTemp196) * (0.0f - 0.5f * fTemp200) + 0.16666667f * fTemp199 * fVec52[(IOTA0 - std::min<int>(8192, std::max<int>(0, iTemp194 + 3))) & 16383] * (0.0f - fTemp200) + 0.041666668f * fTemp199 * fTemp196 * fVec52[(IOTA0 - std::min<int>(8192, std::max<int>(0, iTemp194 + 4))) & 16383]);
			float fTemp201 = fVec53[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp189)))) & 16383];
			fVec54[0] = fTemp201;
			fRec94[0] = fVec54[1] - (fTemp190 + (2.0f - fRec95[0])) * (fRec94[1] - fTemp201) / (fRec95[0] - fTemp190);
			fRec93[0] = 0.0f - fSlow74 * (fSlow72 * fRec93[1] - (fRec94[0] + fRec94[1]));
			fRec92[0] = fRec93[0] - fSlow19 * (fSlow18 * fRec92[2] + fSlow13 * fRec92[1]);
			fRec91[0] = fSlow19 * (fRec92[2] + fRec92[0] + 2.0f * fRec92[1]) - fSlow17 * (fSlow15 * fRec91[2] + fSlow13 * fRec91[1]);
			float fTemp202 = fRec91[2] + fRec91[0] + 2.0f * fRec91[1];
			float fTemp203 = fSlow17 * fTemp202;
			fVec55[0] = fTemp203;
			fRec90[0] = 0.0f - fSlow77 * (fSlow75 * fRec90[1] - (fTemp203 + fVec55[1]));
			fRec89[0] = fRec90[0] - fSlow9 * (fSlow8 * fRec89[2] + fSlow4 * fRec89[1]);
			fRec88[0] = fSlow9 * (fRec89[2] + fRec89[0] + 2.0f * fRec89[1]) - fSlow7 * (fSlow6 * fRec88[2] + fSlow4 * fRec88[1]);
			fRec98[0] = fSlow80 * fVec55[1] - fSlow77 * (fSlow75 * fRec98[1] - fSlow79 * fTemp202);
			fRec97[0] = fRec98[0] - fSlow9 * (fSlow8 * fRec97[2] + fSlow4 * fRec97[1]);
			fRec96[0] = fSlow9 * (fSlow3 * fRec97[0] + fSlow81 * fRec97[1] + fSlow3 * fRec97[2]) - fSlow7 * (fSlow6 * fRec96[2] + fSlow4 * fRec96[1]);
			float fTemp204 = fSlow4 * fRec99[1];
			fRec102[0] = fSlow85 * fRec94[1] - fSlow74 * (fSlow72 * fRec102[1] - fSlow14 * fRec94[0]);
			fRec101[0] = fRec102[0] - fSlow19 * (fSlow18 * fRec101[2] + fSlow13 * fRec101[1]);
			fRec100[0] = fSlow19 * (fSlow12 * fRec101[0] + fSlow86 * fRec101[1] + fSlow12 * fRec101[2]) - fSlow17 * (fSlow15 * fRec100[2] + fSlow13 * fRec100[1]);
			fRec99[0] = fSlow17 * (fSlow12 * fRec100[0] + fSlow86 * fRec100[1] + fSlow12 * fRec100[2]) - fSlow84 * (fSlow83 * fRec99[2] + fTemp204);
			float fTemp205 = float(input1[i0]) + fSlow88 * (fSlow87 * (fRec99[2] + fSlow84 * (fTemp204 + fSlow83 * fRec99[0])) + fSlow7 * (fSlow82 * (fSlow3 * fRec96[0] + fSlow81 * fRec96[1] + fSlow3 * fRec96[2]) + fSlow78 * (fRec88[2] + fRec88[0] + 2.0f * fRec88[1])));
			fVec56[IOTA0 & 1023] = fTemp205;
			fRec87[0] = fSlow89 * (fTemp78 * fTemp77 * fTemp76 * fTemp75 * fVec56[(IOTA0 - iTemp79) & 1023] + fTemp74 * (fTemp72 * fTemp71 * fTemp70 * fVec56[(IOTA0 - iTemp73) & 1023] + 0.5f * fTemp61 * fTemp68 * fTemp67 * fVec56[(IOTA0 - iTemp69) & 1023] + 0.16666667f * fTemp62 * fTemp65 * fVec56[(IOTA0 - iTemp66) & 1023] + 0.041666668f * fTemp63 * fVec56[(IOTA0 - iTemp57) & 1023])) + fSlow0 * fRec87[1];
			float fTemp206 = fSlow94 * fRec87[0] - fSlow91 * fRec85[1];
			float fTemp207 = fSlow94 * fRec2[0] - fSlow91 * fRec84[1];
			fVec57[IOTA0 & 16383] = 0.70710677f * fTemp207 - 0.70710677f * fTemp206;
			float fTemp208 = fVec57[(IOTA0 - iTemp112) & 16383];
			fVec58[0] = fTemp208;
			fRec86[0] = fVec58[1] - fTemp114 * (fRec86[1] - fTemp208) / fTemp111;
			fRec84[0] = fRec86[0];
			fRec104[0] = 0.9999f * (fRec104[1] + float(iTemp0 * iSlow95)) + fSlow96;
			float fTemp209 = fRec104[0] + -1.49999f;
			float fTemp210 = std::floor(fTemp209);
			fVec59[IOTA0 & 16383] = 0.70710677f * fTemp207 + 0.70710677f * fTemp206;
			float fTemp211 = fVec59[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp209)))) & 16383];
			fVec60[0] = fTemp211;
			fRec103[0] = fVec60[1] - (fTemp210 + (2.0f - fRec104[0])) * (fRec103[1] - fTemp211) / (fRec104[0] - fTemp210);
			fRec85[0] = fRec103[0];
			float fTemp212 = fSlow94 * fRec84[1] + fSlow91 * fRec2[0];
			float fTemp213 = fSlow94 * fRec85[1] + fSlow91 * fRec87[0];
			float fTemp214 = fSlow94 * fTemp213 - fSlow91 * fRec106[1];
			float fTemp215 = fSlow94 * fTemp212 - fSlow91 * fRec105[1];
			fVec61[IOTA0 & 16383] = 0.70710677f * fTemp215 - 0.70710677f * fTemp214;
			float fTemp216 = fVec61[(IOTA0 - iTemp135) & 16383];
			fVec62[0] = fTemp216;
			fRec107[0] = fVec62[1] - fTemp137 * (fRec107[1] - fTemp216) / fTemp131;
			fRec105[0] = fRec107[0];
			fVec63[IOTA0 & 16383] = 0.70710677f * fTemp215 + 0.70710677f * fTemp214;
			float fTemp217 = fVec63[(IOTA0 - iTemp125) & 16383];
			fVec64[0] = fTemp217;
			fRec108[0] = fVec64[1] - fTemp127 * (fRec108[1] - fTemp217) / fTemp124;
			fRec106[0] = fRec108[0];
			float fTemp218 = fSlow94 * fRec105[1] + fSlow91 * fTemp212;
			float fTemp219 = fSlow94 * fRec106[1] + fSlow91 * fTemp213;
			float fTemp220 = fSlow94 * fTemp219 - fSlow91 * fRec110[1];
			float fTemp221 = fSlow94 * fTemp218 - fSlow91 * fRec109[1];
			fVec65[IOTA0 & 16383] = 0.70710677f * fTemp221 - 0.70710677f * fTemp220;
			float fTemp222 = fVec65[(IOTA0 - iTemp141) & 16383];
			fVec66[0] = fTemp222;
			fRec111[0] = fVec66[1] - fTemp143 * (fRec111[1] - fTemp222) / fTemp140;
			fRec109[0] = fRec111[0];
			fRec113[0] = 0.9999f * (fRec113[1] + float(iTemp0 * iSlow97)) + fSlow98;
			float fTemp223 = fRec113[0] + -1.49999f;
			float fTemp224 = std::floor(fTemp223);
			fVec67[IOTA0 & 16383] = 0.70710677f * fTemp221 + 0.70710677f * fTemp220;
			float fTemp225 = fVec67[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp223)))) & 16383];
			fVec68[0] = fTemp225;
			fRec112[0] = fVec68[1] - (fTemp224 + (2.0f - fRec113[0])) * (fRec112[1] - fTemp225) / (fRec113[0] - fTemp224);
			fRec110[0] = fRec112[0];
			float fTemp226 = fSlow94 * fRec109[1] + fSlow91 * fTemp218;
			fRec117[0] = 0.9999f * (fRec117[1] + float(iTemp0 * iSlow99)) + fSlow100;
			float fTemp227 = fRec117[0] + -1.49999f;
			float fTemp228 = std::floor(fTemp227);
			float fTemp229 = fSlow94 * fRec110[1] + fSlow91 * fTemp219;
			float fTemp230 = fSlow94 * fTemp229 - fSlow91 * fRec115[1];
			float fTemp231 = fSlow94 * fTemp226 - fSlow91 * fRec114[1];
			fVec69[IOTA0 & 16383] = 0.70710677f * fTemp231 - 0.70710677f * fTemp230;
			float fTemp232 = fVec69[(IOTA0 - std::min<int>(8192, std::max<int>(0, int(fTemp227)))) & 16383];
			fVec70[0] = fTemp232;
			fRec116[0] = fVec70[1] - (fTemp228 + (2.0f - fRec117[0])) * (fRec116[1] - fTemp232) / (fRec117[0] - fTemp228);
			fRec114[0] = fRec116[0];
			fVec71[IOTA0 & 16383] = 0.70710677f * fTemp231 + 0.70710677f * fTemp230;
			float fTemp233 = fVec71[(IOTA0 - iTemp154) & 16383];
			fVec72[0] = fTemp233;
			fRec118[0] = fVec72[1] - fTemp156 * (fRec118[1] - fTemp233) / fTemp153;
			fRec115[0] = fRec118[0];
			fRec0[0] = fSlow94 * fRec114[1] + fSlow91 * fTemp226;
			fRec1[0] = fSlow94 * fRec115[1] + fSlow91 * fTemp229;
			output0[i0] = FAUSTFLOAT(fRec0[0]);
			output1[i0] = FAUSTFLOAT(fRec1[0]);
			iVec0[1] = iVec0[0];
			fRec10[1] = fRec10[0];
			fRec12[1] = fRec12[0];
			fRec16[1] = fRec16[0];
			IOTA0 = IOTA0 + 1;
			fVec2[1] = fVec2[0];
			fRec15[1] = fRec15[0];
			fRec13[1] = fRec13[0];
			fRec18[1] = fRec18[0];
			fVec4[1] = fVec4[0];
			fRec17[1] = fRec17[0];
			fRec14[1] = fRec14[0];
			fRec22[1] = fRec22[0];
			fVec6[1] = fVec6[0];
			fRec21[1] = fRec21[0];
			fRec19[1] = fRec19[0];
			fRec24[1] = fRec24[0];
			fVec8[1] = fVec8[0];
			fRec23[1] = fRec23[0];
			fRec20[1] = fRec20[0];
			fRec28[1] = fRec28[0];
			fVec10[1] = fVec10[0];
			fRec27[1] = fRec27[0];
			fRec25[1] = fRec25[0];
			fRec30[1] = fRec30[0];
			fVec12[1] = fVec12[0];
			fRec29[1] = fRec29[0];
			fRec26[1] = fRec26[0];
			fRec34[1] = fRec34[0];
			fVec14[1] = fVec14[0];
			fRec33[1] = fRec33[0];
			fRec31[1] = fRec31[0];
			fRec36[1] = fRec36[0];
			fVec16[1] = fVec16[0];
			fRec35[1] = fRec35[0];
			fRec32[1] = fRec32[0];
			fRec40[1] = fRec40[0];
			fVec18[1] = fVec18[0];
			fRec39[1] = fRec39[0];
			fRec37[1] = fRec37[0];
			fRec42[1] = fRec42[0];
			fVec20[1] = fVec20[0];
			fRec41[1] = fRec41[0];
			fRec38[1] = fRec38[0];
			fRec43[1] = fRec43[0];
			fRec44[1] = fRec44[0];
			fVec23[1] = fVec23[0];
			fRec11[1] = fRec11[0];
			fRec48[1] = fRec48[0];
			fRec50[1] = fRec50[0];
			fVec26[1] = fVec26[0];
			fRec49[1] = fRec49[0];
			fVec28[1] = fVec28[0];
			fRec47[1] = fRec47[0];
			fRec45[1] = fRec45[0];
			fRec52[1] = fRec52[0];
			fVec30[1] = fVec30[0];
			fRec51[1] = fRec51[0];
			fRec46[1] = fRec46[0];
			fRec56[1] = fRec56[0];
			fVec32[1] = fVec32[0];
			fRec55[1] = fRec55[0];
			fRec53[1] = fRec53[0];
			fRec58[1] = fRec58[0];
			fVec34[1] = fVec34[0];
			fRec57[1] = fRec57[0];
			fRec54[1] = fRec54[0];
			fRec62[1] = fRec62[0];
			fVec36[1] = fVec36[0];
			fRec61[1] = fRec61[0];
			fRec59[1] = fRec59[0];
			fRec64[1] = fRec64[0];
			fVec38[1] = fVec38[0];
			fRec63[1] = fRec63[0];
			fRec60[1] = fRec60[0];
			fRec68[1] = fRec68[0];
			fVec40[1] = fVec40[0];
			fRec67[1] = fRec67[0];
			fRec65[1] = fRec65[0];
			fRec70[1] = fRec70[0];
			fVec42[1] = fVec42[0];
			fRec69[1] = fRec69[0];
			fRec66[1] = fRec66[0];
			fRec74[1] = fRec74[0];
			fVec44[1] = fVec44[0];
			fRec73[1] = fRec73[0];
			fRec71[1] = fRec71[0];
			fRec76[1] = fRec76[0];
			fVec46[1] = fVec46[0];
			fRec75[1] = fRec75[0];
			fRec72[1] = fRec72[0];
			fVec49[1] = fVec49[0];
			fRec9[1] = fRec9[0];
			fRec8[1] = fRec8[0];
			fRec7[2] = fRec7[1];
			fRec7[1] = fRec7[0];
			fRec6[2] = fRec6[1];
			fRec6[1] = fRec6[0];
			fVec50[1] = fVec50[0];
			fRec5[1] = fRec5[0];
			fRec4[2] = fRec4[1];
			fRec4[1] = fRec4[0];
			fRec3[2] = fRec3[1];
			fRec3[1] = fRec3[0];
			fRec79[1] = fRec79[0];
			fRec78[2] = fRec78[1];
			fRec78[1] = fRec78[0];
			fRec77[2] = fRec77[1];
			fRec77[1] = fRec77[0];
			fRec83[1] = fRec83[0];
			fRec82[2] = fRec82[1];
			fRec82[1] = fRec82[0];
			fRec81[2] = fRec81[1];
			fRec81[1] = fRec81[0];
			fRec80[2] = fRec80[1];
			fRec80[1] = fRec80[0];
			fRec2[1] = fRec2[0];
			fRec95[1] = fRec95[0];
			fVec54[1] = fVec54[0];
			fRec94[1] = fRec94[0];
			fRec93[1] = fRec93[0];
			fRec92[2] = fRec92[1];
			fRec92[1] = fRec92[0];
			fRec91[2] = fRec91[1];
			fRec91[1] = fRec91[0];
			fVec55[1] = fVec55[0];
			fRec90[1] = fRec90[0];
			fRec89[2] = fRec89[1];
			fRec89[1] = fRec89[0];
			fRec88[2] = fRec88[1];
			fRec88[1] = fRec88[0];
			fRec98[1] = fRec98[0];
			fRec97[2] = fRec97[1];
			fRec97[1] = fRec97[0];
			fRec96[2] = fRec96[1];
			fRec96[1] = fRec96[0];
			fRec102[1] = fRec102[0];
			fRec101[2] = fRec101[1];
			fRec101[1] = fRec101[0];
			fRec100[2] = fRec100[1];
			fRec100[1] = fRec100[0];
			fRec99[2] = fRec99[1];
			fRec99[1] = fRec99[0];
			fRec87[1] = fRec87[0];
			fVec58[1] = fVec58[0];
			fRec86[1] = fRec86[0];
			fRec84[1] = fRec84[0];
			fRec104[1] = fRec104[0];
			fVec60[1] = fVec60[0];
			fRec103[1] = fRec103[0];
			fRec85[1] = fRec85[0];
			fVec62[1] = fVec62[0];
			fRec107[1] = fRec107[0];
			fRec105[1] = fRec105[0];
			fVec64[1] = fVec64[0];
			fRec108[1] = fRec108[0];
			fRec106[1] = fRec106[0];
			fVec66[1] = fVec66[0];
			fRec111[1] = fRec111[0];
			fRec109[1] = fRec109[0];
			fRec113[1] = fRec113[0];
			fVec68[1] = fVec68[0];
			fRec112[1] = fRec112[0];
			fRec110[1] = fRec110[0];
			fRec117[1] = fRec117[0];
			fVec70[1] = fVec70[0];
			fRec116[1] = fRec116[0];
			fRec114[1] = fRec114[0];
			fVec72[1] = fVec72[0];
			fRec118[1] = fRec118[0];
			fRec115[1] = fRec115[0];
			fRec0[1] = fRec0[0];
			fRec1[1] = fRec1[0];
		}
	}

};

#ifdef FAUST_UIMACROS
	
	#define FAUST_FILE_NAME "FaustReverb.dsp"
	#define FAUST_CLASS_NAME "_FaustReverb"
	#define FAUST_COMPILATION_OPIONS "-lang cpp -rui -cn _FaustReverb -scn ::faust::dsp -es 1 -mcd 16 -uim -single -ftz 0"
	#define FAUST_INPUTS 2
	#define FAUST_OUTPUTS 2
	#define FAUST_ACTIVES 11
	#define FAUST_PASSIVES 0

	FAUST_ADDHORIZONTALSLIDER("Damping", fHslider0, 0.5f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("Diffusion", fHslider10, 0.707f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("HF Gain", fHslider8, 1.0f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("High Crossover", fHslider2, 5e+03f, 1e+03f, 1e+04f, 1.0f);
	FAUST_ADDHORIZONTALSLIDER("LF Gain", fHslider6, 1.0f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("Low Crossover", fHslider1, 6e+02f, 1e+02f, 6e+03f, 1.0f);
	FAUST_ADDHORIZONTALSLIDER("MID Gain", fHslider7, 1.0f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("Mod Depth", fHslider5, 0.1f, 0.0f, 1.0f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("Mod Frequency", fHslider4, 0.1f, 0.0f, 1e+01f, 0.01f);
	FAUST_ADDHORIZONTALSLIDER("ReverbTime", fHslider9, 4.2f, 0.1f, 12.0f, 0.1f);
	FAUST_ADDHORIZONTALSLIDER("Size", fHslider3, 3.5f, 0.5f, 5.0f, 0.01f);

	#define FAUST_LIST_ACTIVES(p) \
		p(HORIZONTALSLIDER, Damping, "Damping", fHslider0, 0.5f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, Diffusion, "Diffusion", fHslider10, 0.707f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, HF_Gain, "HF Gain", fHslider8, 1.0f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, High_Crossover, "High Crossover", fHslider2, 5e+03f, 1e+03f, 1e+04f, 1.0f) \
		p(HORIZONTALSLIDER, LF_Gain, "LF Gain", fHslider6, 1.0f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, Low_Crossover, "Low Crossover", fHslider1, 6e+02f, 1e+02f, 6e+03f, 1.0f) \
		p(HORIZONTALSLIDER, MID_Gain, "MID Gain", fHslider7, 1.0f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, Mod_Depth, "Mod Depth", fHslider5, 0.1f, 0.0f, 1.0f, 0.01f) \
		p(HORIZONTALSLIDER, Mod_Frequency, "Mod Frequency", fHslider4, 0.1f, 0.0f, 1e+01f, 0.01f) \
		p(HORIZONTALSLIDER, ReverbTime, "ReverbTime", fHslider9, 4.2f, 0.1f, 12.0f, 0.1f) \
		p(HORIZONTALSLIDER, Size, "Size", fHslider3, 3.5f, 0.5f, 5.0f, 0.01f) \

	#define FAUST_LIST_PASSIVES(p) \

#endif

#endif
