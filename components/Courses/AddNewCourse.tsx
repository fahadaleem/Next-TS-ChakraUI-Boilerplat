import {
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Container,
  Textarea,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface IBook {
  name: string;
  link: string;
  thumbnail: string;
}

interface ICourseDetails {
  courseName: string;
  description: string;
  books: IBook[];
}

export const AddNewCourseComponent = () => {
  const [courseDetails, setCourseDetails] = useState<ICourseDetails>({
    courseName: "",
    description: "",
    books: [],
  });

  const AddBookField = () => {
    setCourseDetails({
      ...courseDetails,
      books: [...courseDetails.books, { name: "", link: "", thumbnail: "" }],
    });
  };

  const handleChangeBookName = (index: number, name: string) => {
    let formValues = { ...courseDetails };
    formValues.books[index].name = name;
    setCourseDetails(formValues);
  };

  return (
    <Box>
      <Container maxWidth="container.lg">
        <Heading textAlign="center">Add a new course</Heading>
        <form>
          <FormControl my={4}>
            <FormLabel>Course Name:</FormLabel>
            <Input
              type="text"
              value={courseDetails.courseName}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  courseName: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel>Course Description:</FormLabel>
            <Textarea
              value={courseDetails.description}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  description: e.target.value,
                })
              }
              maxHeight={200}
            />
          </FormControl>

          {courseDetails.books.map((item, key) => {
            return (
              <SimpleGrid columns={2} key={key}>
                <GridItem colSpan={2}>
                  <FormControl my={4}>
                    <FormLabel>Book Name:</FormLabel>
                    <Input
                      type="text"
                      value={courseDetails.books[key].name}
                      onChange={(e) => {
                        handleChangeBookName(key, e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl my="3">
                    <FormLabel>Upload Book:</FormLabel>
                    <input type="file" accept=".pdf" required />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl my="3">
                    <FormLabel>Upload Thumbnail:</FormLabel>
                    <Box
                      position="relative"
                      border="1px solid #d5d5d5"
                      my={3}
                      lineHeight="30px"
                      textAlign="center"
                      borderRadius={5}
                      p={1}
                    >
                      Upload Book Thumbnail
                      <Input
                        type="file"
                        opacity="0"
                        position="absolute"
                        top="0"
                        left="0"
                        bottom="0"
                        right="0"
                        width="100%"
                        height="100%"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </Box>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            );
          })}
          <Text color="brand.primary" cursor="pointer" onClick={AddBookField}>
            Click to Add Books
          </Text>
          <FormControl my={4}>
            <Button w="100%" bg="brand.primary" color="#fff" fontSize="lg">
              Submit
            </Button>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};
