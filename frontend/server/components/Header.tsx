'use client'

import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";
import { LoginUser } from "../pages/_app";
import { useContext} from "react";
import Link from "next/link"
import { useRouter } from 'next/router'

import {
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  
} from '@chakra-ui/react'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}


export default function Nav(props: { userID?: string}) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {userInfo, setUserInfo} = useContext(LoginUser)

  const router = useRouter()

  const handleRefreshClick = () => {
    window.location.reload();
  };//one click refresh

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
           <Button onClick={() => router.push("/")}> 
              <Text as={'span'} 
              color={'teal'} 
              textTransform={'uppercase'}
              fontWeight={1000}
              fontSize={'3xl'}>
                FOOD WIZARD
              </Text>
            </Button>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{props.userID ? props.userID : userInfo.userID}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() =>{ router.push("/"); setUserInfo({}) }}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}


// const Header = () => {
//   const { userID, setUserID } = useContext(LoginUser)
//   return (
//     <Box bg="white" w="100%" h="120px" p="5" position="fixed">
//         <Flex align="center" h="100%" color="blackAlpha.800" pr="10">
//           <Box
//             color="blackAlpha.700"
//             bg="whiteAlpha.100"
//             fontSize="4xl"
//           >
//             Food loss reduction in restaurants
//           </Box>
//           <Spacer />
//           <Box fontSize="xl" fontWeight="bold" ml="5">
//               { userID ? "user ID: " + userID : ""}
//           </Box>
//         </Flex>
//       <Divider borderColor="gray.100" />
//     </Box>
//   );
// };

// export default Header;