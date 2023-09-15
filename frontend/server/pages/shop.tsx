'use client'

import { useRouter } from 'next/router'
import {QueryType} from '@/types'
import Feedback from '@/components/Feedback'
import React, { use } from 'react'
import Shopfeed from "../components/ChartRest"
import {
    Image, 
    Center, 
    Text,
    Container,
    SimpleGrid,
    Flex,
    Heading,
    Stack,
    StackDivider,
    useColorModeValue,
    Box,
    VStack,
    List,
  ListItem,
  Button,
  Spacer
} from '@chakra-ui/react'



import Nav from "../components/Header"
import { useEffect } from 'react'


export default function Shop() {
  const router = useRouter()
  const query = router.query as any as QueryType
  const [yquant, setYquant] = React.useState(query.averageQuantity)

  return (
    <>
    <Nav userID={query.userID}/>
    <Container maxW={'7xl'}>
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}>
      <Flex>
        <Image
          rounded={'md'}
          alt={'product image'}
          src={query.img_url}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '6xl' }}>
            {query.name}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'3xl'}>
            {query.genre}
          </Text>
          <Text
            color={'teal'}
            fontWeight={800}
            fontSize={'2xl'}>
            Number of feedback received : {query.num_fb}
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
          }>
          <VStack spacing={{ base: 4, sm: 6 }} align="start">
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize={'2xl'}
              fontWeight={'300'}>
              TIPS: A bowl of rice weighs between 180-200g
            </Text>
          </VStack>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color='teal'
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Shop Address
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                <ListItem>
                    {query.location}
                </ListItem>

              </List>
            </SimpleGrid>
          </Box>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color='teal'
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              OPENING TIME
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                <ListItem>
                    {query.opening_time}
                </ListItem>

              </List>
            </SimpleGrid>
          </Box>

          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color='teal'
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              explanation
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                <ListItem>
                    {query.explanation}
                </ListItem>

              </List>
            </SimpleGrid>
          </Box>
          

          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color='teal'
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Quantity
            </Text>
            <Center mt = '30'>
               <Shopfeed quant = {query.quantity}  yquant = {yquant} />
             </Center>
          </Box>
        </Stack>

      </Stack>
    </SimpleGrid>

    <Center>
      <Feedback  shopId={query.id} userID={query.userID} appetite={query.appetite} setYquant={setYquant}/>
    </Center>
  </Container>

  </>

  )
}