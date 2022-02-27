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

interface StudentDetailsTypes {
  name: string;
  email: string;
  country: string;
  city: string;
  age: string;
  gender: string;
}

export const StudentDetailsModal = ({
  isOpen,
  onOpen,
  onClose,
  text,
  title,
  icon,
  id,
  userDetails,
}: any) => {
  return (
    <div>
      <Modal isOpen={true} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent my="auto">
          <ModalHeader>Student Details</ModalHeader>
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
                  <Text wordBreak="break-word">{userDetails.email}</Text>
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
                  <Text fontWeight="bold">Age:</Text>
                  <Text>{userDetails.age}</Text>
                </HStack>
              </GridItem>
              <GridItem colSpan={1}>
                <HStack my={2}>
                  <Text fontWeight="bold">Gender</Text>
                  <Text>{userDetails.gender}</Text>
                </HStack>
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
    </div>
  );
};
