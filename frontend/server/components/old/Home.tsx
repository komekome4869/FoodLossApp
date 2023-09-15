import React from 'react'
import ShopList from './ShopList'
import { AverageQuantityType, ShopType } from '@/types'
import Chart from './Chart'
import { Box, Text, useRadio, useRadioGroup, HStack, Button, Spacer,
SimpleGrid, List,  ListItem, VStack, useColorModeValue, Stack, StackDivider, Divider} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { LoginUser } from '@/pages/_app'
import HistorySL from './HistorySL'
import RadioCard from './RadioCard'


function Home(props: {shopList: Array<ShopType>, averageQuantity: AverageQuantityType}) {
    const [shopList, setShopList] = useState(props.shopList)
    let averageQuantity = props.averageQuantity

    const options = ['Tiny', 'Little', 'Medium', 'Large', 'Enormous']
    const { userInfo, setUserInfo } = useContext(LoginUser)

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
      onChange: (value) => {setUserInfo({
        userID: userInfo.userID,
        appetite: Number(options.indexOf(value) + 1),
        averageQuantity: userInfo.averageQuantity,
      }); console.log(value);},
    })

    const group = getRootProps()

    const doAction = () => {
        fetch("http://localhost:8000/api/search", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-id": userInfo.userID,
                "appetite": String(userInfo.appetite),
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("error")
            }
        }).then((data) => {
            setShopList(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <Box >
            <Text fontSize="2xl">Today's appetite / physical condition</Text>
            
            <Box  w='80%' p={10} mx={50} display='flex' alignItems='center'>
                
                <HStack {...group} justifyContent='flex-start'>
                    {options.map((value) => {
                        const radio = getRadioProps({ value })
                        return (
                            <RadioCard key={value} {...radio}>
                                {value}
                            </RadioCard>
                        )
                    })}
                    <Spacer />
                    <Button 
                        colorScheme='teal' 
                        borderWidth='1px'
                        borderRadius='md'
                        boxShadow='md'
                        _focus={{
                            boxShadow: 'outline',
                        }}
                        ml={3}
                        px={5}
                        py={3}
                        onClick={doAction}>
                        Search
                    </Button>
                </HStack>
            </Box>
            <Divider />
            <Box mt="10">
                <ShopList shopList={shopList} />
            </Box>
            <Text fontSize="2xl" mt="10">How much food do you eat?</Text>
            <Chart averageQuantity={averageQuantity} />
        </Box>
            <Divider />

        

        <Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>User ID: &&</ListItem>
                </List>

                <List spacing={2}>
                  <ListItem>Number of feedbacks provided: &&</ListItem>
                </List>
              </SimpleGrid>
            

            <Stack
                spacing={{ base: 1, sm: 1 }}
                direction={'column'}
                divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                }>

            <VStack></VStack>

                <Box>
                <Text
                    fontSize={{ base: '16px', lg: '16px' }}
                    color={'teal'}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'5'}>
                    FEED BACK History
                </Text>

                </Box>
            </Stack>

            <HistorySL shopList={shopList} />
        </Box>
    </>
    )
}

export default Home