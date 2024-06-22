"use client";

import Link from "next/link";
import SparklesText from "./magicui/sparkles-text";

const Logo = () => {
	return (
		<Link href="/">
			<SparklesText className="text-3xl" text="La Gouz" />
		</Link>
	);
};

export default Logo;
