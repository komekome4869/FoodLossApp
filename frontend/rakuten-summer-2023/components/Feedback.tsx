import React from 'react'
import {
    Button,
    Center,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useRadio, 
    useRadioGroup, 
    Box, 
    HStack,
    useToast,
    Text
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { LoginUser } from "@/pages/_app";
import RadioCard from './RadioCard'


function Feedback(props: { shopId: number, userID: string, appetite: number, setYquant: any }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()
    const options = ['Tiny', 'Little', 'Medium', 'Large', 'Enormous']
    const [value, setValue] = useState("")

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: (value) => {setValue(value); console.log(value);},
    })
    const group = getRootProps()

    const sendFeedback = () => {
        fetch("http://localhost:8000/api/feedback/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "user-id": props.userID,
            },
            body: JSON.stringify({
                "shop-id": props.shopId,
                "feedback": options.indexOf(value) + 1,
                "appetite": props.appetite,
            })
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("error")
            }
        }).then((data) => {
            console.log(data)
            toast({
                title: 'You\'ve sent your feedback.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            props.setYquant(data)
        }).catch((err) => {
            console.log(err)
            toast({
                title: 'Failed to send your feedback.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        })
    }


    return (
        <>
            <Button mb='50'  colorScheme='teal' size='lg' onClick={onOpen}>
                FEED BACK
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size="xl"
                >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Feed back
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            How much food is served in this restaurant?
                            <Center>
                                <HStack mt="5" {...group}>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                    <RadioCard key={value} {...radio}>
                                        {value}
                                    </RadioCard>
                                    )
                                })}
                                </HStack>
                            </Center>
                        </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='teal' ml={3} onClick={() => {
                          sendFeedback()
                          onClose()
                        }}>
                          OK
                        </Button>
                      </AlertDialogFooter>

                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
}

export default Feedback
