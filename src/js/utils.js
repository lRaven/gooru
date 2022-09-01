
const hashString = async (algorithm = 'SHA-1', dataStr) => {
	const encoderToBytes = new TextEncoder();
	const dataBytes = encoderToBytes.encode(dataStr);
	const hashData = await crypto.subtle.digest(algorithm, dataBytes);
	
	/* const decoder = new TextDecoder("utf-8"); */
	return String.fromCharCode(...new Uint8Array(hashData));
};

export { hashString };
