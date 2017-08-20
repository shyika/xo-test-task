import constants from '../constants'
const {X, O, THR, MHR, BHR, LVR, MVR, RVR, LDR, RDR} = constants

function lengthCheck(ar = []) {
	return (ar.join('').replace(/ /g, '').length === 9)? true: false
}

function checkCombination(combination, reg) {
	if (!combination.toString().match(reg)) return false
	return true
}

function retrieveResult(done = false, combination = undefined, winner = undefined, isEqual = false) {
	return {done, combination, winner, isEqual}
}

const blank = 'blank'
const hor = 'horizontal'
const ver = 'vertical'
const leftDiag = 'left-giagonal'
const rightDiag = 'right-diagonal'

export function getClassesByCombination(combination) {
	let arr = new Array(9).fill(blank)

	switch(combination) {
		case THR:
			arr[0] = hor
			arr[1] = hor
			arr[2] = hor
			break
		case MHR:
			arr[3] = hor
			arr[4] = hor
			arr[5] = hor
			break
		case BHR:
			arr[6] = hor
			arr[7] = hor
			arr[8] = hor
			break
		case LVR:
			arr[0] = ver
			arr[3] = ver
			arr[6] = ver
			break
		case MVR:
			arr[1] = ver
			arr[4] = ver
			arr[7] = ver
			break
		case RVR:
			arr[2] = ver
			arr[5] = ver
			arr[8] = ver
			break
		case LDR:
			arr[0] = leftDiag
			arr[4] = leftDiag
			arr[8] = leftDiag
			break
		case RDR:
			arr[2] = rightDiag
			arr[4] = rightDiag
			arr[6] = rightDiag
	}

	return arr
}

export function getStatus(matrix = []) {

	let tHR = matrix[0] + matrix[1] + matrix[2]
	let mHR = matrix[3] + matrix[4] + matrix[5]
	let bHR = matrix[6] + matrix[7] + matrix[8]

	let lVR = matrix[0] + matrix[3] + matrix[6]
	let mVR = matrix[1] + matrix[4] + matrix[7]
	let rVR = matrix[2] + matrix[5] + matrix[8]

	let ldR = matrix[0] + matrix[4] + matrix[8]
	let rdR = matrix[2] + matrix[4] + matrix[6]

	// Check for X
	if (checkCombination(tHR, /XXX/g)) return retrieveResult(true, THR, X)
	if (checkCombination(mHR, /XXX/g)) return retrieveResult(true, MHR, X)
	if (checkCombination(bHR, /XXX/g)) return retrieveResult(true, BHR, X)
	
	if (checkCombination(lVR, /XXX/g)) return retrieveResult(true, LVR, X)
	if (checkCombination(mVR, /XXX/g)) return retrieveResult(true, MVR, X)
	if (checkCombination(rVR, /XXX/g)) return retrieveResult(true, RVR, X)

	if (checkCombination(ldR, /XXX/g)) return retrieveResult(true, LDR, X)
	if (checkCombination(rdR, /XXX/g)) return retrieveResult(true, RDR, X)

	// Check for O
	if (checkCombination(tHR, /OOO/g)) return retrieveResult(true, THR, O)
	if (checkCombination(mHR, /OOO/g)) return retrieveResult(true, MHR, O)
	if (checkCombination(bHR, /OOO/g)) return retrieveResult(true, BHR, O)
	
	if (checkCombination(lVR, /OOO/g)) return retrieveResult(true, LVR, O)
	if (checkCombination(mVR, /OOO/g)) return retrieveResult(true, MVR, O)
	if (checkCombination(rVR, /OOO/g)) return retrieveResult(true, RVR, O)

	if (checkCombination(ldR, /OOO/g)) return retrieveResult(true, LDR, O)
	if (checkCombination(rdR, /OOO/g)) return retrieveResult(true, RDR, O)

	if (lengthCheck(matrix)) return retrieveResult(true,null,null,true)

	return retrieveResult()
}