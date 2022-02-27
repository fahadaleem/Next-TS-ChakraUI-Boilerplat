import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  TableContainer,
  Button,
  Text,
  Box,
  Heading,
  HStack,
  Tooltip,
  Stack,
} from "@chakra-ui/react";
import { BsFillTrashFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getAllTeachers, deleteTeacher } from "../../functions/Teacher";
// import { SearchFilter } from "./searchFilter";
import { StudentDetailsModal } from "./TeacherDetailModal";
import { getAllStudents } from "../../functions/Students";

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

const TeachersTable = () => {
  //   const auth: any = useStore((state) => state.auth);

  const [data, setData] = useState([
    {
      name: "Fahad Aleem",
      email: "faleem396@gmail.com",
      country: "Pakistan",
      city: "Karachi",
      age: "22",
      gender: "Male",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [userDetails, setUserDetails] = useState<ITeacherDetails | any>({});

  const [id, setId] = useState(null);

  useEffect(() => {
    getAllTeachers().then((resp) => setData(resp));
  }, []);

  //   const handleFilter = async (searchBy: string, searchValue: string) => {
  //     const filteredStudents = await filterStudent(
  //       searchBy,
  //       searchValue,
  //       auth.jwt
  //     );
  //     if (filteredStudents.status) {
  //       setData(filteredStudents.data);
  //       setPagination({
  //         ...pagination,
  //         total: filteredStudents.data.meta.pagination.total,
  //       });
  //     }
  //   };

  return (
    <Box>
      {isOpen && (
        <StudentDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userEmail={userDetails?.email}
          getDetailsFunction={() =>
            getAllTeachers().then((resp) => setData(resp))
          }
        />
      )}
      <Heading>All Qari'es</Heading>
      <Text>
        Manage all the Qari'es records from here, view, update and delete the
        students.
      </Text>
      {/* <SearchFilter handleSearchFilter={handleFilter} /> */}
      <TableContainer my="3">
        <Table variant="striped" border="1px solid #efefef">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>City</Th>
              <Th>Gender</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length! > 0 &&
              data?.map((item: any) => (
                <Tr key={item.id}>
                  <Td position="relative">
                    <Tooltip label={item.isHired ? "Hired" : "Not Hired"}>
                      <Box
                        position="absolute"
                        height="8px"
                        width="8px"
                        bg={item.isHired ? "green.400" : "red"}
                        left="2"
                        top="8"
                        borderRadius="50%"
                      />
                    </Tooltip>
                    {item.name}
                  </Td>
                  <Td>{item.email}</Td>
                  <Td>{item.city}</Td>
                  <Td>{item.gender}</Td>
                  <Td isNumeric>
                    <Tooltip label="Delete">
                      <IconButton
                        onClick={async () => {
                          await deleteTeacher(item.email);
                          getAllTeachers().then((resp) => setData(resp));
                        }}
                        aria-label="Delete Student"
                        icon={<BsFillTrashFill />}
                        bg="#F87060"
                        color="white"
                        _hover={{
                          bg: "#f9a59c",
                        }}
                      />
                    </Tooltip>
                    <Tooltip label="Edit">
                      <IconButton
                        aria-label="Edit Student"
                        icon={<BiEdit />}
                        mx="2"
                        bg="#386FA4"
                        color="white"
                        _hover={{
                          bg: "#7facd7",
                        }}
                      />
                    </Tooltip>
                    <Tooltip label="View">
                      <IconButton
                        aria-label="View Student"
                        onClick={() => {
                          setUserDetails(item);
                          setIsOpen(true);
                        }}
                        icon={<FaEye />}
                        bg="brand.primary"
                        color="white"
                        _hover={{
                          bg: "#aab6f3",
                        }}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {data?.length === 0 && (
          <Text py="4" align="center" width="100%">
            No Record Found
          </Text>
        )}
      </TableContainer>
    </Box>
  );
};

export default TeachersTable;
