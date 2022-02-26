import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

interface IAlertBox {
  description: string;
}

const AlertBox = ({ description }: IAlertBox) => {
  return (
    <Alert status="error" borderRadius={5} py={2}>
      <AlertIcon />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertBox;
