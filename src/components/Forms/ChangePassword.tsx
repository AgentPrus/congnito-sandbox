import { FormEvent, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToggle } from "react-use";
import { useAuth } from "../../context/Auth";

const ChangePassword = () => {
  const { changeUserPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showNewPassword, toggleShowNewPassword] = useToggle(false);

  const handleShowPassword = (type: "current" | "new") => {
    if (type === "current") {
      toggleShowPassword(!showPassword);
    } else {
      toggleShowNewPassword(!showNewPassword);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    changeUserPassword({ password, newPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Change Password
          </Heading>
          <FormControl id="password">
            <FormLabel>Current password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => handleShowPassword("current")}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="newPassword">
            <FormLabel>New password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => handleShowPassword("new")}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default ChangePassword;
