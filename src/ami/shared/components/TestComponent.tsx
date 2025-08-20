import React from "react";
import { Button } from "../../../core/components/base/button";

const TestComponent = () => {
	return (
		<div className="h-screen w-screen bg-admin-background space-x-4">
			<Button className="bg-admin-primary text-admin-primary-foreground hover:bg-admin-primary-hover">
				Primary
			</Button>
			<Button className="bg-admin-secondary text-admin-secondary-foreground hover:bg-admin-secondary-hover">
				Secondary
			</Button>
		</div>
	);
};

export default TestComponent;
