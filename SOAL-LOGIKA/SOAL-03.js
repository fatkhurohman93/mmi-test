const n = [12, 9, 13, 6, 10, 4, 7, 2] // array

const m = [] // array tanpa kelipatan 3
let index_m = 0 // index of m
const length_n = n.length // n array length
for (let i = 0; i < length_n; i++) {
	if (n[i] % 3 !== 0) {
		m[index_m] = n[i] // masukan yang bukan kelipatan 3
		index_m++
	}
}

// console.log(m) // Result: [ 13, 10, 4, 7, 2 ]

// SORTING
const length_m = m.length // n array length
let index_result = 0 // index of result
const result = [] // array result

for (let i = 0; i < length_m; i++) {
	for (let j = 0; j < length_m; j++) {
		if (i === j) {
			//SKIP
		}
		if (m[i] > m[j]) {
			index_result += 1
		}
	}
	result[index_result] = m[i] // hasil
	index_result = 0 // reset index_result
}

console.log(result) // Result : [ 2, 4, 7, 10, 13 ]
