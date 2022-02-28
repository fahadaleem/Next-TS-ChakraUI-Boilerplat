import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import AlertBox from "./Alert";
import { useRouter } from "next/router";
import { useStore } from "../store";
import axois from "axios";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleShowClick = () => setShowPassword(!showPassword);
  const addUser = useStore((state) => state.addUser);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (loginCredentials.email === "" || loginCredentials.password === "") {
      setError({
        status: true,
        message: "Please fill out the required fields.",
      });
      return;
    }

    axios
      .post("http://46.137.61.4:5000/auth/login/admin", loginCredentials)
      .then((resp) => {
        addUser(resp.data);
        router.push("/admin");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    // API Integration here.
    console.log(loginCredentials);

    // addUser({
    //   username: "Fahad",
    //   email: "faleem396@gmail.com",
    // });
  };

  useEffect(() => {
    setError({
      ...error,
      status: false,
    });
  }, [loginCredentials]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome Admin</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              flexDirection="column"
              justifyContent="center"
              padding={8}
              borderRadius={5}
            >
              {error.status && <AlertBox description={error.message} />}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={loginCredentials?.email}
                    onChange={(e) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        email: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginCredentials?.password}
                    onChange={(e) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                bg="brand.primary"
                width="full"
                color="#fff"
                _hover={{
                  backgroundColor: "brand.primary",
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
