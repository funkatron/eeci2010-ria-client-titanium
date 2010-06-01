/**
 * Multipart File Upload Request Helper Function
 * 
 * A function to help prepare URLRequest object for uploading.
 * The script works without FileReference.upload().
 * 
 * @author FreeWizard
 * 
 * Function Parameters:
 * void PrepareMultipartRequest(URLRequest request, ByteArray file_bytes,
 *                              string field_name = "file", string native_path = "C:\FILE",
 *                              object data_before = {}, object data_after = {});
 * 
 * Sample JS Code:
 * <script>
 * var request = new air.URLRequest('http://example.com/upload.php');
 * var loader = new air.URLLoader();
 * var file = new air.File('C:\\TEST.TXT'); //use file.browseForOpen() on ur wish
 * var stream = new air.FileStream();
 * var buf = new air.ByteArray();
 * var extra = {
 *     "id": "abcd"
 *     };
 * stream.open(file, air.FileMode.READ);
 * stream.readBytes(buf);
 * MultipartRequest(request, buf, 'myfile', file.nativePath, extra);
 * loader.load(request);
 * </script>
 * 
 * Sample PHP Code:
 * <?php
 * $id = $_POST['id'];
 * move_uploaded_file($_FILES['myfile']['tmp_name'], '/opt/blahblah');
 * ?>
 */
function PrepareMultipartRequest(request, file_bytes, field_name, native_path, data_before, data_after) {
	var boundary = '---------------------------1076DEAD1076DEAD1076DEAD';
	var header1 = '';
	var header2 = '\r\n';
	var header1_bytes = new air.ByteArray();
	var header2_bytes = new air.ByteArray();
	var body_bytes = new air.ByteArray();
	var n;
	if (!field_name) field_name = 'file';
	if (!native_path) native_path = 'C:\FILE';
	if (!data_before) data_before = {};
	if (!data_after) data_after = {};
	for (n in data_before) {
		header1 += '--' + boundary + '\r\n'
				+ 'Content-Disposition: form-data; name="' + n + '"\r\n\r\n'
				+ data_before[n] + '\r\n';
	}
	header1 += '--' + boundary + '\r\n'
			+ 'Content-Disposition: form-data; name="' + field_name + '"; filename="' + native_path + '"\r\n'
			+ 'Content-Type: application/octet-stream\r\n\r\n';
	for (n in data_after) {
		header2 += '--' + boundary + '\r\n'
				+ 'Content-Disposition: form-data; name="' + n + '"\r\n\r\n'
				+ data_after[n] + '\r\n';
	}
	header2 += '--' + boundary + '--';
	header1_bytes.writeMultiByte(header1, "ascii");
	header2_bytes.writeMultiByte(header2, "ascii");
	body_bytes.writeBytes(header1_bytes, 0, header1_bytes.length);
	body_bytes.writeBytes(file_bytes, 0, file_bytes.length);
	body_bytes.writeBytes(header2_bytes, 0, header2_bytes.length);
	request.method = air.URLRequestMethod.POST;
	request.contentType = 'multipart/form-data; boundary='+boundary;
	request.data = body_bytes;
}
