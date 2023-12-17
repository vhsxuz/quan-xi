import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

type Challenge = {
  id: string;
  image: string;
  title: string;
  question: string;
  githubLink: string;
};

interface githubUserData {
  login?: string,
  id?: string,
  node_id?: string,
  avatar_url?: string,
  url?: string,
}

const ChallengeComponent = () => {
  const [challengeText, setChallengeText] = useState('');
  const [challengeData, setChallengeData] = useState<Challenge>();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<githubUserData>({})
  useEffect(() => {
    if (id) {
      getUserData()
      getChallenge(id)
    } else {
      
    }
    
  }, [id]);

  async function fetchReadmeFromGitHub(repoLink: string) {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${repoLink}/main/README.md`);
      if (response.ok) {
        const readmeText = await response.text();
        setChallengeText(readmeText);
      } else {
        console.error('Failed to fetch README');
      }
    } catch (error) {
      console.error('Error fetching README:', error);
    }
  }

  function getChallenge(id: string) {
    fetch(`http://localhost:8000/getChallenge/${id}`)
      .then(response => response.json())
      .then((result: Challenge) => {
        setChallengeData(result);
        const parts = result.githubLink.split('/');
        const link = `${parts[3]}/${parts[4]}`
        fetchReadmeFromGitHub(link);
      })
      .catch(error => console.error('Error fetching challenge:', error));
  }

  const copyRepoLink = () => {
    if (challengeData) {
      const repoLink = `${challengeData.githubLink}.git`;
      navigator.clipboard.writeText(repoLink).then(
        () => {
          console.log('Repository link copied to clipboard');
        },
        err => {
          console.error('Failed to copy repository link: ', err);
        }
      );
    }
  };

  function postChallenge(githubLink: string | undefined, userId: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "token");
    console.log(userId)
    var raw = JSON.stringify({
      "githubLink": githubLink,
      "githubId": userId as string
    }); 
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    console.log(requestOptions)
    fetch("http://localhost:8000/newBranch", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error)); 
  }

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

  return (
    <Stack>
      <Heading>{challengeData?.title}</Heading>
      <img src={challengeData?.image} alt="Challenge" />
      <Text>{challengeData?.question}</Text>
      <ReactMarkdown>{challengeText}</ReactMarkdown>
      <Button onClick={copyRepoLink}>Copy Repository Link</Button>
      <Button onClick={()=> postChallenge(challengeData?.githubLink, String(userData.id))}>Create New Branch</Button>
    </Stack>
  );
};

export default ChallengeComponent;
