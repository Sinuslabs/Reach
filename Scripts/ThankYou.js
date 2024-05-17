namespace ThankYou {
	
	const var thankyou_panel = Content.getComponent("thankyou_panel");
	
	ThankYou.thankyou_panel.showControl(false);
	
	thankyou_panel.setMouseCallback(onPanel);
	
	inline function onPanel(event) {
		
		if (event.clicked) { showMain(); }
		
	}
	
	const var Asset70VECTOR = "1324.nT6K8ClIKTQJ.n3VbyvGvDWfvv.wRl1SPTwcDIzF98iPkjcSZ8T1mOjiHB0.FQN.3Bfs.Hn9WmYKkUMajTX5JMx7FWoD2gqqSnSQazAlpsSpDMuW1s9N257RUUY7j7YZ7FEZpySNpNi+3Ji7lRc1c8Cjz6Lk4vNM8ch9TKWBcEsZhQjPUNtLw9MdtwoR8M4Sdm+39dLOijX3hdKAsadIwlz7XRMkAguLYho+rUK3gHhfP.xA0UNXDv.nPF1vCvPAvPET.BBEGH.H3AHlYHHnHCWv0E9hKt.BHL.FrvhI7PDZvBTnBcPdXBKbAK7PDTfBUHAIsKiLODQGtPBtXhJ3f7PQVLAJpXhIHOj1eHhIXQDp3BgBNngCDbwLSOm+F1Xj4g9wK0Kc42ZbT0LY2npittOiS6GFdpq5GThFYJQdpKpZiW5F6UmS5hQFKdpGSxR1CIi1s0JIIcmqx3EQdK4zVdHwpUsYxIcsQFFgdJIu47ZP7vDVTwDtnABg2lIGRowRrCUilwuJ8ZRX+jwTRZWmkT5p3uyxHMc8Uozy7UG3Q5pR2V9V4tdmjbcQiqXHA8qFIETzkXUZrlqQ1VIq4bcg9cdVIs6rcCcpxoJ2sstwWF.c9nTylnnFqp2YCo5G4eRcWUOmQVWum6PMxFzx7rcLT5NUwoJe6kctL5W5y1yPqlAdp4eGmY+xaqCMxrbgzw0GdbYYVQEjUllJovyZdf6VNKo1Z7MhHDszJ4v8LN6H8Tzkdf68y2J3UWYckaMxetQkm4ZNLIv7l82Kgn+yPIUMQ+HWZuuFZlITMjHWyUcEr6ZhtDZl68PWtsWMtw6+QV14+KDZptiAhVYy3ctrikjmezuTKZKZ6A.DPAGz.DV.gIxPELPCRXhHPADmYnQTOUNuBIu3wbzckNyCJWz+BoI5UON6duX2UdzRWatMRNW4wQaMmqjyMM2HSmyQyb8qWhJkWnOzfPUOhpUrEuw3bC8xsrM+HoOjV3PmVCI9bouUAeFW5bHYlIUJBq01Op4SOtUJKIy0J2LjPtQnq8fz0mdWQ9p78EcFSi6pmSnYNWob8JamXYZdRgT5FOAwzGZX6R9N4xO93AhpdyKLKW2Q445Ltsr00crO.ZNpAyAcJiAgLB.AD..fA.ER.XjZvYPPnbZLUAHDPhVJnAPnP72N4zY4cI70xJ1s0ZuZVDl0BmVGG8WBOv3UBI0GFTH4QdFJGYf72rmH7ejeFEiji.bF1cYQDVXADtPQgArffcMXAvhAdbC.FCvIT2yj2w.J.5uC+LBbGFP5fiQfTB2YsUBKx+ZBbOoQS+jSQh4In5jx9sYMQbkkg0940EFGJNYOtMuTMwbfzRU0Y.Fu1v.gE.faB9uEDmhHN0jLRLNxTocDEgTJKIoRTQIsoBFljcvuNhaJTiaRZbkYnrDUxP7CLEYrFnfBXi50w8RwXbYsPc0SqJQhBU7oqfmu5JEkkzicBSjAUeGxPEXNV0REgm0.0B7g8gwATjVIHOKqZITsX8XbJgRoQjDgEVvpvN98nwXf8nG2ishd7XFEyg2XLR1ExXIvQ3cXq2oNxmOS+vhQHYEp4fiCTyBMABx0F9Cw8DfhStTbq7Kg9BqGswQwsB6oPvzSXFcf3sLTZu8YsR1RyLisj5wNH0JlXqaRQnPpOb2EQRrtf9Llvoj.dEGJJJzMHX.POD2hP7ajZ8LjVFTla3qysc91mE+3UHjyHQwqw8MzWgn0mnz4hT00DqaXt1Qrfs8i+pUFLSVLUsdAJplT0Cql7."
	
	const var highFive = Content.createSVG(Asset70VECTOR);
	
	thankyou_panel.setPaintRoutine(function (g) {
		
		var a = this.getLocalBounds(0);
		
		g.drawSVG(highFive, a, 1);
		
	});
	
}