import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/Auth";

const Account = () => {
  const { getSession } = useAuth();

  const [profile, setProfile] = useState<{
    username: string;
    email: string;
  } | null>({
    username: "",
    email: "",
  });

  useEffect(() => {
    getSession().then((data) => {
      setProfile({
        username: data.attributes.name,
        email: data.attributes.email,
      });
    });
  }, [getSession]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
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
          User Profile
        </Heading>
        <FormControl id="userName">
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            disabled
            value={profile?.username}
            defaultValue={""}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            disabled
            value={profile?.email}
            defaultValue={""}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Account;
