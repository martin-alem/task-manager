function mergeSortedArray(array1, array2) {
	let array1Pointer = 0;
	let array2Pointer = 0;
	let array1Length = array1.length;
	let array2Length = array2.length;
	let sortedArray = [];

	while (array1Pointer < array1Length && array2Pointer < array2Length) {
		if (array1[array1Pointer]["priority"] < array2[array2Pointer]["priority"]) {
			sortedArray.push(array1[array1Pointer++]);
		} else if (array1[array1Pointer]["priority"] >= array2[array2Pointer]["priority"]) {
			sortedArray.push(array2[array2Pointer++]);
		}
	}

	for(let i = array1Pointer; i < array1Length; i++) {
		sortedArray.push(array1[i]);
	}

	for(let i = array2Pointer; i < array2Length; i++) {
		sortedArray.push(array2[i]);
	}

	return sortedArray;
}

function sortTask(list) {

	if(list.length === 1){
		return list;
	}

	let midPoint = Math.floor(list.length / 2);
	let leftList = sortTask(list.slice(0, midPoint));
	let rightList = sortTask(list.slice(midPoint));
	return mergeSortedArray(leftList, rightList);
}
export default sortTask;
