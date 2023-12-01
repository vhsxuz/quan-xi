import { Button } from '@chakra-ui/button';
import { Heading, Stack } from '@chakra-ui/layout';

import React from 'react';

const ChallengeList = () => {
  return (
    <Stack m={0}>
      <Heading textAlign={'left'} mt={8} color={'brand.100'}>
        CHALLENGES
      </Heading>
    </Stack>
  );
}

export default ChallengeList