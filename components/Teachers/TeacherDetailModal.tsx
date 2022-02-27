import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  HStack,
  SimpleGrid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { hireTeacher, getTeacher } from "../../functions/Teacher";
import Swal from "sweetalert2";

interface ITeacherDetails {
  isHired: boolean;
  rating: number;
  reviews: any[];
  numberOfStudents: number;
  age: number;
  city: string;
  country: string;
  email: string;
  gender: string;
  jwt: string;
  recitation: string;
  name: string;
  availableSlots: any[];
  courses: any[];
  intro: string;
  roomLink: string;
}
export const StudentDetailsModal = ({
  isOpen,
  onOpen,
  onClose,
  text,
  title,
  icon,
  id,
  getDetailsFunction,
  userEmail,
}: any) => {
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState<ITeacherDetails | any>(null);

  useEffect(() => {
    getTeacher(userEmail).then((resp) => setUserDetails(resp));
  }, []);

  return (
    <div>
      {userDetails && (
        <Modal isOpen={true} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent my="auto" maxWidth="700px">
            <ModalHeader display="flex">
              Teachers Details -{" "}
              <Text mx={2} color={userDetails.isHired ? "green.400" : "red"}>
                {userDetails.isHired ? "Hired" : "Not Hired"}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={2} columnGap={[0, 4]}>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2} width="100%">
                    <Text fontWeight="bold">Name:</Text>
                    <Text>{userDetails.name}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2} width="100%">
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{userDetails.email}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Gender</Text>
                    <Text>{userDetails.gender}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Age:</Text>
                    <Text>{userDetails.age}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">City:</Text>
                    <Text>{userDetails.city}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Country:</Text>
                    <Text>{userDetails.country}</Text>
                  </HStack>
                </GridItem>

                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">No. Of Students:</Text>
                    <Text>{userDetails.numberOfStudents}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Courses:</Text>
                    <Text>{userDetails.courses.join(", ")}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Rating:</Text>
                    <Text>{userDetails.rating}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <HStack my={2}>
                    <Text fontWeight="bold">Intro:</Text>
                    <Text>{userDetails.intro}</Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
                  <Text fontWeight="bold">Available Slots:</Text>
                  <GridItem colSpan={2} ml={2}>
                    {userDetails.availableSlots.map((item: any, key: any) => {
                      return (
                        <Box key={key} my={2}>
                          <Text fontWeight="bold" textTransform="capitalize">
                            {item.day}
                          </Text>
                          {item.hours.map((hour: any, key: any) => {
                            return (
                              <HStack key={key}>
                                <BsCheckLg />{" "}
                                <Text>
                                  {Number(hour) >= 10
                                    ? Number(hour)
                                    : `0${Number(hour)}`}{" "}
                                  -{" "}
                                  {Number(hour) + 1 >= 10
                                    ? Number(hour) + 1
                                    : `0${Number(hour) + 1}`}
                                </Text>
                              </HStack>
                            );
                          })}
                        </Box>
                      );
                    })}
                  </GridItem>
                </GridItem>
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              {/* <Button
                backgroundColor="brand.primary"
                color="#fff"
                mr={2}
                onClick={() => {
                  window.print();
                }}
              >
                Print
              </Button> */}
              {!userDetails.isHired && (
                <Button
                  backgroundColor="brand.primary"
                  color="#fff"
                  mr={3}
                  onClick={async () => {
                    setLoading(true);
                    const hiredResponse = await hireTeacher(userDetails.email);
                    if (hiredResponse === 200) {
                      setLoading(false);
                      getDetailsFunction();
                      getTeacher(userEmail).then((resp) =>
                        setUserDetails(resp)
                      );
                    }
                  }}
                  _hover={{
                    bg: "brand.primary",
                  }}
                  disabled={loading}
                >
                  {loading ? "Please Wait..." : "Hire this teacher"}
                </Button>
              )}
              <Button
                backgroundColor="brand.primary"
                color="#fff"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
