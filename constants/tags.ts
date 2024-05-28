interface Tag {
	tagName: string;
	tagCategory: string;
}
const tags: Tag[] = [
	{ tagName: "JavaScript", tagCategory: "technical-skills" },
	{ tagName: "Python", tagCategory: "technical-skills" },
	{ tagName: "Java", tagCategory: "technical-skills" },
	{ tagName: "React", tagCategory: "technical-skills" },
	{ tagName: "Node.js", tagCategory: "technical-skills" },
	{ tagName: "Git", tagCategory: "technical-skills" },
	{ tagName: "Docker", tagCategory: "technical-skills" },
	{ tagName: "AWS", tagCategory: "technical-skills" },
	{ tagName: "SQL", tagCategory: "technical-skills" },
	{ tagName: "HTML/CSS", tagCategory: "technical-skills" },
	{ tagName: "Data Structures", tagCategory: "problem-solving" },
	{ tagName: "Algorithms", tagCategory: "problem-solving" },
	{ tagName: "Dynamic Programming", tagCategory: "problem-solving" },
	{ tagName: "Sorting", tagCategory: "problem-solving" },
	{ tagName: "Recursion", tagCategory: "problem-solving" },
	{ tagName: "Graphs", tagCategory: "problem-solving" },
	{ tagName: "Big O Notation", tagCategory: "problem-solving" },
	{ tagName: "Hash Tables", tagCategory: "problem-solving" },
	{ tagName: "Binary Search", tagCategory: "problem-solving" },
	{ tagName: "Linked Lists", tagCategory: "problem-solving" },
	{ tagName: "Scalability", tagCategory: "system-design" },
	{ tagName: "Reliability", tagCategory: "system-design" },
	{ tagName: "Microservices", tagCategory: "system-design" },
	{ tagName: "Load Balancing", tagCategory: "system-design" },
	{ tagName: "Databases", tagCategory: "system-design" },
	{ tagName: "Caching", tagCategory: "system-design" },
	{ tagName: "Messaging Queues", tagCategory: "system-design" },
	{ tagName: "Design Patterns", tagCategory: "system-design" },
	{ tagName: "Fault Tolerance", tagCategory: "system-design" },
	{ tagName: "High Availability", tagCategory: "system-design" },
	{ tagName: "Teamwork", tagCategory: "behavioral" },
	{ tagName: "Communication", tagCategory: "behavioral" },
	{ tagName: "Leadership", tagCategory: "behavioral" },
	{ tagName: "Conflict Resolution", tagCategory: "behavioral" },
	{ tagName: "Problem-Solving", tagCategory: "behavioral" },
	{ tagName: "Adaptability", tagCategory: "behavioral" },
	{ tagName: "Time Management", tagCategory: "behavioral" },
	{ tagName: "Decision Making", tagCategory: "behavioral" },
	{ tagName: "Creativity", tagCategory: "behavioral" },
	{ tagName: "Stress Management", tagCategory: "behavioral" },
	{ tagName: "Agile Methodology", tagCategory: "practical-knowledge" },
	{ tagName: "Security Best Practices", tagCategory: "practical-knowledge" },
	{ tagName: "User Experience (UX)", tagCategory: "practical-knowledge" },
	{ tagName: "User Interface (UI)", tagCategory: "practical-knowledge" },
	{ tagName: "Data Visualization", tagCategory: "practical-knowledge" },
	{ tagName: "Compliance Standards", tagCategory: "practical-knowledge" },
	{ tagName: "Industry Regulations", tagCategory: "practical-knowledge" },
	{ tagName: "Version Control", tagCategory: "practical-knowledge" },
	{ tagName: "Deployment Strategies", tagCategory: "practical-knowledge" },
	{ tagName: "Testing Techniques", tagCategory: "practical-knowledge" },
];

const tagCategory = tags.map((tag) => {
	const tagObject: any = {};
	tagObject[tag.tagName] = tag.tagCategory;
	return tagObject;
});
export default tags;
