const cpfSize = 11;

export function validateCpf (rawCPF: string) {
	if (rawCPF === null || rawCPF === undefined) return false;
	const cpfIsOversized = cpfSizeIsValid(rawCPF);
	if (cpfIsOversized) return false;
	const formattedCpf = formatCPF(rawCPF);
	if(verifyAllNumbersIsEqual(formattedCpf)) return false;
	try{  
		let sumOf10Digits = 0;
		let sumOf11Digits = 0;
		for (let position = 1; position < cpfSize - 1; position++) {
			const digit = parseInt(getPartOfCpf({cpf: formattedCpf, start: position - 1, end: position}));
			sumOf10Digits += calculateNumberWithDigit({size: cpfSize, position, digit });
			sumOf11Digits += calculateNumberWithDigit({size: cpfSize + 1, position, digit });  
		};  
		const restOfFirst10Digits = verifyRestIsMaiorThan2(sumOf10Digits);  
		const multiplicationWithFirstDigit = sumOf11Digits + (2 * restOfFirst10Digits);  
		const restOfFirst11Digits = verifyRestIsMaiorThan2(multiplicationWithFirstDigit);
		const digitsResult = "" + restOfFirst10Digits + "" + restOfFirst11Digits;  
		const digitsVerification = getPartOfCpf({ cpf:formattedCpf , start: cpfSize-2, end: cpfSize }); 
		return digitsVerification == digitsResult;
	}catch (e){  
		console.error("Erro !"+e);  
		return false;  
	}  
}

function formatCPF(cpf: string) {
	return cpf.replace(/\D/g, '');
}

function cpfSizeIsValid(cpf: string) {
	return cpf.length < 11 || cpf.length > 14
}

function verifyAllNumbersIsEqual(cpf: string) {
	return cpf.split("").every(cpfNumber => cpfNumber === cpf[0])
}

function calculateNumberWithDigit({size, position, digit}: 
	{
		size: number; 
		position: number; 	
		digit: number;
	}){
	return ( size - position ) * digit;
}

function verifyRestIsMaiorThan2(sumNumberTotal: number) {
	const rest = sumNumberTotal % cpfSize;
	return rest < 2 ? 0 : cpfSize - rest;
}

function getPartOfCpf({cpf, start, end}: {cpf: string, start: number, end: number}) {
	return cpf.substring(start, end);
}