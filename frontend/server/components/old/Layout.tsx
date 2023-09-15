import React from 'react'
import { Flex, VStack, Container } from "@chakra-ui/react";
import Header from "./Header";
import Head from "next/head";

function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
        <Head>
            <title>Food loss reduction</title>
        </Head>
        <VStack w="100%" overflowY="scroll">
            <Header />
            <Flex w="100%" mt="20">
            <Flex w={{ base: "100%" }} flexDirection="column" p="10">
                <Container>
                    {children}
                </Container>
            </Flex>
            </Flex>
        </VStack>
        </>
    )
}

export default Layout