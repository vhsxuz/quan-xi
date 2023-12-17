import { Box, Button, Flex, Heading, Image, Text, extendTheme } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { error } from 'console';

const CLIENT_ID = '32236f358755f224b330'
interface githubUserData {
  login?: string,
  id?: string,
  node_id?: string,
  avatar_url?: string,
  url?: string,
}

const Navbar = () => {

  const navigate = useNavigate()
  const [renderer, setRenderer] = useState(false)
  const [userData, setUserData] = useState<githubUserData>({})

  useEffect(() => {
    const queryString = window.location.search
    const urlSearchParam = new URLSearchParams(queryString)
    const codeParam = urlSearchParam.get('code')

    if(codeParam && (localStorage.getItem('access') === null)) {
      getAccessToken()
    }
    
    async function getAccessToken() {
      try {
        const response = await fetch("http://localhost:8000/getAccessToken?code=" + codeParam, {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data); // Log the data received from the response
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
          getUserData();
          setRenderer(!renderer);
          navigate('/challenge-list');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }
    
  }, [])

async function getUserData() {
  try {
    const response = await fetch('http://localhost:8000/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    setUserData(data)
  } catch (error) {
    console.log(error);
  }
}

  function logout() {
    localStorage.removeItem('accessToken')
    setRenderer(!renderer)
    navigate('/')
  }

  function loginWithGithub() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }

  return (
    <Box bg="brand.100" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" size="lg" color="white">
            Quan Xi
          </Heading>
        </Box>
        <Box>
          <Heading>
            {localStorage.getItem('accessToken')?
            <>
            <Image 
            src={userData.avatar_url}
            boxSize='100px'
            ></Image>
              <Button colorScheme="telegram" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
            :
            <>
              <Button colorScheme="telegram" size="sm" leftIcon={<FaGithub />} onClick={loginWithGithub}>
                Login With Github
              </Button>
            </>
            }
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
