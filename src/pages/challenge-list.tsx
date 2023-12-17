import { Button } from '@chakra-ui/button';
import { Heading, Stack, Text, Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Challenge = {
  id: string;
  image: string;
  title: string;
  question: string;
  githubLink: string;
};

const ChallengeList = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    getChallenges();
  }, []);

  function navigateToChallenge(challengeId: string) {
    navigate(`/challenge/${challengeId}`,);
  }

  function getChallenges() {
    var requestOptions = {
      method: 'GET',
    };

    fetch('http://localhost:8000/getChallenges', requestOptions)
      .then(response => response.json())
      .then(result => setChallenges(result))
      .catch(error => console.log('error', error));
  }

  return (
    <Stack m={0}>
      <Heading textAlign={'left'} m={4} color={'brand.100'}>
        CHALLENGES
      </Heading>

      {/* Mapping through challenges to create cards */}
      {challenges.map(challenge => (
        <Stack
          key={challenge.id} // Assuming there's an 'id' field in each challenge
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='md'
          p={4}
          mt={2}
          ms={8}
          me={512}
        >
          <Box width={'200px'} height={'200px'}>
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src= 'https://mesyngsclyialmxfqiuu.supabase.co/storage/v1/object/public/vincent-ganteng/ganteng-1' // Assuming there's an 'image' field in each challenge
              alt={challenge.title} // Assuming there's a 'title' field in each challenge
            />
          </Box>
          <Stack ml={{ sm: 4 }}>
            <Heading size='md'>{challenge.title}</Heading>
            <Text py='2'>{challenge.question}</Text>
            <Button colorScheme='blue' onClick={() => navigateToChallenge(challenge.id)}>
              Go to Challenge
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default ChallengeList;