import React from 'react'
import { Input, Button, FormControl, Flex, Spacer, Text } from "@chakra-ui/react"


function SearchBox() {

    const doChange = (e) => {
        console.log(e.target.value)
    }

    const doAction = () => {

    }

    return (
        <>
        <Text fontSize="2xl">Search restaurant</Text>
            <Flex minWidth="max-content" alignItems="center" gap="2" pb="10">
                <FormControl p="2">
                    <Input
                        onChange={doChange}
                        placeholder="search word"
                    />
                </FormControl>
                <Spacer />
                <Button
                    type="submit"
                    letiant="solid"
                    colorScheme="teal"
                    width="sm"
                    onClick={doAction}
                >
                    Search
                </Button>
            </Flex>
        </>
    )
}

export default SearchBox