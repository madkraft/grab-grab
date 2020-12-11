import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  ModalHeader,
} from "@chakra-ui/react";
import { fetchCodes } from "../utils/api";

export const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState({});
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

  const handleCodeClick = (code) => {
    setSelectedCode(code);
    onOpen();
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {codes.map((code) => {
          return (
            <Box
              bg="blue.500"
              minHeight="0"
              minWidth="0"
              padding="0.5rem"
              textAlign="center"
              height={32}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={() => handleCodeClick(code)}
            >
              <Box fontSize="xl">{code.name}</Box>
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
          <ModalHeader>{selectedCode.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              minHeight="230px"
              src={selectedCode.url}
              alt={selectedCode.name}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
