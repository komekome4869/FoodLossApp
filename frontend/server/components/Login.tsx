import { useState } from "react";
import { useContext } from "react";
import {
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  FormControl,
  InputRightElement,
  useRadioGroup,
  useColorModeValue,
  Text,
    Divider,
    SimpleGrid,
    List,
    ListItem,
    Spacer,
    HStack,
    StackDivider,
    Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { LoginUser } from "../pages/_app";
import { AverageQuantityType, ShopType, HistoryType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ShopList from './ShopList'
import Chart from './Chart'
import HistorySL from './HistorySL'
import RadioCard from './RadioCard'


const sampleShopList = [
    {"id": 0, "name": "test1", "genre": "fastfood", "quantity": 3, "location": "tokyo", "num_fb": 1, "img_url": "https://cdn-ak.f.st-hatena.com/images/fotolife/R/R-Hack/20191025/20191025123056.jpg"},
    {"id": 1, "name": "test2", "genre": "japanese", "quantity": 2, "location": "tokyo", "num_fb": 5, "img_url": "https://cdn-ak.f.st-hatena.com/images/fotolife/R/R-Hack/20191025/20191025123056.jpg"},
    {"id": 2, "name": "test3", "genre": "noodle", "quantity": 1, "location": "tokyo", "num_fb": 3, "img_url": "https://cdn-ak.f.st-hatena.com/images/fotolife/R/R-Hack/20191025/20191025123056.jpg"},
    {"id": 3, "name": "test4", "genre": "fastfood", "quantity": 4, "location": "tokyo", "num_fb": 10, "img_url": "https://cdn-ak.f.st-hatena.com/images/fotolife/R/R-Hack/20191025/20191025123056.jpg"},
]

const sampleAverageQuantity = {
    "personal": 50,
    "general": 55
}


function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const {userInfo, setUserInfo} = useContext(LoginUser)
    const [tmpUserID, setTmpUserID] = useState("")
    const [password, setPassword] = useState("")
    const [shopList, setShopList] = useState([] as Array<ShopType>)
    const [historySL, setHistorySL] = useState([] as Array<HistoryType>)
    const [averageQuantity, setAverageQuantity] = useState({} as AverageQuantityType)

    const handleShowClick = () => setShowPassword(!showPassword)
    const handleUserIDChange = (e) => setTmpUserID(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const router = useRouter()
    const options = ['Tiny', 'Little', 'Medium', 'Large', 'Enormous']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'Medium',
        onChange: (value) => {setUserInfo({
        userID: userInfo.userID,
        appetite: Number(options.indexOf(value) + 1),
        averageQuantity: userInfo.averageQuantity,
        })}
    })
    const group = getRootProps()

  useEffect(() => {
    router.events.on('routeChangeComplete', handleChangeRoute);

    return () => {
      router.events.off('routeChangeComplete', handleChangeRoute)
    }
  }, []);

  function handleChangeRoute (path) {
    console.log(userInfo)
    fetchList()
  }

  const fetchList = () => {
    fetch("http://localhost:8000/api/login", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user-id": userInfo.userID ? userInfo.userID : tmpUserID,
        },
    }).then((res) => {
        console.log(res)
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("error")
        }
    }).then((data) => {
        setAverageQuantity(data["average_quantity"])
        setHistorySL(data["record_list"])
        setUserInfo({
            "userID": userInfo.userID ? userInfo.userID : tmpUserID,
            "appetite": 3,
            "averageQuantity": data["average_quantity"]["personal"],
        })
        console.log(data["shop_list"])
    }).catch((err) => {
        console.log(err)
        setShopList(sampleShopList)
        setAverageQuantity(sampleAverageQuantity)
        setUserInfo({
            "userID": userInfo.userID ? userInfo.userID : tmpUserID,
            "appetite": 3,
            "averageQuantity": 50,
        })
    }).then(() => {
        doSearch()
    })
}


  const doAction = (e) => {
    e.preventDefault()
    fetchList()
  }

    const doSearch = () => {
        let url = "http://localhost:8000/api/search"
        let headers = {
            "Content-Type": "application/json",
            "user-id": userInfo.userID ? userInfo.userID : tmpUserID,
            "appetite": userInfo.appetite ? String(userInfo.appetite): "3",
        }
        console.log(url, headers)
        fetch(url, {
            method: "GET",
            headers: headers,
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
    userInfo.userID ? 
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
                        onClick={doSearch}>
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

         
        <Text
          fontSize="2xl">
          My information
        </Text>


        <Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>User ID: {userInfo.userID}</ListItem>
                  <ListItem>Height: && </ListItem>
                </List>

                <List spacing={2}>
                  <ListItem>Number of feedbacks provided: {historySL.length}</ListItem>
                  <ListItem>Weight: && </ListItem>
                </List>
              </SimpleGrid>
            

            <Stack
                spacing={{ base: 5, sm: 5 }}
                direction={'column'}
                divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                }>

              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>

                    <Box as="span" flex='1' >
                  <Text
                      fontSize={{ base: '16px', lg: '16px' }}
                      color={'teal'}
                      fontWeight={'500'}
                      textTransform={'uppercase'}
                      mb={''}>
                      FEED BACK History
                  </Text>

                  </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <HistorySL historySL={historySL}/>
                  </AccordionPanel>
                </AccordionItem>
                
              </Accordion>
            </Stack>




        </Box>
    </>
    :
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input 
                    onChange={handleUserIDChange}
                    placeholder="user ID" 
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                letiant="solid"
                colorScheme="teal"
                width="full"
                onClick={doAction}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
  )
}

export default Login
