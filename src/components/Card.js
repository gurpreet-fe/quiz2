import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import qaList from '../qaList.json';
import _ from 'lodash';

const Card = () => {
  const Q_LIMIT = 5;
  const qa = _.shuffle(qaList).slice(0, Q_LIMIT);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const clickHandler = (id, answer, isCorrect) => {
    localStorage.setItem(`question-id-${id}`, `{answer: "${answer}"}`);
    setCount(() => count + 1);
    if (isCorrect) setScore(score + 1);
    if (count === Q_LIMIT - 1) setShowScore(true);
  };

  return (
    <Flex
      p={50}
      w='full'
      alignItems='center'
      justifyContent='center'
      direction='column'
    >
      <Box
        bg={useColorModeValue(
          'white',
          'linear-gradient(45deg, rgb(106, 120, 209), rgb(0, 164, 189))'
        )}
        minW='lg'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'
        p='6'
      >
        {!showScore ? (
          <Box>
            <Heading size='md'>QUESTION {count + 1}</Heading>
            <Text>{qa[count].question}</Text>

            <SimpleGrid columns='2' mt='6' spacing='3'>
              {qa[count].options.map((options, i) => (
                <Box
                  key={i}
                  borderWidth='1px'
                  rounded='lg'
                  shadow='lg'
                  position='relative'
                  textAlign='center'
                  p='3'
                  _hover={{
                    background:
                      'linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.10));',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    clickHandler(
                      qa[count].id,
                      options.option,
                      options.isCorrect
                    )
                  }
                >
                  <Text>{options.option}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Box>
            <Alert maxW='lg' status='info'>
              <AlertIcon />
              {`You scored ${score} out of 5`}
            </Alert>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Card;
