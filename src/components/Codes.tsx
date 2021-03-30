import { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  ModalHeader,
  Box,
} from "@chakra-ui/react";
import { fetchCodes } from "../utils/api";
import { Product } from "./Product";

interface Code {
  id: string;
  name: string;
  url: string;
}

export const Codes = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [selectedCode, setSelectedCode] = useState<Code>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getCodes = async () => {
      const records = (await fetchCodes()) ?? [];
      const codes = records.map((code) => ({
        id: code.id,
        name: code.fields.name,
        url: code.fields.attachment[0].url,
      }));
      setCodes(codes);
    };

    getCodes();
  }, []);

  const handleCodeClick = (code: Code) => {
    setSelectedCode(code);
    onOpen();
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {codes.map((code) => {
          return (
            <Box key={code.id} onClick={() => handleCodeClick(code)}>
              <Product name={code.name} />
            </Box>
          );
        })}
      </Grid>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background="gray.600">
            {selectedCode?.name ?? ""}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              minHeight="230px"
              src={selectedCode?.url ?? ""}
              alt={selectedCode?.name ?? ""}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
