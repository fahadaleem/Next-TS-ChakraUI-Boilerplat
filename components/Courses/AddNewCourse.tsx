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
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { handleAddNewCourse } from "../../functions/Courses";
import {
  ref,
  uploadBytes,
  storage,
  getDownloadURL,
} from "../../firebase-config";
import Swal from "sweetalert2";

interface IBook {
  name: string;
  link: string;
  thumbnail: string;
}

interface ICourseDetails {
  name: string;
  description: string;
  books: IBook[];
}

export const AddNewCourseComponent = () => {
  const [courseDetails, setCourseDetails] = useState<ICourseDetails>({
    name: "",
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

  const handleUploadBook = (index: number, file: any) => {
    const storageRef = ref(
      storage,
      `/${courseDetails.name}/books/${file.name}`
    );

    uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log(snapshot);

      const downloadUrl = await getDownloadURL(
        ref(storage, `/${courseDetails.name}/books/${file.name}`)
      );

      let formValues = { ...courseDetails };
      formValues.books[index].link = downloadUrl;
      setCourseDetails(formValues);
    });
  };
  const handleUploadThumbnail = (index: number, file: any) => {
    const storageRef = ref(
      storage,
      `/${courseDetails.name}/books/thumbnail/${file.name}`
    );

    uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log(snapshot);

      const downloadUrl = await getDownloadURL(
        ref(storage, `/${courseDetails.name}/books/thumbnail/${file.name}`)
      );

      let formValues = { ...courseDetails };
      formValues.books[index].thumbnail = downloadUrl;
      setCourseDetails(formValues);
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const booksWithoutName = courseDetails.books.filter(
      (item) => item.name === ""
    );

    if (booksWithoutName.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Enter Book Title",
      });
      return;
    }

    const response = await handleAddNewCourse(courseDetails);
    console.log(response);
    if (response === 201) {
      Swal.fire({
        title: "Success",
        text: "New Course Added Successfully!",
        icon: "success",
      }).then((resp) => {
        setCourseDetails({
          name: "",
          description: "",
          books: [],
        });
      });
    } else if (response === 400) {
      Swal.fire({
        title: "Error",
        text: "This Course is already!",
        icon: "error",
      });
    }
  };

  return (
    <Box>
      <Container maxWidth="container.lg">
        <Heading textAlign="center">Add a new course</Heading>
        <form onSubmit={onSubmit}>
          <FormControl my={4}>
            <FormLabel>Course Name:</FormLabel>
            <Input
              type="text"
              value={courseDetails.name}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  name: e.target.value,
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
                <GridItem colSpan={[2, 1]}>
                  <FormControl my="3">
                    <FormLabel>Upload Book:</FormLabel>
                    <input
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e: any) => {
                        handleUploadBook(key, e?.target.files[0]);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={[2, 1]}>
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
                        onChange={(e: any) => {
                          handleUploadThumbnail(key, e?.target?.files[0]);
                        }}
                      />
                    </Box>
                    {courseDetails.books[key].thumbnail && (
                      <Image
                        src={courseDetails.books[key].thumbnail}
                        boxSize="350px"
                        objectFit="cover"
                        mx="auto"
                      />
                    )}
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            );
          })}
          <Text color="brand.primary" cursor="pointer" onClick={AddBookField}>
            Click to Add Books
          </Text>
          <FormControl my={4}>
            <Button
              w="100%"
              bg="brand.primary"
              color="#fff"
              fontSize="lg"
              type="submit"
              disabled={
                !courseDetails.name ||
                !courseDetails.description ||
                !courseDetails.books.length
              }
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};
