import loadVecList from "../src/math/VecListReader";

describe('Core math function tests', () => {
	test('Test basic file content to vector parsing', () => {
		const fileContent = `1 2.521 3.5325 4.321321\n2 6.532 7.352 8.85\n3 10.432 11.742 12.54\n`;
		const result = loadVecList(fileContent);

		expect(result.result).toBe('success');
		expect(result.list).toBeDefined();

		expect(result.list?.vecs.length).toBe(3);

		expect(result.list?.vecs[0][0]).toBe(2.521);
		expect(result.list?.vecs[1][1]).toBe(7.352);
		expect(result.list?.vecs[2][2]).toBe(12.54);
	});

	test('Test content to vector parsing with incorrect format', () => {
		const fileContent = `1 2.521 3.5325 4.321321\n2 6.532 7.352 8.85\n3 10.432 11.742\n`;
		const result = loadVecList(fileContent);
		
		expect(result.result).toBe('incorrect format');
		expect(result.list).toBeUndefined();
	});

	test('Test content to vector parsing with repeating ids', () => {
		const fileContent = `1 2.521 3.5325 4.321321\n2 6.532 7.352 8.85\n2 10.432 11.742 12.54\n`;
		const result = loadVecList(fileContent);

		expect(result.result).toBe('success');
		expect(result.list).toBeDefined();

		expect(result.list?.vecs.length).toBe(2);

		expect(result.list?.vecs[0][0]).toBe(2.521);
		expect(result.list?.vecs[1][1]).not.toBe(7.352);
		expect(result.list?.vecs[1][1]).toBe(11.742);
	});
});
