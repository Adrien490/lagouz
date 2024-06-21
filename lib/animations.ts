// @/lib/animations.js
export const listVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
};

export const itemVariants = {
	hidden: {
		opacity: 0,
		y: -20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 50,
		},
	},
	exit: {
		opacity: 0,
		y: 20,
		transition: {
			type: "spring",
			stiffness: 50,
		},
	},
	click: {
		scale: 0.95,
	},
};
