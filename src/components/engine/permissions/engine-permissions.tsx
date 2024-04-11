import { Flex } from "@chakra-ui/react";
import { PermissionsAccessTokens } from "./permissions-access-tokens";
import { PermissionsAdmin } from "./permissions-admin";

interface EnginePermissionsProps {
	instance: string;
}

export const EnginePermissions: React.FC<EnginePermissionsProps> = ({
	instance,
}) => {
	return (
		<Flex flexDir="column" gap={12}>
			<PermissionsAdmin instance={instance} />
			<PermissionsAccessTokens instance={instance} />
		</Flex>
	);
};
