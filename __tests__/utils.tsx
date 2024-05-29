import { findTagCategory, tags } from "@/constants/tags";

describe("findTagCategory", () => {
	it("returns the correct color for a tag", () => {
		expect(findTagCategory("javascript", tags)).toBe("technical-skills");
		expect(findTagCategory("react", tags)).toBe("technical-skills");
		expect(findTagCategory("python", tags)).toBe("technical-skills");
		expect(findTagCategory("nodejs", tags)).toBe("technical-skills");
		expect(findTagCategory("node.js", tags)).toBe("technical-skills");
		expect(findTagCategory("node js", tags)).toBe("technical-skills");
		expect(findTagCategory("vuejs", tags)).toBe("technical-skills");
		expect(findTagCategory("Vuejs", tags)).toBe("technical-skills");
		expect(findTagCategory("VUE.js", tags)).toBe("technical-skills");
		expect(findTagCategory("React-Native", tags)).toBe("technical-skills");
	});
});
