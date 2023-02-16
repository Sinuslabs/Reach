namespace project
{

struct test_networkdata: public scriptnode::dll::InterpretedNetworkData
{
	String getId() const override
	{
		return "test";
	}
	bool isModNode() const override
	{
		return false;
	}
	String getNetworkData() const override
	{
		return "559.nT6K8ClcEzRD.XalRYB3Raa.MkIQdmTMleUzR3XDUocc6eefhIDnwTlXbGOL.D1rTgIQFXD.FAfR.T4PN1PAhoPON6A5DflJsPZpUOmLV1DpmpHYGe7G8pMgl54YMYR+qXKfzz1xwn0zHoUflF82T1an+r+MRSufAfl9Q5d7MFw7cge9RnFhc4TnZCBxarBnQk82Wrjw1X0dd2ul6BXp5Xzo36NRVin+dFBxxy.IZV8t3Xl01fr8vgPmylFygcGwdU.BC5m.KBtcCnmbC6LVBT8SE+ukKXT2jINWEHlbSQTQhSxjG8GJ0Qw4jjXhagOdTX8SII41ABwYzsEeYhzT08vFPSC0VQLSYygCnIxXHVfNsrrjAwdODTls.2CajlANqFxAGqnhjTDRRpDQQZZSnudZzI9nV2yW9CxBegsqpXWbFNH4N9tXMH68xFKB5RHG67nlytxkZpEng2RjYlJ...XRPM.PDfTnqpCTWSgkvxU17n3ue3Yt1BOJimmhua9XMEOfNFyDagbpuQlLNNfmGXs1.G0.RCSzm9BBxlAugDM8.Hbaf3.ZYTIElif3jlPYD0kaZvccQ.UfnLKhxqPpg4BfpWr8wufcX1bzUJXxfFk9xsdm.Lay3f1G1fz.N2YnGP9.Fl3LOhXvFCHFNlBkQIIvw1J0PjZ+uZWqMT.gpQmz3J8UfxuXZvCKWXLyJuU4PxZcte3kx3bInjOViEXdcFvZv1fPKOVFJcbfJEvuJ.";
	}
};
}

