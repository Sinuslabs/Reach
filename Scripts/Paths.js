namespace Paths
{
		reg svgData;
		const icons = {};
		
		// Logo
		svgData = [110, 109, 239, 201, 107, 64, 88, 255, 178, 64, 108, 146, 150, 162, 64, 117, 205, 201, 64, 98, 208, 208, 170, 64, 24, 120, 205, 64, 177, 196, 179, 64, 33, 31, 207, 64, 27, 187, 188, 64, 123, 160, 206, 64, 98, 217, 177, 197, 64, 150, 33, 206, 64, 165, 107, 206, 64, 241, 128, 203, 64, 210, 53, 214, 64, 161, 243, 198, 64, 108, 88, 57, 0, 65, 239, 230, 170, 64, 98, 171, 219, 3, 65, 224, 132, 165, 64, 198, 208, 6, 65, 105, 116, 158, 64, 196, 218, 8, 65, 98, 74, 150, 64, 98, 226, 228, 10, 65, 29, 32, 142, 64, 241, 244, 11, 65, 240, 22, 133, 64, 167, 244, 11, 65, 127, 217, 119, 64, 108, 136, 157, 10, 65, 21, 0, 17, 64, 98, 92, 32, 10, 65, 26, 163, 253, 63, 242, 152, 8, 65, 174, 182, 218, 63, 244, 38, 6, 65, 23, 14, 188, 63, 98, 215, 180, 3, 65, 128, 101, 157, 63, 205, 105, 0, 65, 249, 218, 131, 63, 174, 18, 249, 64, 189, 252, 98, 63, 108, 191, 96, 204, 64, 199, 245, 31, 62, 98, 237, 42, 196, 64, 33, 235, 36, 61, 13, 55, 187, 64, 78, 44, 75, 188, 41, 63, 178, 64, 143, 21, 33, 59, 98, 132, 71, 169, 64, 85, 219, 141, 60, 193, 139, 160, 64, 45, 78, 203, 61, 127, 193, 152, 64, 72, 135, 119, 62, 108, 103, 10, 93, 64, 205, 35, 143, 63, 98, 211, 135, 78, 64, 203, 185, 164, 63, 212, 183, 66, 64, 160, 253, 192, 63, 214, 144, 58, 64, 106, 164, 225, 63, 98, 47, 105, 50, 64, 242, 36, 1, 64, 137, 36, 46, 64, 5, 52, 19, 64, 4, 28, 46, 64, 68, 134, 37, 64, 108, 255, 120, 51, 64, 236, 47, 134, 64, 98, 126, 53, 53, 64, 228, 102, 143, 64, 239, 56, 59, 64, 11, 70, 152, 64, 218, 3, 69, 64, 182, 16, 160, 64, 98, 196, 206, 78, 64, 245, 219, 167, 64, 143, 25, 92, 64, 75, 89, 174, 64, 239, 201, 107, 64, 88, 255, 178, 64, 99, 109, 85, 193, 65, 65, 62, 150, 245, 64, 108, 115, 104, 43, 65, 122, 54, 222, 64, 98, 211, 77, 39, 65, 214, 139, 218, 64, 57, 214, 34, 65, 33, 229, 216, 64, 37, 93, 30, 65, 6, 100, 217, 64, 98, 27, 228, 25, 65, 151, 226, 217, 64, 181, 137, 21, 65, 144, 131, 220, 64, 233, 166, 17, 65, 14, 16, 225, 64, 108, 216, 158, 248, 64, 172, 28, 253, 64, 98, 132, 100, 241, 64, 114, 68, 1, 65, 132, 129, 235, 64, 148, 205, 4, 65, 110, 110, 231, 64, 177, 225, 8, 65, 98, 171, 91, 227, 64, 163, 245, 12, 65, 43, 53, 225, 64, 165, 119, 17, 65, 250, 39, 225, 64, 141, 11, 22, 65, 108, 203, 214, 227, 64, 190, 193, 47, 65, 98, 36, 209, 228, 64, 211, 77, 52, 65, 164, 223, 231, 64, 54, 171, 56, 65, 160, 195, 236, 64, 52, 128, 60, 65, 98, 47, 168, 241, 64, 50, 85, 64, 65, 87, 62, 248, 64, 194, 134, 67, 65, 239, 254, 255, 64, 32, 210, 69, 65, 108, 100, 88, 22, 65, 239, 56, 81, 65, 98, 2, 113, 26, 65, 169, 19, 83, 65, 115, 232, 30, 65, 133, 235, 83, 65, 78, 98, 35, 65, 230, 174, 83, 65, 98, 245, 219, 39, 65, 222, 113, 83, 65, 76, 55, 44, 65, 255, 33, 82, 65, 206, 25, 48, 65, 186, 218, 79, 65, 108, 116, 70, 69, 65, 149, 212, 65, 65, 98, 38, 228, 72, 65, 113, 27, 63, 65, 103, 213, 75, 65, 197, 143, 59, 65, 211, 222, 77, 65, 62, 121, 55, 65, 98, 62, 232, 79, 65, 183, 98, 51, 65, 22, 251, 80, 65, 211, 222, 46, 65, 163, 1, 81, 65, 128, 72, 42, 65, 108, 101, 170, 79, 65, 4, 161, 16, 65, 98, 82, 39, 79, 65, 53, 36, 12, 65, 98, 161, 77, 65, 218, 213, 7, 65, 181, 55, 75, 65, 63, 12, 4, 65, 98, 7, 206, 72, 65, 112, 66, 0, 65, 0, 145, 69, 65, 131, 47, 250, 64, 85, 193, 65, 65, 62, 150, 245, 64, 99, 109, 23, 89, 131, 65, 251, 58, 103, 65, 108, 75, 89, 112, 65, 195, 211, 91, 65, 98, 66, 62, 108, 65, 9, 249, 89, 65, 156, 196, 103, 65, 45, 33, 89, 65, 128, 72, 99, 65, 53, 94, 89, 65, 98, 205, 204, 94, 65, 212, 154, 89, 65, 0, 111, 90, 65, 179, 234, 90, 65, 160, 137, 86, 65, 97, 50, 93, 65, 108, 186, 107, 65, 65, 134, 56, 107, 65, 98, 100, 204, 61, 65, 192, 236, 109, 65, 127, 217, 58, 65, 142, 117, 113, 65, 20, 208, 56, 65, 9, 138, 117, 65, 98, 63, 198, 54, 65, 132, 158, 121, 65, 57, 180, 53, 65, 150, 33, 126, 65, 33, 176, 53, 65, 186, 90, 129, 65, 108, 95, 7, 55, 65, 17, 54, 142, 65, 98, 46, 144, 55, 65, 124, 114, 144, 65, 55, 26, 57, 65, 36, 151, 146, 65, 89, 134, 59, 65, 62, 121, 148, 65, 98, 124, 242, 61, 65, 140, 91, 150, 65, 236, 47, 65, 65, 99, 238, 151, 65, 197, 254, 68, 65, 111, 18, 153, 65, 108, 168, 87, 91, 65, 214, 197, 158, 65, 98, 188, 116, 95, 65, 138, 176, 159, 65, 204, 238, 99, 65, 55, 26, 160, 65, 22, 106, 104, 65, 120, 250, 159, 65, 98, 96, 229, 108, 65, 238, 218, 159, 65, 91, 66, 113, 65, 150, 50, 159, 65, 82, 39, 117, 65, 92, 15, 158, 65, 108, 252, 41, 133, 65, 74, 12, 151, 65, 98, 9, 249, 134, 65, 249, 177, 149, 65, 170, 113, 136, 65, 145, 237, 147, 65, 37, 117, 137, 65, 32, 227, 145, 65, 98, 213, 120, 138, 65, 174, 216, 143, 65, 52, 0, 139, 65, 89, 151, 141, 65, 157, 0, 139, 65, 159, 77, 139, 65, 108, 75, 106, 138, 65, 180, 89, 125, 65, 98, 165, 44, 138, 65, 134, 201, 120, 65, 167, 104, 137, 65, 10, 104, 116, 65, 20, 46, 136, 65, 197, 143, 112, 65, 98, 235, 243, 134, 65, 233, 183, 108, 65, 251, 75, 133, 65, 31, 133, 105, 65, 23, 89, 131, 65, 251, 58, 103, 65, 99, 109, 176, 27, 196, 64, 66, 96, 39, 65, 108, 17, 252, 193, 64, 110, 93, 19, 65, 98, 66, 9, 194, 64, 165, 201, 14, 65, 131, 47, 196, 64, 164, 71, 10, 65, 133, 66, 200, 64, 167, 51, 6, 65, 98, 155, 85, 204, 64, 149, 31, 2, 65, 71, 56, 210, 64, 145, 44, 253, 64, 239, 114, 217, 64, 173, 192, 247, 64, 108, 71, 230, 21, 65, 230, 34, 193, 64, 98, 233, 200, 25, 65, 20, 150, 188, 64, 110, 35, 30, 65, 48, 245, 185, 64, 120, 156, 34, 65, 138, 118, 185, 64, 98, 181, 21, 39, 65, 249, 247, 184, 64, 231, 140, 43, 65, 174, 158, 186, 64, 135, 167, 47, 65, 254, 72, 190, 64, 108, 202, 50, 65, 65, 85, 135, 208, 64, 98, 211, 77, 69, 65, 8, 61, 212, 64, 122, 199, 73, 65, 255, 236, 213, 64, 45, 67, 78, 65, 25, 115, 213, 64, 98, 72, 191, 82, 65, 156, 249, 212, 64, 21, 29, 87, 65, 222, 89, 210, 64, 12, 2, 91, 65, 193, 202, 205, 64, 108, 92, 32, 112, 65, 228, 160, 177, 64, 98, 131, 192, 115, 65, 193, 57, 172, 64, 104, 179, 118, 65, 162, 40, 165, 64, 60, 189, 120, 65, 67, 255, 156, 64, 98, 17, 199, 122, 65, 36, 214, 148, 64, 174, 216, 123, 65, 171, 207, 139, 64, 245, 219, 123, 65, 181, 166, 130, 64, 108, 182, 132, 122, 65, 125, 174, 30, 64, 98, 213, 9, 122, 65, 79, 117, 12, 64, 18, 131, 120, 65, 67, 231, 245, 63, 52, 17, 118, 65, 179, 41, 215, 63, 98, 237, 158, 115, 65, 211, 106, 184, 63, 189, 82, 112, 65, 238, 206, 158, 63, 164, 112, 108, 65, 144, 102, 140, 63, 108, 194, 23, 86, 65, 2, 155, 187, 62, 98, 173, 250, 81, 65, 170, 243, 128, 62, 157, 128, 77, 65, 146, 8, 77, 62, 83, 5, 73, 65, 93, 222, 92, 62, 98, 9, 138, 68, 65, 108, 180, 108, 62, 14, 45, 64, 65, 106, 103, 160, 62, 23, 72, 60, 65, 231, 54, 233, 62, 108, 23, 183, 38, 65, 172, 173, 168, 63, 98, 101, 25, 35, 65, 114, 80, 190, 63, 36, 40, 32, 65, 217, 153, 218, 63, 207, 32, 30, 65, 167, 63, 251, 63, 98, 122, 25, 28, 65, 145, 242, 13, 64, 145, 10, 27, 65, 139, 253, 31, 64, 30, 10, 27, 65, 52, 75, 50, 64, 108, 162, 11, 28, 65, 44, 43, 129, 64, 98, 47, 11, 28, 65, 105, 82, 138, 64, 38, 252, 26, 65, 168, 87, 147, 64, 199, 244, 24, 65, 6, 129, 155, 64, 98, 114, 237, 22, 65, 122, 170, 163, 64, 101, 252, 19, 65, 18, 189, 170, 64, 85, 94, 16, 65, 91, 37, 176, 64, 108, 94, 99, 206, 64, 118, 195, 230, 64, 98, 221, 152, 198, 64, 84, 82, 235, 64, 173, 221, 189, 64, 19, 242, 237, 64, 180, 229, 180, 64, 227, 107, 238, 64, 98, 145, 237, 171, 64, 117, 229, 238, 64, 5, 250, 162, 64, 189, 53, 237, 64, 223, 195, 154, 64, 204, 127, 233, 64, 108, 87, 149, 111, 64, 179, 94, 215, 64, 98, 53, 41, 95, 64, 0, 169, 211, 64, 70, 66, 77, 64, 93, 249, 209, 64, 0, 82, 59, 64, 46, 115, 210, 64, 98, 99, 98, 41, 64, 255, 236, 210, 64, 133, 235, 23, 64, 42, 140, 213, 64, 214, 86, 8, 64, 72, 27, 218, 64, 108, 125, 119, 79, 63, 250, 39, 246, 64, 98, 43, 109, 21, 63, 143, 141, 251, 64, 146, 94, 204, 62, 45, 79, 1, 65, 41, 34, 139, 62, 6, 100, 5, 65, 98, 62, 203, 19, 62, 223, 120, 9, 65, 154, 18, 159, 61, 143, 252, 13, 65, 251, 255, 157, 61, 10, 145, 18, 65, 108, 20, 208, 36, 62, 69, 71, 44, 65, 98, 220, 70, 67, 62, 57, 214, 48, 65, 27, 100, 146, 62, 227, 54, 53, 65, 21, 169, 224, 62, 40, 15, 57, 65, 98, 49, 121, 23, 63, 4, 231, 60, 65, 149, 70, 76, 63, 55, 26, 64, 65, 58, 59, 133, 63, 102, 102, 66, 65, 108, 80, 1, 28, 64, 54, 205, 77, 65, 98, 251, 116, 44, 64, 156, 162, 79, 65, 146, 92, 62, 64, 247, 117, 80, 65, 228, 73, 80, 64, 227, 54, 80, 65, 98, 55, 55, 98, 64, 102, 247, 79, 65, 34, 171, 115, 64, 30, 167, 78, 65, 18, 160, 129, 64, 66, 96, 76, 65, 108, 93, 220, 171, 64, 29, 90, 62, 65, 98, 142, 30, 179, 64, 119, 190, 59, 65, 72, 22, 185, 64, 223, 79, 56, 65, 199, 75, 189, 64, 189, 82, 52, 65, 98, 69, 129, 193, 64, 4, 86, 48, 65, 57, 214, 195, 64, 4, 231, 43, 65, 176, 27, 196, 64, 66, 96, 39, 65, 99, 109, 79, 158, 159, 65, 145, 27, 20, 65, 98, 158, 94, 159, 65, 128, 142, 15, 65, 107, 154, 158, 65, 236, 47, 11, 65, 177, 97, 157, 65, 195, 88, 7, 65, 98, 193, 40, 156, 65, 184, 129, 3, 65, 176, 131, 154, 65, 43, 77, 0, 65, 18, 148, 152, 65, 156, 249, 251, 64, 108, 213, 103, 141, 65, 149, 43, 229, 64, 98, 23, 89, 139, 65, 253, 130, 225, 64, 67, 28, 137, 65, 47, 221, 223, 64, 158, 222, 134, 65, 20, 92, 224, 64, 98, 45, 161, 132, 65, 165, 218, 224, 64, 176, 114, 130, 65, 99, 122, 227, 64, 0, 128, 128, 65, 104, 5, 232, 64, 108, 72, 225, 107, 65, 3, 9, 2, 65, 98, 91, 66, 104, 65, 81, 189, 4, 65, 223, 79, 101, 65, 42, 70, 8, 65, 11, 70, 99, 65, 144, 90, 12, 65, 98, 159, 60, 97, 65, 246, 110, 16, 65, 153, 42, 96, 65, 191, 241, 20, 65, 24, 38, 96, 65, 26, 134, 25, 65, 108, 168, 53, 97, 65, 141, 151, 45, 65, 98, 144, 49, 97, 65, 107, 43, 50, 65, 33, 31, 96, 65, 125, 174, 54, 65, 181, 21, 94, 65, 248, 194, 58, 65, 98, 225, 11, 92, 65, 115, 215, 62, 65, 101, 25, 89, 65, 66, 96, 66, 65, 16, 122, 85, 65, 123, 20, 69, 65, 108, 192, 91, 44, 65, 202, 84, 96, 65, 98, 201, 118, 40, 65, 61, 155, 98, 65, 206, 25, 36, 65, 238, 235, 99, 65, 90, 158, 31, 65, 2, 43, 100, 65, 98, 37, 35, 27, 65, 127, 106, 100, 65, 63, 169, 22, 65, 36, 151, 99, 65, 32, 140, 18, 65, 190, 193, 97, 65, 108, 59, 1, 1, 65, 156, 162, 88, 65, 98, 117, 205, 249, 64, 159, 205, 86, 65, 85, 222, 240, 64, 219, 249, 85, 65, 238, 235, 231, 64, 88, 57, 86, 65, 98, 219, 249, 222, 64, 213, 120, 86, 65, 15, 69, 214, 64, 29, 201, 87, 65, 204, 127, 206, 64, 145, 15, 90, 65, 108, 229, 208, 163, 64, 95, 7, 104, 65, 98, 62, 150, 156, 64, 60, 189, 106, 65, 146, 179, 150, 64, 11, 70, 110, 65, 39, 160, 146, 64, 134, 90, 114, 65, 98, 101, 141, 142, 64, 152, 110, 118, 65, 98, 103, 140, 64, 111, 240, 122, 65, 8, 90, 140, 64, 77, 132, 127, 65, 108, 70, 8, 143, 64, 73, 157, 140, 65, 98, 222, 2, 144, 64, 32, 227, 142, 65, 178, 17, 147, 64, 209, 17, 145, 65, 174, 245, 151, 64, 133, 252, 146, 65, 98, 232, 217, 156, 64, 4, 231, 148, 65, 252, 111, 163, 64, 151, 127, 150, 65, 232, 48, 171, 64, 122, 165, 151, 65, 108, 214, 226, 215, 64, 139, 125, 157, 65, 98, 190, 19, 224, 64, 179, 106, 158, 65, 159, 2, 233, 64, 161, 214, 158, 65, 216, 245, 241, 64, 82, 184, 158, 65, 98, 100, 233, 250, 64, 206, 153, 158, 65, 244, 207, 1, 65, 222, 241, 157, 65, 192, 178, 5, 65, 60, 206, 156, 65, 108, 38, 223, 26, 65, 41, 203, 149, 65, 98, 158, 123, 30, 65, 210, 111, 148, 65, 139, 108, 33, 65, 2, 171, 146, 65, 247, 117, 35, 65, 45, 161, 144, 65, 98, 99, 127, 37, 65, 36, 151, 142, 65, 12, 147, 38, 65, 57, 86, 140, 65, 212, 154, 38, 65, 126, 12, 138, 65, 108, 219, 138, 37, 65, 228, 3, 128, 65, 98, 34, 142, 37, 65, 25, 115, 123, 65, 190, 159, 38, 65, 7, 240, 118, 65, 147, 169, 40, 65, 140, 219, 114, 65, 98, 104, 179, 42, 65, 168, 198, 110, 65, 181, 166, 45, 65, 66, 62, 107, 65, 116, 70, 49, 65, 114, 138, 104, 65, 108, 195, 100, 90, 65, 205, 59, 77, 65, 98, 35, 74, 94, 65, 31, 244, 74, 65, 240, 167, 98, 65, 64, 164, 73, 65, 163, 35, 103, 65, 56, 103, 73, 65, 98, 190, 159, 107, 65, 153, 42, 73, 65, 101, 25, 112, 65, 117, 2, 74, 65, 110, 52, 116, 65, 47, 221, 75, 65, 108, 121, 216, 130, 65, 250, 237, 84, 65, 98, 254, 229, 132, 65, 180, 200, 86, 65, 5, 35, 135, 65, 144, 160, 87, 65, 223, 96, 137, 65, 241, 99, 87, 65, 98, 237, 158, 139, 65, 233, 38, 87, 65, 211, 205, 141, 65, 115, 215, 85, 65, 79, 192, 143, 65, 197, 143, 83, 65, 108, 161, 86, 154, 65, 55, 137, 69, 65, 98, 70, 37, 156, 65, 44, 212, 66, 65, 126, 157, 157, 65, 140, 74, 63, 65, 45, 161, 158, 65, 122, 54, 59, 65, 98, 169, 164, 159, 65, 150, 33, 55, 65, 113, 44, 160, 65, 86, 159, 50, 65, 67, 45, 160, 65, 74, 12, 46, 65, 108, 79, 158, 159, 65, 145, 27, 20, 65, 99, 101, 0, 0]; 
		icons.logo = Content.createPath();
		icons.logo.loadFromData(svgData);
		
		// Right Arrow Icon
		svgData = [110,109,188,203,9,65,2,183,189,64,108,143,170,68,64,51,179,27,65,98,94,75,52,64,8,131,30,65,58,204,35,64,0,0,32,65,30,22,22,64,0,0,32,65,98,187,39,247,63,0,0,32,65,234,91,214,63,164,170,26,65,234,91,214,63,50,189,17,65,108,234,91,214,63,39,216,99,63, 98,234,91,214,63,222,86,170,62,63,29,247,63,216,49,211,50,252,0,22,64,216,49,211,50,98,86,188,35,64,216,49,211,50,249,247,51,64,221,165,190,61,128,96,68,64,67,227,137,62,108,202,195,9,65,1,77,130,64,98,154,119,15,65,142,35,138,64,8,160,18,65,205,175, 148,64,8,160,18,65,176,3,160,64,98,92,160,18,65,134,85,171,64,48,129,15,65,9,225,181,64,188,203,9,65,2,183,189,64,99,101,0,0];
		icons.rightArrow = Content.createPath();
		icons.rightArrow.loadFromData(svgData);
		
		// Left Arrow Icon
		svgData = [110,109,24,125,17,64,254,72,130,64,108,168,0,250,64,242,152,137,62,98,43,24,1,65,75,123,190,61,233,55,5,65,0,0,0,0,122,165,8,65,0,0,0,0,98,11,70,15,65,0,0,0,0,133,95,19,65,172,171,170,62,133,95,19,65,6,45,100,63,108,133,95,19,65,122,194,17,65,98,133, 95,19,65,77,173,26,65,90,71,15,65,0,0,32,65,195,170,8,65,0,0,32,65,98,226,59,5,65,0,0,32,65,4,45,1,65,180,130,30,65,196,37,250,64,232,176,27,65,108,224,156,17,64,255,178,189,64,98,61,155,245,63,114,220,181,64,209,87,220,63,51,80,171,64,209,87,220,63, 80,252,159,64,98,50,85,220,63,122,170,148,64,144,78,245,63,247,30,138,64,24,125,17,64,254,72,130,64,99,101,0,0];
		icons.leftArrow = Content.createPath();
		icons.leftArrow.loadFromData(svgData);
		
		// Down Arrow
		svgData = [110,109,56,48,129,62,0,0,0,0,108,253,217,47,64,0,0,0,0,98,17,54,62,64,0,0,0,0,48,100,69,64,185,195,158,62,70,66,59,64,114,83,251,62,108,145,208,214,63,14,50,245,63,98,244,50,202,63,12,205,1,64,12,205,181,63,12,205,1,64,215,81,169,63,14,50,245,63,108,11,184,151,61,114,83,251,62,98,168,132,172,189,185,195,158,62,23,245,228,60,0,0,0,0,56,48,129,62,0,0,0,0,99,101,0,0];
		icons.downArrow = Content.createPath();
		icons.downArrow.loadFromData(svgData);
		
		// Freeze Icon
		svgData = [110,109,28,153,251,64,207,44,194,64,108,19,73,232,64,215,52,183,64,108,53,36,247,64,208,68,179,64,98,174,211,251,64,7,8,178,64,102,160,254,64,251,63,173,64,158,94,253,64,47,163,168,64,108,119,21,251,64,158,65,160,64,98,174,211,249,64,211,164,155,64,98, 248,244,64,42,227,152,64,233,72,240,64,8,32,154,64,108,191,212,199,64,255,207,164,64,108,236,81,163,64,0,0,144,64,108,42,198,199,64,217,124,118,64,108,84,58,240,64,99,238,133,64,98,184,233,244,64,44,43,135,64,25,197,249,64,152,105,132,64,226,6,251,64, 154,153,127,64,108,244,79,253,64,119,214,110,64,98,188,145,254,64,224,156,101,64,5,197,251,64,200,12,92,64,140,21,247,64,54,147,89,64,108,126,58,232,64,41,179,81,64,108,135,138,251,64,55,195,59,64,98,240,196,255,64,192,236,54,64,80,153,0,65,159,89,44, 64,79,204,254,64,100,6,36,64,108,2,241,245,64,13,224,5,64,98,7,124,243,64,164,25,251,63,21,29,238,64,125,121,245,63,172,226,233,64,192,236,254,63,108,163,146,214,64,123,102,21,64,108,142,146,218,64,173,76,240,63,98,86,212,219,64,127,217,221,63,158,7, 217,64,161,185,202,63,37,88,212,64,126,198,197,63,108,170,212,203,64,63,198,188,63,98,70,37,199,64,28,211,183,63,228,73,194,64,190,217,194,63,28,8,193,64,236,76,213,63,108,228,44,182,64,215,76,58,64,108,245,74,146,64,121,6,99,64,108,245,74,146,64,98, 214,11,64,108,219,249,176,64,190,217,158,63,98,182,132,180,64,92,230,144,63,182,132,180,64,96,230,115,63,219,249,176,64,0,0,88,63,108,245,132,170,64,99,38,37,63,98,5,250,166,64,3,64,9,63,24,38,161,64,3,64,9,63,40,155,157,64,99,38,37,63,108,245,74,146, 64,201,204,125,63,108,245,74,146,64,0,0,144,62,98,245,74,146,64,120,153,1,62,203,45,142,64,0,0,0,0,150,38,137,64,0,0,0,0,108,174,187,109,64,0,0,0,0,98,67,173,99,64,0,0,0,0,239,114,91,64,120,153,1,62,239,114,91,64,0,0,144,62,108,239,114,91,64,201,204, 125,63,108,179,239,68,64,99,38,37,63,98,253,217,61,64,3,64,9,63,249,49,50,64,3,64,9,63,25,28,43,64,99,38,37,63,108,35,21,30,64,0,0,88,63,98,25,226,22,64,96,230,115,63,25,226,22,64,92,230,144,63,35,21,30,64,190,217,158,63,108,239,114,91,64,98,214,11,64, 108,239,114,91,64,121,6,99,64,108,230,174,19,64,215,76,58,64,108,65,241,251,63,236,76,213,63,98,205,233,246,63,190,217,194,63,154,124,227,63,28,211,183,63,10,191,208,63,63,198,188,63,108,28,177,174,63,126,198,197,63,98,56,243,155,63,161,185,202,63,89, 192,144,63,127,217,221,63,122,199,149,63,173,76,240,63,108,38,199,165,63,123,102,21,64,108,225,13,49,63,192,236,254,63,98,138,58,15,63,37,64,245,63,144,133,200,62,164,25,251,63,219,53,161,62,13,224,5,64,108,162,16,28,61,142,233,35,64,98,76,108,30,189, 201,60,44,64,36,220,253,59,20,208,54,64,113,60,15,62,97,166,59,64,108,118,79,62,63,83,150,81,64,108,36,237,142,62,96,118,89,64,98,5,24,6,62,242,239,91,64,138,1,50,61,10,128,101,64,16,116,169,61,119,214,110,64,108,232,220,29,62,154,153,127,64,98,181,22, 70,62,152,105,132,64,139,192,176,62,44,43,135,64,149,183,251,62,99,238,133,64,108,98,190,224,63,217,124,118,64,108,174,71,57,64,0,0,144,64,108,98,190,224,63,148,193,164,64,108,149,183,251,62,157,17,154,64,98,139,192,176,62,212,212,152,64,181,22,70,62, 104,150,155,64,232,220,29,62,51,51,160,64,108,16,116,169,61,196,148,168,64,98,138,1,50,61,144,49,173,64,5,24,6,62,156,249,177,64,12,3,142,62,101,54,179,64,108,106,218,61,63,108,38,183,64,108,64,104,13,62,207,44,194,64,98,177,89,195,59,246,151,196,64, 76,108,30,189,156,225,201,64,76,192,20,61,57,11,206,64,108,228,75,160,62,100,30,221,64,98,120,155,199,62,2,72,225,64,126,197,14,63,247,175,226,64,229,152,48,63,59,83,224,64,108,126,140,165,63,45,91,213,64,108,210,140,149,63,43,251,227,64,98,178,133,144, 63,246,151,232,64,145,184,155,63,3,96,237,64,117,118,174,63,203,156,238,64,108,98,132,208,63,198,220,240,64,98,70,66,227,63,164,25,242,64,121,175,246,63,251,87,239,64,154,182,251,63,48,187,234,64,108,188,145,19,64,255,231,194,64,108,155,85,91,64,47,139, 174,64,108,155,85,91,64,58,35,218,64,108,207,247,29,64,251,87,248,64,98,198,196,22,64,212,212,251,64,198,196,22,64,201,200,0,65,207,247,29,64,53,135,2,65,108,156,225,42,64,204,180,5,65,98,123,247,49,64,46,115,7,65,128,159,61,64,46,115,7,65,53,181,68, 64,204,180,5,65,108,113,56,91,64,101,42,0,65,108,113,56,91,64,0,128,11,65,98,113,56,91,64,156,249,13,65,197,114,99,64,0,0,16,65,48,129,109,64,0,0,16,65,108,87,9,137,64,0,0,16,65,98,140,16,142,64,0,0,16,65,182,45,146,64,156,249,13,65,182,45,146,64,0,128, 11,65,108,182,45,146,64,47,35,0,65,108,63,111,157,64,151,173,5,65,98,47,250,160,64,3,108,7,65,49,206,166,64,3,108,7,65,12,89,170,64,151,173,5,65,108,242,205,176,64,0,128,2,65,98,226,88,180,64,158,193,0,65,226,88,180,64,105,198,251,64,242,205,176,64,144, 73,248,64,108,245,74,146,64,207,20,218,64,108,245,74,146,64,196,124,174,64,108,228,44,182,64,148,217,194,64,108,28,8,193,64,197,172,234,64,98,228,73,194,64,144,73,239,64,70,37,199,64,57,11,242,64,170,212,203,64,112,206,240,64,108,37,88,212,64,97,142, 238,64,98,158,7,217,64,152,81,237,64,86,212,219,64,160,137,232,64,142,146,218,64,213,236,227,64,108,163,146,214,64,215,76,213,64,108,172,226,233,64,208,68,224,64,98,21,29,238,64,247,175,226,64,7,124,243,64,151,57,225,64,2,241,245,64,249,15,221,64,108, 79,204,254,64,206,252,205,64,98,165,160,0,65,156,225,201,64,153,211,255,64,160,137,196,64,28,153,251,64,207,44,194,64,99,101,0,0];
		icons.freeze = Content.createPath();
		icons.freeze.loadFromData(svgData);
		
		// Flair Icon
		svgData = [110,109,164,170,170,64,174,170,26,65,98,16,64,247,64,174,170,26,65,174,170,26,65,16,64,247,64,174,170,26,65,164,170,170,64,98,174,170,26,65,153,42,60,64,16,64,247,64,0,0,128,63,164,170,170,64,0,0,128,63,98,153,42,60,64,0,0,128,63,0,0,128,63,153,42,60,64,0,0,128,63,164,170,170,64,98,0,0,128,63,16,64,247,64,153,42,60,64,174,170,26,65,164,170,170,64,174,170,26,65,99,109,174,170,26,65,174,170,26,65,98,90,245,64,65,174,170,26,65,0,0,96,65,16,64,247,64,0,0,96,65,164,170,170,64,98,0,0,96,65,153,42,60,64,90,245,64,65,0,0,128,63,174,170,26,65,0,0,128,63,98,240,191,232,64,0,0,128,63,164,170,170,64,153,42,60,64,164,170,170,64,164,170,170,64,98,164,170,170,64,16,64,247,64,240,191,232,64,174,170,26,65,174,170,26,65,174,170,26,65,99,101,0,0];
		icons.flair = Content.createPath();
		icons.flair.loadFromData(svgData);
		
		// Degrade Icon
		svgData = [110,109,0,0,48,65,11,53,11,65,108,0,0,48,65,234,149,137,64,98,46,255,47,65,89,105,131,64,165,44,47,65,24,178,122,64,73,157,45,65,80,1,112,64,98,132,13,44,65,93,80,101,64,171,207,41,65,189,111,92,64,67,28,39,65,45,67,86,64,108,38,199,209,64,1,222,146,63,98,112,95,204,64,237,129,134,63,197,61,198,64,0,0,128,63,0,0,192,64,0,0,128,63,98,59,194,185,64,0,0,128,63,144,160,179,64,237,129,134,63,218,56,174,64,1,222,146,63,108,151,28,199,63,45,67,86,64,98,253,130,177,63,189,111,92,64,142,146,159,63,93,80,101,64,89,23,147,63,80,1,112,64,98,208,155,134,63,24,178,122,64,142,6,128,63,89,105,131,64,0,0,128,63,234,149,137,64,108,0,0,128,63,11,53,11,65,98,142,6,128,63,83,75,14,65,208,155,134,63,122,83,17,65,89,23,147,63,172,255,19,65,98,142,146,159,63,222,171,22,65,253,130,177,63,17,228,24,65,151,28,199,63,53,111,26,65,108,218,56,174,64,64,164,61,65,98,144,160,179,64,236,47,63,65,59,194,185,64,0,0,64,65,0,0,192,64,0,0,64,65,98,197,61,198,64,0,0,64,65,112,95,204,64,236,47,63,65,38,199,209,64,64,164,61,65,108,67,28,39,65,53,111,26,65,98,171,207,41,65,17,228,24,65,132,13,44,65,222,171,22,65,73,157,45,65,172,255,19,65,98,165,44,47,65,122,83,17,65,46,255,47,65,83,75,14,65,0,0,48,65,11,53,11,65,99,101,0,0];
		icons.degrade = Content.createPath();
		icons.degrade.loadFromData(svgData);
		
		// In Out Icon
		svgData = [110,109,2,101,179,64,183,127,17,64,108,135,109,91,62,183,127,17,64,98,126,127,196,61,183,127,17,64,0,0,0,0,203,190,23,64,0,0,0,0,239,114,31,64,108,0,0,0,0,189,140,96,64,98,0,0,0,0,225,64,104,64,126,127,196,61,246,127,110,64,135,109,91,62,246,127,110,64,108,2,101,179,64,246,127,110,64,108,2,101,179,64,146,5,146,64,98,2,101,179,64,67,115,158,64,153,42,194,64,155,172,164,64,112,206,202,64,214,226,155,64,108,169,251,251,64,94,186,83,64,98,96,171,0,65,254,212,72,64,96,171,0,65,174,42,55,64,169,251,251,64,162,69,44,64,108,112,206,202,64,167,116,144,63,98,195,42,194,64,74,155,90,63,2,101,179,64,244,50,134,63,2,101,179,64,184,233,183,63,108,2,101,179,64,183,127,17,64,99,109,75,217,244,65,183,127,17,64,108,227,182,201,65,183,127,17,64,98,103,196,200,65,183,127,17,64,0,0,200,65,203,190,23,64,0,0,200,65,239,114,31,64,108,0,0,200,65,189,140,96,64,98,0,0,200,65,225,64,104,64,103,196,200,65,246,127,110,64,227,182,201,65,246,127,110,64,108,75,217,244,65,246,127,110,64,108,75,217,244,65,146,5,146,64,98,75,217,244,65,67,115,158,64,166,138,248,65,155,172,164,64,156,179,250,65,214,226,155,64,108,125,127,3,66,94,186,83,64,98,206,42,4,66,254,212,72,64,206,42,4,66,174,42,55,64,125,127,3,66,162,69,44,64,108,156,179,250,65,167,116,144,63,98,166,138,248,65,74,155,90,63,75,217,244,65,244,50,134,63,75,217,244,65,184,233,183,63,108,75,217,244,65,183,127,17,64,99,109,0,0,160,65,0,0,64,64,98,0,0,160,65,234,4,149,64,85,65,149,65,0,0,192,64,0,0,136,65,0,0,192,64,98,86,125,117,65,0,0,192,64,0,0,96,65,234,4,149,64,0,0,96,65,0,0,64,64,98,0,0,96,65,87,236,171,63,86,125,117,65,0,0,0,0,0,0,136,65,0,0,0,0,98,85,65,149,65,0,0,0,0,0,0,160,65,87,236,171,63,0,0,160,65,0,0,64,64,99,101,0,0];
		icons.inOut = Content.createPath();
		icons.inOut.loadFromData(svgData);
		
		// Heart Icon
		svgData = [110,109,82,184,166,65,31,133,147,64,108,82,184,166,65,30,133,147,64,108,98,32,165,65,62,116,141,64,108,141,117,163,65,221,182,135,64,108,228,184,161,65,167,80,130,64,108,132,235,159,65,32,138,122,64,108,149,14,158,65,164,46,113,64,108,71,35,156,65,220, 148,104,64,108,213,42,154,65,66,194,96,64,108,130,38,152,65,218,187,89,64,108,151,23,150,65,36,134,83,64,108,102,255,147,65,26,37,78,64,108,71,223,145,65,40,156,73,64,108,149,184,143,65,60,238,69,64,108,177,140,141,65,172,29,67,64,108,254,92,139,65,70, 44,65,64,108,227,42,137,65,72,27,64,64,108,199,247,134,65,98,235,63,64,108,18,197,132,65,176,156,64,64,108,45,148,130,65,194,46,66,64,108,127,102,128,65,154,160,68,64,108,216,122,124,65,162,240,71,64,108,172,52,120,65,190,28,76,64,108,55,253,115,65,66, 34,81,64,108,43,215,111,65,250,253,86,64,108,48,197,107,65,36,172,93,64,108,225,201,103,65,122,40,101,64,108,202,231,99,65,48,110,109,64,108,102,33,96,65,254,119,118,64,108,33,121,92,65,13,32,128,64,108,81,241,88,65,34,96,133,64,108,57,140,85,65,224, 248,138,64,108,4,76,82,65,179,230,144,64,108,195,245,80,65,30,133,147,64,108,194,245,80,65,31,133,147,64,108,0,0,64,65,164,112,181,64,108,62,10,47,65,31,133,147,64,108,62,10,47,65,31,133,147,64,108,253,217,43,65,68,116,141,64,108,243,131,40,65,241,182, 135,64,108,67,10,37,65,211,80,130,64,108,37,111,33,65,186,138,122,64,108,234,180,29,65,148,47,113,64,108,241,221,25,65,50,150,104,64,108,178,236,21,65,18,196,96,64,108,178,227,17,65,56,190,89,64,108,134,197,13,65,32,137,83,64,108,207,148,9,65,196,40, 78,64,108,62,84,5,65,148,160,73,64,108,138,6,1,65,120,243,69,64,108,231,92,249,64,200,35,67,64,108,134,157,240,64,82,51,65,64,108,138,212,231,64,80,35,64,64,108,145,7,223,64,118,244,63,64,108,61,60,214,64,222,166,64,64,108,47,120,205,64,24,58,66,64,108, 2,193,196,64,32,173,68,64,108,75,28,188,64,100,254,71,64,108,144,143,179,64,202,43,76,64,108,75,32,171,64,158,50,81,64,108,225,211,162,64,174,15,87,64,108,162,175,154,64,58,191,93,64,108,194,184,146,64,248,60,101,64,108,92,244,138,64,28,132,109,64,108, 102,103,131,64,94,143,118,64,108,107,45,120,64,121,44,128,64,108,244,13,106,64,75,109,133,64,108,111,121,92,64,199,6,139,64,108,140,120,79,64,90,245,144,64,108,156,19,67,64,54,53,151,64,108,144,82,55,64,94,194,157,64,108,236,60,44,64,158,152,164,64,108, 200,217,33,64,151,179,171,64,108,198,47,24,64,191,14,179,64,108,28,69,15,64,94,165,186,64,108,122,31,7,64,154,114,194,64,108,44,136,255,63,118,113,202,64,108,80,111,242,63,213,156,210,64,108,188,252,230,63,122,239,218,64,108,196,55,221,63,20,100,227, 64,108,172,38,213,63,57,245,235,64,108,152,206,206,63,110,157,244,64,108,156,51,202,63,41,87,253,64,108,168,88,199,63,106,14,3,65,108,144,63,198,63,105,116,7,65,108,8,233,198,63,194,218,11,65,108,168,84,201,63,164,62,16,65,108,216,128,205,63,62,157,20, 65,108,244,106,211,63,199,243,24,65,108,56,15,219,63,119,63,29,65,108,184,104,228,63,142,125,33,65,108,124,113,239,63,86,171,37,65,108,112,34,252,63,33,198,41,65,108,192,57,5,64,81,203,45,65,108,188,45,13,64,82,184,49,65,108,24,232,21,64,160,138,53,65, 108,62,99,31,64,202,63,57,65,108,28,153,41,64,114,213,60,65,108,42,131,52,64,74,73,64,65,108,106,26,64,64,31,153,67,65,108,114,61,74,64,112,61,70,65,108,114,61,74,64,113,61,70,65,108,62,10,135,64,52,51,87,65,108,0,0,64,65,10,215,169,65,108,113,61,158, 65,50,51,87,65,108,82,184,166,65,112,61,70,65,108,82,184,166,65,112,61,70,65,108,138,60,168,65,143,13,67,65,108,226,171,169,65,229,183,63,65,108,112,5,171,65,148,62,60,65,108,85,72,172,65,214,163,56,65,108,196,115,173,65,247,233,52,65,108,254,134,174, 65,92,19,49,65,108,81,129,175,65,120,34,45,65,108,30,98,176,65,208,25,41,65,108,212,40,177,65,252,251,36,65,108,246,212,177,65,155,203,32,65,108,20,102,178,65,93,139,28,65,108,210,219,178,65,249,61,24,65,108,228,53,179,65,49,230,19,65,108,17,116,179, 65,203,134,15,65,108,48,150,179,65,149,34,11,65,108,46,156,179,65,93,188,6,65,108,4,134,179,65,245,86,2,65,108,194,83,179,65,86,234,251,64,108,135,5,179,65,157,51,243,64,108,134,155,178,65,82,143,234,64,108,2,22,178,65,250,2,226,64,108,82,117,177,65, 17,148,217,64,108,220,185,176,65,250,71,209,64,108,22,228,175,65,4,36,201,64,108,140,244,174,65,102,45,193,64,108,214,235,173,65,56,105,185,64,108,156,202,172,65,112,220,177,64,108,153,145,171,65,230,139,170,64,108,148,65,170,65,70,124,163,64,108,100, 219,168,65,20,178,156,64,108,240,95,167,65,171,49,150,64,108,82,184,166,65,28,133,147,64,108,82,184,166,65,29,133,147,64,99,101,0,0];
		icons.heart = Content.createPath();
		icons.heart.loadFromData(svgData);

		// X Icon
		svgData = [110,109,140,57,148,65,248,223,204,64,108,8,230,208,64,233,55,147,65,109,8,230,208,64,248,223,204,64,108,140,57,148,65,233,55,147,65,101,0,0];
		icons.x = Content.createPath();
		icons.x.loadFromData(svgData);
}
