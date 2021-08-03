// SOAL A
function a(n) {
	for (let i = 1; i <= n; i++) {
		let result = '' //string
		for (let j = 1; j <= i; j++) {
			result += `${i}`
		}
		console.log(result)
	}
}

a(5) // call function
// Result :
// 1
// 22
// 333
// 4444
// 55555

// SOAL B
function b(n) {
	for (let i = 1; i <= n; i++) {
		let result = '' //string
		for (let j = i; j >= 1; j--) {
			result += `${j}`
		}
		console.log(result)
	}
}

b(5) // call function

// Result:
// 1
// 21
// 321
// 4321
// 54321

// SOAL C
function c(n) {
	let temp = 1 // integer
	let status = true // boolean define : true === increase,  false === decrease

	for (let i = 1; i <= n; i++) {
		let result = '' //string
		for (let j = 1; j <= i; j++) {
			result += `${temp}`
			if (status === false) {
				temp -= 1
				if (temp === 1) {
					status = true
				}
			} else if (status === true) {
				temp += 1
				if (temp === 5) {
					status = false
				}
			}
		}
		console.log(result)
	}
}

c(5) // call function
// Result:
// 1
// 23
// 454
// 3212
// 34543

// SOAL D

function d(n) {
	for (let i = 0; i < n; i++) {
		let result = '' // string
		result += `${i + 1} `
		result += `${10 - i} `
		result += `${10 + i + 1} `
		result += `${20 - i} `
		result += `${20 + i + 1}`

		console.log(result)
	}
}

d(5) // call function

// result :
// 1 10 11 20 21
// 2 9 12 19 22
// 3 8 13 18 23
// 4 7 14 17 24
// 5 6 15 16 25
