import React, { useEffect } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';


const CLIENT_ID = '19d575484da3e7969f2a'

const Navbar = () => {

  useEffect(() => {
    // http://localhost:3000/?code=a440014735f792574eb2
    const queryString = window.location.search
    const urlSearchParam = new URLSearchParams(queryString)
    const codeParam = urlSearchParam.get('code')
    console.log(codeParam)
  }, [])

  function loginWithGithub() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }

  return (
    <Box bg="blue.900" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" size="lg" color="white">
            Quan Xi
          </Heading>
        </Box>
        <Box>
          <Button colorScheme="telegram" size="sm" leftIcon={<FaGithub />} onClick={loginWithGithub}>
            Login With Github
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
