namespace project
{

struct ReverbParameters_networkdata: public scriptnode::dll::InterpretedNetworkData
{
	String getId() const override
	{
		return "ReverbParameters";
	}
	bool isModNode() const override
	{
		return false;
	}
	String getNetworkData() const override
	{
		return "293.nT6K8ClNAzMB.H6yxTBHsZS.iEs1SyllVsmhnKBVSQJnFq.Qo+K+pV.A3vMQWzSDaoe.2E4htT0CvyrgomUKrLXqmIZQNaw1E9hrPup+2gJv2koJHq.54Jp1jC62bhgv9w1XyaF4LcThidnDfN.xgBNL.gsg9XUS0OVUfuYUG2BtCxxHnZTZpJa.WxtVxQ+ypP0zVf3rUgdGKksLaX3vWyxzJxvWaB6oc.8VlMIah8bp0vB8rqkT8rEawVF5g8SF4IWF4IioEaRnDYI3GVBzCIxQ+kXqYxRAd.BDlS40CDyF8QQ.NgP9TVPvAOkMDdDmFeH9yYVsLwX0XrsOXTzcLnbvkKgKihMrx75Un7ExgsMdi.fkcfoAx+ScJ.zt8GnQPap1DE.";
	}
};
}

