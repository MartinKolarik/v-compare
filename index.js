const clean = version => version.trim().replace(/^[=v]+/, '');
const dPattern = /^\d+$/;
const pPattern = /[-.]|\d+|[^-.\d].*/g;
const tPattern = /[a-z]|-\d+$/;
const nPattern = /\d+|[^\d]+/g;

function compare (versionA, versionB) {
	versionA = clean(versionA);
	versionB = clean(versionB);

	let ax = versionA.match(pPattern);
	let bx = versionB.match(pPattern);

	while (ax && bx && ax.length && bx.length) {
		let a = ax.shift();
		let b = bx.shift();

		if (a === b) {
			// continue
		} else if ((a === '-' || a === '.') && dPattern.test(a)) {
			return -1;
		} else if ((b === '-' || b === '.') && dPattern.test(b)) {
			return 1;
		} else if (dPattern.test(a) && dPattern.test(b)) {
			return a - b;
		} else {
			return compareStrings(a, b);
		}
	}

	// 1.1.0-alpha > 1.0
	if (ax && ax.length > 2) {
		return 1;
	} else if (bx && bx.length > 2) {
		return -1;
	}

	return compareStrings(versionA, versionB);
}

function compareStrings (versionA, versionB) {
	versionA = versionA.toLowerCase();
	versionB = versionB.toLowerCase();

	// 1.0.0 > 1.0.0-alpha
	if (tPattern.test(versionA) && !tPattern.test(versionB)) {
		return -1;
	} else if (tPattern.test(versionB) && !tPattern.test(versionA)) {
		return 1;
	}

	// 1.0.0-alpha.10 > 1.0.0-alpha.9
	let ax = versionA.match(nPattern);
	let bx = versionB.match(nPattern);

	while (ax && bx && ax.length && bx.length) {
		let a = ax.shift();
		let b = bx.shift();

		if (dPattern.test(a)) {
			a = Number(a);
		}

		if (dPattern.test(b)) {
			b = Number(b);
		}

		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		}
	}

	// 1.0.0 > 1.0
	if (ax.length) {
		return 1;
	} else if (bx.length) {
		return -1;
	}

	return 0;
}

module.exports = compare;
module.exports.rCompare = (a, b) => compare(b, a);
