import React from 'react';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <Box bg="blue.900" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" size="lg" color="white">
            Quan Xi
          </Heading>
        </Box>
        <Box>
          <Button colorScheme="telegram" size="sm" leftIcon={<FaGithub />}>
            Login With Github
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
